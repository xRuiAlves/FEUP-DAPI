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

This will build 3 CSV files under the `:repo/protege/data` directory:

- `books.jcsv`, featuring the filtered books set
- `authors.jcsv`, featuing the filtered authors set
- `reviews.jcsv`, featuring the filtered reviews set

They can then be converted to `xlsx` using a tool such as [cloudconvert](https://cloudconvert.com/csv-to-xlsx).