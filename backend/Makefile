# 🧹 Remove containers, volumes, images and build artifacts
clean:
	docker compose down --volumes --remove-orphans
	docker image prune -a -f
	rm -rf dist node_modules

# 🔧 Build and start development environment
dev:
	docker compose -f docker-compose.yml build --no-cache
	docker compose -f docker-compose.yml up -d

# 🚀 Build and start production environment
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 📊 Show container status
status:
	docker compose ps

# 🐚 Open shell inside the backend container
shell:
	docker exec -it backend-app sh

# 🔁 TypeORM migration commands
migration-generate:
	docker exec -it backend-app npm run migration:generate

migration-run:
	docker exec -it backend-app npm run migration:run

migration-revert:
	docker exec -it backend-app npm run migration:revert

migration-drop:
	docker exec -it backend-app npm run migration:drop