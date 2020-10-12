import os.path
import urllib.request
import urllib.parse
import pandas as pd
import json
import sys
import time
import matplotlib.pyplot as plt

BOOKS_PATH = 'data/books.csv'
DATASET_URL = 'https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv'
WIKIDATA_SEARCH_URL = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&type=item&continue=0&search='

if not os.path.exists(BOOKS_PATH):
    urllib.request.urlretrieve(DATASET_URL, BOOKS_PATH)

df = pd.read_csv(BOOKS_PATH)
print(df.describe())

entities = []

for authors in df['authors']:
    entity = []
    for author in authors.split(','):
        author = author.strip()
        with urllib.request.urlopen(WIKIDATA_SEARCH_URL + urllib.parse.quote(author)) as url:
            data = json.loads(url.read().decode())
            if len(data['search']) > 0:
                entity.append((author,data['search'][0]['id']))
            else: 
                entity.append((author))
            # time.sleep(1)
    entities.append(entity)

df.insert(23, "WikiData Authors", entities, True)
df.to_csv('data.csv')