# Default directory (can be overridden via: make dev DIR=backend)
# 🛡️ Ensure DIR is set
ifndef DIR
$(error ❌ DIR variable not set. Usage: make <target> DIR=backend)
endif

COMPOSE_DEV=$(DIR)/docker-compose.yml
COMPOSE_PROD=$(DIR)/docker-compose.yml $(DIR)/docker-compose.prod.yml

# 🧹 Remove containers, volumes, images and build artifacts
clean:
	cd $(DIR) && docker compose down --volumes --remove-orphans
	docker image prune -a -f
	rm -rf $(DIR)/dist $(DIR)/node_modules
	rm -f $(DIR)/src/db/migrations/*.js

# 🔧 Build and start development environment
dev: clean
	cd $(DIR) && docker compose -f docker-compose.yml build --no-cache
	cd $(DIR) && docker compose -f docker-compose.yml up -d

# 🚀 Build and start production environment
prod: clean
	cd $(DIR) && docker compose -f docker-compose.yml -f docker-compose.prod.yml build --no-cache
	cd $(DIR) && docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 📊 Show container status
status:
	cd $(DIR) && docker compose ps

# 🐚 Open shell inside the backend container
shell:
	docker exec -it backend-app-1 sh

# 🔁 TypeORM migration commands
migration-generate:
	docker exec -it backend-app-1 npm run migration:generate

migration-run:
	docker exec -it backend-app-1 npm run migration:run

migration-revert:
	docker exec -it backend-app-1 npm run migration:revert

migration-drop:
	docker exec -it backend-app-1 npm run migration:drop
