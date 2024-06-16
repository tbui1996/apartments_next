# Makefile for Node.js project with Prisma

.PHONY: install start migrate seed

install:
	npm install
	npx prisma generate

start:
	npm start

migrate:
	npx prisma migrate dev --name <migration_name> --preview-feature

seed:
	npx prisma db seed --preview-feature