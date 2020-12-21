# Protege

## Prepare dataset

First, build the `reviews.json` file under the `/data/parsed_reviews` directory:

```
cat *.json > reviews.json
```

To build the filtered dataset files for importing:

```
cd dataset_filtering_scripts

# install the "csv-parse" node module if needed
npm i csv-parse

# instead of running this script you may run the node script instead, indicating the required files path
./filter_dataset.sh
```

This will build 3 JSON files under the `:repo/protege/data` directory:

- `books.json`, featuring the filtered books set
- `authors.json`, featuing the filtered authors set
- `reviews.json`, featuring the filtered reviews set
