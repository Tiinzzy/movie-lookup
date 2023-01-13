import mysql.connector

def open_database():
    con = mysql.connector.connect(user='dbadmin', password='washywashy',host='127.0.0.1',database='tests')
    return con, con.cursor()

def close_database(con, cursor):
    cursor.close()
    con.close()