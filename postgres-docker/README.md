# how to run postgresql

## command
```shell
docker run -d --name eagle-pg -p 5432:5432 eagle-postgres-centos postgres -D /var/lib/pgsql/18/data -c logging_collector=off
```
