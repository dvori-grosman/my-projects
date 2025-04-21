import random


def read_the_file_and_drown_word(path, num):
    file = open(path, 'r')
    content = file.readlines()
    random.shuffle(content)
    num = num % len(content)
    for line in content:
        if num == 0:
            return line
        else:
            num = num - 1


def print_(word):
    word = (len(word) - 1) * "_"
    print(word)
    return word



