.PHONY: build run destroy create

build:
	docker build -t fairlance/frontend-dev .
run:
	docker run -t --name frontend -v $$PWD/src:/app/src -v $$PWD/test:/app/test -v $$PWD/dist:/app/dist -v $$PWD/custom_typings:/app/custom_typings -p 9000:9000 fairlance/frontend-dev npm start
destroy:
	docker stop frontend
	docker rm frontend
create:
	docker build -t fairlance/frontend -f create.Dockerfile .
buildDist:
	docker run -t -v $$PWD/src:/app/src -v $$PWD/test:/app/test -v $$PWD/dist:/app/dist -v $$PWD/custom_typings:/app/custom_typings fairlance/frontend-dev npm start -- build
