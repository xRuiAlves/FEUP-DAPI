import pandas as pd
from pprint import pp


def get_authors_with_data():
    df = pd.read_csv('data/authors.csv')
    return df['name']


if __name__ == '__main__':
    unique_authors = get_authors_with_data()

    # authorname -> n_books_in_dataset
    authors_book_count = dict.fromkeys(unique_authors.to_list(), 0)
    # Books for which we have info on their authors
    books_with_author_info = 0

    book_df = pd.read_csv('data/books.csv')

    for book_authors_raw in book_df['authors']:
        have_info = False
        for book_author in map(lambda x: x.strip(), book_authors_raw.split(',')):
            if book_author in authors_book_count:
                authors_book_count[book_author] += 1
                have_info = True
        if have_info:
            books_with_author_info += 1

    print('#Books for which we have author info: {} -> {}%'.format(
        books_with_author_info, (books_with_author_info / len(book_df) * 100)))

    # pp(authors_book_count)
    df = pd.DataFrame(authors_book_count.items(), columns=['author', 'n_books'])
    df = df.set_index('author')
    df.to_csv('data/authored_books.csv')
