import sqlite3
from hashlib import sha512
import random
import string

class User:

    dbpath = 'project.db'

    def __init__(self, **kwargs):
        self.username = kwargs.get('username')
        self.password_hash = kwargs.get('password_hash')
        self.email = kwargs.get('email')
        self.high_score = kwargs.get('high_score', 0)

    def insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()

            sql = """INSERT INTO users(
                    username, password_hash, email, high_score)
                    VALUES (?, ?, ?, ?);"""

            values = (self.username, self.password_hash, self.email, self.high_score)

            cursor.execute(sql, values)
    
    @classmethod
    def login(cls, email, password_hash):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE email=? AND password_hash=?"""
            values = (email, password_hash)
            cursor.execute(sql, values)
            return cursor.fetchone()

    @staticmethod
    def hash_password(password, salt="salt"):
        hasher = sha512()
        hasher.update(password.encode() + salt.encode())
        return hasher.hexdigest()

class Video:
 
    dbpath = 'project.db'

    def __init__(self, **kwargs):
        self.title = kwargs.get('title')
        self.views = kwargs.get('views')
        self.video_link = kwargs.get('video_link')
        self.pic_link = kwargs.get('pic_link')
        self.id = kwargs.get('id')

    def insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()

            sql = """INSERT INTO videos(
                title, views, video_link, pic_link, id)
                VALUES(?, ?, ?, ?, ?);"""

            values = (self.title, self.views, self.video_link, self.pic_link, self.id)
            cursor.execute(sql, values)
