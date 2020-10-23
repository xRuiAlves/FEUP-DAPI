import pandas as pandas

df = pandas.read_csv('../data/books.csv')

df['original_publication_year'].value_counts().to_csv('stat.csv')