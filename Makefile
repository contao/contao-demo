restore:
	php vendor/bin/contao-console contao:backup:restore backup__20240101000000.sql
	php vendor/bin/contao-console contao:migrate --no-backup

create:
	composer up -o
	php vendor/bin/contao-console contao:migrate --no-backup
	php vendor/bin/contao-console contao:backup:create backup__20240101000000.sql
