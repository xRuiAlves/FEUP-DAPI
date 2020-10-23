import json
import pandas as pd
import langdetect
import numpy as np

with open('../data/reviews.json') as reviews_file:
    reviews = pd.read_json(reviews_file)

reviews['book_id'].value_counts().to_csv('reviews_book.csv')

reviews['date'] = reviews['date'].apply(lambda x: x.strftime('%Y-%m'))
occurences = reviews['date'].value_counts()
occurences.to_csv('reviews_date.csv')

langs = []

for review in reviews['review_text']:
    i = i+1
    try:
        langs.append(langdetect.detect(review))
    except langdetect.lang_detect_exception.LangDetectException:
        langs.append('')

reviews['lang'] = langs
reviews.to_csv('data.csv')

reviews['lang'].value_counts().to_csv('reviews_language.csv')

reviews['size'] = reviews['review_text'].apply(lambda x: len(str(x)))
reviews['size'].value_counts().to_csv('reviews_size.csv')