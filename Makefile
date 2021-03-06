REPORTER=dot

serve: node_modules
	@node_modules/serve/bin/serve -Slojp 0

test: node_modules
	@node_modules/mocha/bin/mocha test/*.test.js \
		--reporter $(REPORTER) \
		--timeout 500 \
		--check-leaks \
		--bail

node_modules: package.json
	@packin install --meta $< --folder $@

.PHONY: serve test
