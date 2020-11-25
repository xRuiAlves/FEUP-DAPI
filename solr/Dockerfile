FROM solr:8

ARG confdir=conf

COPY data/books.json data/books.json

COPY $confdir /opt/solr/server/solr/configsets/books/conf

CMD ["solr-precreate", "books", "/opt/solr/server/solr/configsets/books"]
