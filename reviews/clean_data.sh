json_file_path=$1

cat $json_file_path | ./filters/trim_fields.js | ./filters/normalize_fields.js | ./filters/filter_by_date.js