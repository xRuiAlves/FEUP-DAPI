import pandas as pd
import re

df = pd.read_csv('../data/books.csv')

def getSaga(title):
    try:
        m = re.search('\(([^,#]+)', title).group(1)
        return m
    except AttributeError:
        return 'None'

df['saga'] =  df['title'].apply(getSaga)
occurences = df['saga'].value_counts()
inverted = occurences.groupby(occurences).size()
inverted = pd.Series([5461]).append(inverted)
inverted = inverted.drop(labels=[5461])

inverted.to_csv('stat.csv')