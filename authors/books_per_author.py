import pandas as pandas

df = pandas.read_csv('../data/authored_books.csv')

df['n_books'].value_counts().to_csv('stat.csv')