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
post -c books -format solr data/books.json
```