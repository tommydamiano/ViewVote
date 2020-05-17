import mysql.connector
from hashlib import sha512
import random
import string

db = mysql.connector.connect(host='localhost', user='root', password='@@Gould2015', database='final_project')

id_now = 375
id_to_be = 344

for i in range(124):
    cursor = db.cursor()
    sql = f"""UPDATE videos SET pk = {id_to_be} WHERE pk = {id_now};"""
    cursor.execute(sql)
    cursor.close()
    db.commit()
    id_now += 1
    id_to_be += 1