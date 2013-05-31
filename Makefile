REPORTER=dot

test:
	@node_modules/.bin/mocha test/*.test.js \
		--reporter $(REPORTER) \
		--bail

serve: node_modules
	@node_modules/.bin/serve

node_modules: component.json package.json
	@npm install mocha serve
	@packin install

clean:
	rm -fr node_modules

.PHONY: clean test
