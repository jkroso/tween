GRAPH=node_modules/.bin/sourcegraph -p nodeish,mocha
COMPILE=node_modules/.bin/_bigfile -p nodeish
REPORTER=dot

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js
	@rm -f test/built.js

test:
	@node_modules/.bin/mocha test/*.test.js \
		--reporter $(REPORTER) \
		--bail

test/built.js: index.js test/*
	@$(GRAPH) test/browser.js | $(COMPILE) -x null > $@

.PHONY: clean test
