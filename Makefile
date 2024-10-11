build-containers:
	docker compose up --build
up:
	docker compose up
db-access:
	docker exec -it postgres_db psql -U postgres -d postgres
