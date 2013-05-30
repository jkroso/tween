GRAPH=node_modules/.bin/sourcegraph -p nodeish,mocha
COMPILE=node_modules/.bin/_bigfile -p nodeish
REPORTER=dot
SRC=index.js object.js tween.js number.js array.js

all: test test/built.js build

build: components index.js
	@component build --dev

components: component.json
	@touch components
	@component install --dev

clean:
	rm -fr build components
	rm -f test/built.js

test:
	@node_modules/.bin/mocha test/*.test.js \
		--reporter $(REPORTER) \
		--bail

test/built.js: $(SRC) test/*
	@$(GRAPH) test/browser.js | $(COMPILE) -x null > $@

.PHONY: clean test
