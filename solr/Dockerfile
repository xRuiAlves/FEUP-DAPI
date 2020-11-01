FROM solr:8

COPY data/books.csv data/books.csv

COPY conf /opt/solr/server/solr/configsets/goodreads/conf

CMD ["solr-precreate", "goodreads", "/opt/solr/server/solr/configsets/goodreads"]
