class User:
    def __init__(self, user_name, tz, password, times, words, times_of_win):
        self.user_name = user_name
        self.tz = tz
        self.password = password
        self.times = times
        self.words = words
        self.times_of_win = times_of_win

    def to_dict(self):
        return {
            'user_name': self.user_name,
            'tz': self.tz,
            'password': self.password,
            'times': self.times,
            'words': self.words,
            'times_of_win': self.times_of_win
        }
