import sqlite3

dbpath = 'project.db'

def schema(dbpath=dbpath):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()

        sql = """CREATE TABLE users(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(55),
            password_hash VARCHAR(55),
            email VARCHAR(125),
            high_score INTEGER,
            UNIQUE(username),
            UNIQUE(email)
        );"""

        cursor.execute(sql)

        sql = """CREATE TABLE videos(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(128),
            views INTEGER,
            video_link TEXT,
            pic_link TEXT,
            id VARCHAR(20)
        );"""

        cursor.execute(sql)

if __name__ == "__main__":
    schema()
