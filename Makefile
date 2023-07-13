database:
	@mkdir -p /tmp/postgresql_data
	@docker-compose -f docker-compose.local.yml up --build
	@docker-compose -f docker-compose.test.yml up --build