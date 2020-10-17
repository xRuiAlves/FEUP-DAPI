import pandas
import wptools
import os
from collections import defaultdict
from multiprocessing import Pool
from pprint import pp


def get_author_data_by_name(args):
    """
    Gets the following data for a given author:
    sex or gender (P21)
    date of birth (P569)
    country of citizenship (P27)
    place of birth (P19)
    """
    index, author = args
    # print(f"Processing index {index}")
    try:
        page = wptools.page(author, silent=True)
        page.wanted_labels(['P21', 'P569', 'P27', 'P19'])
        page.get_wikidata()
        sex_or_gender = page.data['wikidata']['sex or gender (P21)']
        date_of_birth = page.data['wikidata']['date of birth (P569)']
        country_of_citizenship = page.data[
            'wikidata']['country of citizenship (P27)']
        place_of_birth = page.data['wikidata']['place of birth (P19)']
        return {
            "name": author,
            "sex_or_gender": sex_or_gender,
            "date_of_birth": date_of_birth,
            "country_of_citizenship": country_of_citizenship,
            "place_of_birth": place_of_birth
        }
    except LookupError:
        print(f"### -> No page found for author {author}")
        return None
    except:
        print(f"##### -> Generic exception for {author}")
        return 1


def author_to_wikidata_keys(args):
    index, author = args
    # print(f"Processing index {index}")
    try:
        page = wptools.page(author, silent=True)
        page.get_wikidata()
        return list(page.data['wikidata'].keys())
    except LookupError:
        print(f"### -> No page found for author {author}")
        return None
    except:
        print(f"##### -> Generic exception for {author}")
        return 1


def get_all_unique_authors():
    data = pandas.read_csv('data/books.csv')
    total_authors = set()

    for raw_author in data['authors']:
        # There might be several authors for the same book as nested CSV
        # This returns a lazy evaluated iterator in python3 but set.update handles that well
        authors = map(lambda a: a.strip(), raw_author.split(','))
        total_authors.update(authors)
    return total_authors


# POOL_SIZE = 50 # used to be safe but the server appears to be erroring more frequently
POOL_SIZE = 10


def check_most_common_keys(unique_authors):
    N_AUTHORS = len(unique_authors)
    author_keys_dict = defaultdict(lambda: 0)

    pool = Pool(POOL_SIZE)

    authors_wikidata_keys = pool.imap_unordered(
        author_to_wikidata_keys, enumerate(unique_authors), max(N_AUTHORS//POOL_SIZE, 1))

    n_not_found = 0
    n_error = 0

    for author_keys in authors_wikidata_keys:
        if author_keys == None:
            n_not_found += 1
        elif author_keys == 1:
            n_error += 1
        else:
            for key in author_keys:
                author_keys_dict[key] += 1

    print('\n'*2)
    print(f"{n_error} unexpected errors")
    print(
        f"Could not find {n_not_found} authors of {len(unique_authors)} in wikidata")

    print('\n')

    pp({k: v for k, v in sorted(
        author_keys_dict.items(), key=lambda item: item[1], reverse=True)})


AUTHORS_CSV_FILE = 'data/authors.csv'


def get_authors_data(unique_authors):
    N_AUTHORS = len(unique_authors)
    pool = Pool(POOL_SIZE)

    authors_data = pool.imap_unordered(
        get_author_data_by_name, enumerate(unique_authors), max(N_AUTHORS//POOL_SIZE, 1))

    # We lose lazyness but this has to be done to allow for the multiple filters that follow
    authors_data = list(authors_data)

    not_found = len(list(filter(lambda x: x == None, authors_data)))
    errored = len(list(filter(lambda x: x == 1, authors_data)))

    print(f"{not_found} not found, {errored} errors")

    noneless_authors_data = filter(None, authors_data)
    df = pandas.DataFrame(noneless_authors_data)
    df = df.set_index('name')
    print(df.describe())
    df.to_csv(AUTHORS_CSV_FILE)


AUTHORS_FILE = 'data/unique_authors.txt'

if __name__ == '__main__':
    if not os.path.exists(AUTHORS_FILE):
        unique_authors = get_all_unique_authors()
        with open(AUTHORS_FILE, 'w') as f:
            for author in unique_authors:
                f.write("%s\n" % author)
    else:
        with open(AUTHORS_FILE, 'r') as f:
            unique_authors = f.read().splitlines()

    # Debug with a subset of authors:
    # unique_authors = unique_authors[4000:4300]

    N_AUTHORS = len(unique_authors)
    print(f"{N_AUTHORS} unique authors")

    # check_most_common_keys(unique_authors)
    get_authors_data(unique_authors)
