node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json books > ../data/books.json
echo "Books filtered."
node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json authors > ../data/authors.json
echo "Authors filtered."
node filter_dataset.js ../../data/books.csv ../../data/authors.csv ../../data/parsed_reviews/reviews.json reviews > ../data/reviews.json
echo "Reviews filtered."