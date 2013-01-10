all: clean build test

install: components

components:
	@component install -d

build: install
	@component build -dv

test:
	@mocha -R spec test/index.test.js

build-test:
	@bigfile --entry=test/browser.js --write=test/built.js -lb

clean:
	@rm -rf dist test/built.js components build

Readme.md: src/index.js docs/head.md docs/tail.md
	@cat docs/head.md > Readme.md
	@cat src/index.js\
	 | dox -a >> Readme.md
	@cat docs/tail.md >> Readme.md

.PHONY: all build test build-test clean install
