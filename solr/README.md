# Solr

## Setup

```
docker-compose build
```

## Run

```
docker-compose up
```

## Import data

```
docker exec -it solr_solr_1 /bin/bash
```

Inside the container, load the books dataset:

```
post -c goodreads -params "f.authors.split=true&f.authors.separator=%2C%20" -type text/csv data/books.csv
```