import grequests
from bs4 import BeautifulSoup


def parse_price_maiki():
    pages = 1569
    url = 'https://maiki.store/muzhskiye-tovari/?p='
    n = 11
    for start in range(1, pages, n):
        for response in grequests.map([grequests.get(f"{url}{i}") for i in range(start, start + n)]):
            soup = BeautifulSoup(response.text, 'html.parser')

            for item in soup.find_all("span", class_="shirt__price red"):
                yield int(item.text.replace('руб.', '').replace(' ', ''))


def parce_price_vse_maiki():
    pages = 1657
    url = "https://www.vsemayki.ru/catalog/view/manwear?page="
    n = 11
    for start in range(1, pages, n):
        for response in grequests.map([grequests.get(f"{url}{i}") for i in range(start, start + n)]):
            soup = BeautifulSoup(response.text, 'html.parser')

            for item in soup.find_all("span", class_="price"):
                yield int(int(item.text))
