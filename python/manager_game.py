import user
import dictionory
import read_file_content
from requests import session
import pyfiglet

# משתנים גלובליים הנצרכים בכל התוכנית
basic_url = "http://127.0.0.1:5000"
session = session()
current_user = None
time_of = 0
option = ""


def decorator(func):
    def wrapper(*arg, **kwargs):
        response = session.get(f'{basic_url}/play')
        if response.status_code == 200:
            return func(*arg, **kwargs)
        else:
            print("you have to reconnect. ")
            log_in()

    return wrapper


def sign_up():
    print("sign up")
    u = user.User(input(f"enter a name\n"), input("enter your tz\n"), input("enter a password\n"), 0, [], 0)
    response = session.post(f"{basic_url}/add", json=u.to_dict())
    if response.status_code == 201:
        print(response.json())
        print("now you need also log in")
        log_in()
    else:
        print(response.status_code)
    print(u.user_name)


def log_in():
    user_details = {
        'user_name': input("Enter your name: "),
        'password': input("Enter your password: ")
    }
    print(user_details)
    response = session.post(f'{basic_url}/login', json=user_details)
    if response.status_code == 201:
        global current_user
        current_user = dict(response.json().get('result', {}))
        print(f'hello {current_user.get("user_name")}')
        print('You are connected, enjoy playing!!!')
    else:
        while True:
            global option
            option = print(input("you are not recognize, if you want try again, press 0, if you want sign up press 1 "))
            if option == "0":
                log_in()
            elif option == "1":
                sign_up()
            else:
                print("invalid input, please try again")
                option = print(input("you are not recognize, if you want try again, press 0, if you want sign up press 1 "))



def replace_char_at_index(original_string, indexes, new_char):
    for index in indexes:
        if index < 0 or index > len(original_string):
            raise ValueError("Index is out of bounds.")
        original_string = original_string[:index] + new_char + original_string[(index + 1):]
    return original_string


def choose(num):
    return num


@decorator
def manager():
    while True:
        try:
            baba = int(input("If you want to start playing - press 1,"
                             "\nIf you want to see your history - press 2:"
                             "\n,If you want exit press any key"))
            if baba == 1:
                response = session.get(f'{basic_url}/play')
                if response == 403:
                    print(response.json())
                    log_in()
                else:
                    print(response.json())
                    play()
            elif baba == 2:
                see_my_history()
            else:
                print("Invalid input. Please enter 1 or 2.")
        except ValueError:
            break


@decorator
def play():
    global time_of
    failures = 0
    print(dictionory.logo)
    print("Hello " + input("put your name...\n"))
    word = read_file_content.read_the_file_and_drown_word("words.txt", int(input("Enter a positive number")))
    encoded_word = read_file_content.print_(word)
    while "_" in encoded_word and failures < 7:
        letter = str(input("enter a letter\n"))
        if letter in word:
            indexes = [index for index, value in enumerate(word) if value == letter]
            encoded_word = replace_char_at_index(encoded_word, indexes, letter)
            print(encoded_word)
        else:
            print(dictionory.steps[failures])
            failures = failures + 1
    if not "_" in encoded_word:
        win_art = pyfiglet.figlet_format("wow!")
        print(win_art)
        print(current_user.get('times_of_win'))
        time_of = int(current_user.get('times_of_win')) + 1
    elif failures == 7:
        gameover_art1 = pyfiglet.figlet_format("GAME-OVER")
        print(gameover_art1)
        time_of = int(current_user.get('times_of_win'))
    user_json = dict(user_name=current_user.get('user_name'),
                     tz=current_user.get('tz'),
                     password=current_user.get('password'),
                     times=int(current_user.get('times')) + 1,
                     words=current_user.get('words', []) + [word.strip()],
                     times_of_win=time_of)
    update_info(user_json)


@decorator
def see_my_history():
    name_of_current_user = current_user.get('user_name')
    headers = {'Content-Type': 'application/json'}
    payload = {}
    response = session.post(f'{basic_url}/history/{name_of_current_user}', headers=headers, json=payload)
    print(f'{basic_url}/history/{name_of_current_user}')
    if response.status_code == 200:
        print(response.json())
        manager()
    else:
        print(f"Error: {response.status_code}")


def update_info(user1):
    idd = current_user.get('_id')
    response = session.put(f'{basic_url}/update/{idd}', json=user1)
    if response.status_code == 200:
        print(f"you end the play with a lot of honor {response.json()}")
        manager()
        return response
    else:
        print(f'Error {response.status_code}')
