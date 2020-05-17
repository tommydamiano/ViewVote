import mysql.connector

db = mysql.connector.connect(host='localhost', user='root', password='@@Gould2015',database='final_project')

cursor = db.cursor()

sql = """CREATE TABLE users(
        pk INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(55),
        password_hash TEXT,
        email VARCHAR(125),
        profile_pic TEXT,
        high_score INT,
        games_played INT,
        UNIQUE(username),
        UNIQUE(email)
    );"""

cursor.execute(sql)

sql = """CREATE TABLE videos(
        pk INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(128),
        views BIGINT,
        video_link TEXT,
        pic_link TEXT,
        id VARCHAR(20)
    );"""

cursor.execute(sql)
