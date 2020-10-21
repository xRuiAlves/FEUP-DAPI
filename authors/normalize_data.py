import pandas as pd
import re

date_parse_regex = '\+?(-?\d{4}-\d{2}-\d{2})T00:00:00Z'

def parse_date_line(date):
    # This will be a list of dates in YYYY-MM-DD format
    matches = re.findall(date_parse_regex, date)

    if len(matches) > 1:
        return ', '.join(matches)
    else:
        return matches[0]

remove_wikidata_id_regex = '(.*?) \(.*\)'

def parse_sex_or_gender(data):
    return re.findall(remove_wikidata_id_regex, data)[0]

remove_wikidata_id_listable = '([\w ]*?) +\([Q\d]*?\)'
ignore_wikidata_values = ['somevalue', 'novalue']

def parse_country(data):
    # Some glue to fix wikidata's spaghett :)
    if data in ignore_wikidata_values:
        return None

    matches = re.findall(remove_wikidata_id_listable, data)

    if len(matches) > 1:
        return ', '.join(matches)
    else:
        return matches[0]

def parse_pob(data):
    # Some glue to fix wikidata's spaghett :)
    if data in ignore_wikidata_values:
        return None

    matches = re.findall(remove_wikidata_id_listable, data)

    if len(matches) > 1:
        return ', '.join(matches)
    else:
        return matches[0]

AUTHORS_CSV_FILE = 'data/authors.csv'
NORMALIZED_AUTHORS_CSV_FILE = 'data/authors.csv'


if __name__ == '__main__':
    df = pd.read_csv(AUTHORS_CSV_FILE)

    df = df.set_index('name')

    df['date_of_birth'] = df['date_of_birth'].apply(parse_date_line)
    df['sex_or_gender'] = df['sex_or_gender'].apply(parse_sex_or_gender)
    df['country_of_citizenship'] = df['country_of_citizenship'].apply(parse_country)
    df['place_of_birth'] = df['place_of_birth'].apply(parse_pob)
    df.to_csv(NORMALIZED_AUTHORS_CSV_FILE)
