# 🧹 Remove frontend container and volume
clean:
	docker compose down --volumes --remove-orphans
	docker image prune -a -f
	rm -rf node_modules

# 🚧 Build and start frontend
dev:
	docker compose build
	docker compose up -d

# 🐚 Shell access
shell:
	docker exec -it frontend-app sh

# 📊 Status
status:
	docker compose ps
