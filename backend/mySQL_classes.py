import mysql.connector
from hashlib import sha512
import random
import string

class User:

    db = mysql.connector.connect(host='localhost', user='root', password='', database='final_project')

    def __init__(self, **kwargs):
        self.username = kwargs.get('username')
        self.password_hash = kwargs.get('password_hash')
        self.email = kwargs.get('email')
        self.profile_pic = kwargs.get('profile_pic')
        self.high_score = kwargs.get('high_score', 0)
        self.games_played = kwargs.get('games_played', 0)

    def insert(self):
        cursor = self.db.cursor()

        sql = """INSERT INTO users(
                username, password_hash, email, profile_pic, high_score, games_played)
                VALUES (%s, %s, %s, %s, %s, %s);"""

        values = (self.username, self.password_hash, self.email, self.profile_pic, self.high_score, self.games_played)

        cursor.execute(sql, values)
        self.db.commit()
        cursor.close()
    
    @classmethod
    def login(cls, email, password_hash):
        cursor = cls.db.cursor()
        sql = """SELECT * FROM users WHERE email = %s OR username = %s AND password_hash = %s;"""
        values = (email, email, password_hash)
        cursor.execute(sql, values)
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def hash_password(password, salt="salt"):
        hasher = sha512()
        hasher.update(password.encode() + salt.encode())
        return hasher.hexdigest()

    @classmethod
    def get_leaderboard(cls):
        cursor = cls.db.cursor()
        sql = """SELECT username, profile_pic, high_score FROM users ORDER BY high_score DESC LIMIT 10;"""
        cursor.execute(sql)
        result = cursor.fetchall()
        cursor.close()
        return result

    @classmethod
    def get_profile_pic(cls, username):
        try:
            cursor = cls.db.cursor()
            sql = """SELECT profile_pic FROM users WHERE username = %s;"""
            values = (username,)
            cursor.execute(sql, values)
            result = cursor.fetchone()
            cursor.close()
            return result
        except:
            pass

    @classmethod
    def get_high_score(cls, username):
        cursor = cls.db.cursor()
        sql = """SELECT high_score FROM users WHERE username = %s;"""
        values = (username,)
        cursor.execute(sql, values)
        result = cursor.fetchone()
        cursor.close()
        return result

    @classmethod
    def update_high_score(cls, username, high_score):
        cursor = cls.db.cursor()
        sql = """UPDATE users SET high_score = %s WHERE username = %s;"""
        values = (high_score, username)
        cursor.execute(sql, values)
        cursor.close()
        cls.db.commit()

    @classmethod
    def get_games_played(cls, username):
        cursor = cls.db.cursor()
        sql = """SELECT games_played FROM users WHERE username = %s;"""
        values = (username,)
        cursor.execute(sql, values)
        result = cursor.fetchone()
        cursor.close()
        return result

    @classmethod
    def update_games_played(cls, username, games_played):
        cursor = cls.db.cursor()
        sql = """UPDATE users SET games_played = %s WHERE username = %s;"""
        values = (games_played, username)
        cursor.execute(sql, values)
        cursor.close()
        cls.db.commit()

class Video:

    db = mysql.connector.connect(host='localhost', user='root', password='', database='final_project')
 
    def __init__(self, **kwargs):
        self.title = kwargs.get('title')
        self.views = kwargs.get('views')
        self.video_link = kwargs.get('video_link')
        self.pic_link = kwargs.get('pic_link')
        self.id = kwargs.get('id')

    def insert(self):
        cursor = self.db.cursor()

        sql = """INSERT INTO videos(
            title, views, video_link, pic_link, id)
            VALUES(%s, %s, %s, %s, %s);"""

        values = (self.title, self.views, self.video_link, self.pic_link, self.id)

        cursor.execute(sql, values)
        self.db.commit()
        cursor.close()
    
    @classmethod
    def get_initial_videos(cls):
        cursor = cls.db.cursor()
        sample_list = random.sample([i for i in range(1, 467)], 2)
        result = []
        for i in range(2):
            sql = """SELECT title, views, video_link, pic_link, id, pk FROM videos WHERE pk = %s;"""
            values = (sample_list[i],)
            cursor.execute(sql, values)
            video_data = cursor.fetchone()
            result.append(video_data)
        cursor.close()
        return result

    @classmethod
    def get_another_video(cls, video_list):
        cursor = cls.db.cursor()
        while 1:
            random_pk = random.randint(1, 467)
            if random_pk not in video_list:
                break
        sql = """SELECT title, views, video_link, pic_link, id, pk FROM videos WHERE pk = %s;"""
        values = (random_pk,)
        cursor.execute(sql, values)
        result = cursor.fetchone()
        cursor.close()
        return result
