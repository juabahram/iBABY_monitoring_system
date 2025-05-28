#encoding:utf-8

import sqlite3

def almacenar_bd():
    conn = sqlite3.connect('ibaby.db')
    
    conn.execute("DROP TABLE IF EXISTS SENSORS")
    conn.execute("DROP TABLE IF EXISTS ACTUATORS")
    conn.execute('''CREATE TABLE SENSORS
       (ID            INTEGER PRIMARY KEY AUTOINCREMENT,
        TYPE            TEXT,
        VALUE TEXT NOT NULL,
        TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP);''')
    
    conn.execute('''CREATE TABLE ACTUATORS
       (ID            INTEGER PRIMARY KEY AUTOINCREMENT,
        TYPE            TEXT,
        STATE BOOLEAN NOT NULL,
        TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP);''')

    conn.commit()
    
    conn.close()
    print("DATABASE INITIALIZED CORRECTLY")



if __name__ == "__main__":
    almacenar_bd()