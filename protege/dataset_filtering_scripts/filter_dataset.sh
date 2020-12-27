node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json books > ../data/books.csv
echo "Books filtered."
node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json authors > ../data/authors.csv
echo "Authors filtered."
node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json reviews > ../data/reviews.csv
echo "Reviews filtered."