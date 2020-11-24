FROM solr:8

COPY data/books.json data/books.json

COPY conf /opt/solr/server/solr/configsets/books/conf

CMD ["solr-precreate", "books", "/opt/solr/server/solr/configsets/books"]
