.PHONY: build run

build:
	docker build -t fairlance/frontend .
run:
	docker run --name frontend -v $$PWD/src:/app/src -v $$PWD/test:/app/test -v $$PWD/dist:/app/dist -v $$PWD/custom_typings:/app/custom_typings -p 9000:9000 -t fairlance/frontend npm start
destroy:
	docker stop frontend
	docker rm frontend
