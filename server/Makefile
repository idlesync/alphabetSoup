install:
	npm install

clean:
	rm -rf node_modules

build:
	./node_modules/.bin/grunt build --force

start:
	node dist/index.js

live:
	./node_modules/.bin/grunt build --force
	node dist/index.js

server:
	npm install
	./node_modules/.bin/grunt build --force
	node dist/index.js
