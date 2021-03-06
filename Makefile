REPORTER=dot

serve: node_modules
	@node_modules/serve/bin/serve -Sloj

test: node_modules
	@node_modules/mocha/bin/_mocha test/*.test.js \
		--reporter $(REPORTER) \
		--timeout 500 \
		--check-leaks \
		--bail

node_modules: component.json package.json
	@packin install \
		--meta package.json,component.json,deps.json \
		--folder node_modules \
		--executables \
		--no-retrace

bench: node_modules
	@node bench/array.js

.PHONY: serve test bench