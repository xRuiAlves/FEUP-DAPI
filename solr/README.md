# Solr

## Prepare data

First, build the `reviews.json` file under the `/data/parsed_reviews` directory:

```
cat *.json > reviews.json
```

To build the JSON file for importing:

```
cd data_merging_scripts

# install the "csv-parse" node module if needed
npm i csv-parse

# instead of running this script you may run the node script instead, indicating the required files path
./merge_books_schema.sh
```

## Setup and run

```
docker-compose up --build
```

## Import data

```
docker exec -it solr_solr_1 /bin/bash
```

Inside the container, load the data:

```
post -c books -format solr data/books.json
```

It should take 40 to 60 seconds to import everything.

## Using solr UI

- Access your [http://localhost:8983]
- On the left side, select the "books" core
- In the *Overview* tab, the should be about 521k documents
- In the *Query* tab, you can try out some queries:
    - `*:*` should return about 521k documents
    - `book_rating:*` should return 10k documents (books)
    - `review_rating:*` should return about 498k documents (reviews)
    - `author_name:*` should return about 13k documents (authors, some tupples are repeated, as expected)
