json_file_path=$1

cat $json_file_path | ./filters/filter_by_existing_books.js | ./filters/trim_fields.js | ./filters/normalize_fields.js | ./filters/filter_by_date.js