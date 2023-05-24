
'''
We’re Witty Wombats :: Shreya Roy, Kosta Dubovskiy, Jeffrey Zou, Shafiul Haque
SoftDev Pd 2
P04
2022-05-01
'''

from flask import Flask, session, jsonify, render_template, redirect, url_for, request as flask_request
from db import *
from urllib import *
import http.client
import urllib.request
import sqlite3
import json
import os

DB_FILE = "p4.db"
db = sqlite3.connect(DB_FILE, check_same_thread = False)
c = db.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS usrest(address TEXT, city TEXT, country TEXT, keys TEXT, latitude FLOAT, longitude FLOAT, name TEXT, postalcode INTEGER, province INTEGER, websites TEXT)""")
c.execute("""CREATE TABLE IF NOT EXISTS nutr(rest TEXT, item TEXT, calories INTEGER, calfat INTEGER, totalfat INTEGER, satfat INTEGER, transfat INTEGER, chol INTEGER, sodium INTEGER, totalcarb INTEGER, fiber INTEGER, sugar INTEGER, protein INTEGER, vita INTEGER, vitc INTEGER, calcium INTEGER, salad TEXT)""")
c.execute("""CREATE TABLE IF NOT EXISTS pov(code INTEGER, state TEXT, area TEXT, pov INTEGER, percent FLOAT, povyoung INTEGER, income INTEGER)""")


def store_rest_data(stored_data):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("insert into usrest values (?,?,?,?,?,?,?,?,?,?);", stored_data)
    db.commit()
    db.close()

def store_nutr_data(stored_data):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("insert into nutr values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);", stored_data)
    db.commit()
    db.close()

def store_pov_data(stored_data):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    c.execute("insert into pov values (?,?,?,?,?,?,?);", stored_data)
    db.commit()
    db.close()

def countrest():
    count_rest = c.execute("""SELECT COUNT(*) FROM usrest""")
    count_rest = c.fetchone()[0]
    return count_rest

def countnutr():
    count_nutr = c.execute("""SELECT COUNT(*) FROM nutr""")
    count_nutr = c.fetchone()[0]
    return count_nutr


def get_rest_everything():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    usrestlist = c.execute("SELECT address, city, country, keys, latitude, longitude, name, postalcode, province, websites from usrest;").fetchall()
    db.commit()
    db.close()
    return jsonify(usrestlist)

def get_nutr_everything():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    usrestlist = c.execute("SELECT nutr, item, calories, calfat, totalfat, satfat, transfat, chol, sodium, totalcarb, fiber, sugar, protein, vita, vitc, calcium, salad from nutr;").fetchall()
    db.commit()
    db.close()
    return usrestlist

def get_pov_everything():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    povlist = c.execute("SELECT code, state, area, pov, percent, povyoung, income from pov;").fetchall()
    db.commit()
    db.close()
    return povlist

def get_restaurant_coordinates():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    c.execute("SELECT name, latitude, longitude FROM usrest;")
    restaurants = c.fetchall()
    db.commit()
    db.close()
    print(restaurants)
    return jsonify(restaurants)

def get_for_piechart(name):
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    desired = name
    c.execute('''SELECT province FROM usrest WHERE name LIKE "''' + desired + '''";''')
    restaurants = c.fetchall()
    db.commit()
    db.close()
    #print(restaurants)
    #west, midwest, northeast, south
    west = ["AK", "AZ", "CA", "CO", "HI", "ID", "MT", "NM", "NV", "OR", "UT", "WA", "WY"]
    midwest = ["IA", "IL", "IN", "KS", "MI", "MN", "MO", "ND", "NE", "OH", "SD", "WI"]
    northeast = ["CT", "MA", "ME", "NH", "NJ", "NY", "PA", "RI", "VT"]
    south = ["AL", "AR", "DC", "DE", "FL", "GA", "KY", "LA", "MD", "MS", "NC", "OK", "SC", "TN", "TX", "VA", "WV"]
    final = [0,0,0,0]
    for i in restaurants:
        if i[0] in west:
            final[0] += 1
        elif i[0] in midwest:
            final[1] += 1
        elif i[0] in northeast:
            final[2] += 1
        elif i[0] in south:
            final[3] += 1
        #final.append(i[0])
        #print(final)
    return jsonify(final)
    
def interpretData():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    c.execute('''SELECT province, Count(province) as TotalRepetitions From usrest Group By province Order By TotalRepetitions DESC''')
    result = c.fetchall()
    db.commit()
    db.close()
    final = []
    for i in result:
        final.append(i[1])
    return final
    
    
def interpretLabel():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    c.execute('''SELECT province, Count(province) as TotalRepetitions From usrest Group By province Order By TotalRepetitions DESC''')
    result = c.fetchall()
    db.commit()
    db.close()
    final = []
    for i in result:
        final.append(i[0])
    return final    
    
def interpretChainsLabel():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    c.execute('''SELECT name, Count(name) as TotalRepetitions From usrest Group By name Order By TotalRepetitions DESC''')
    result = c.fetchall()
    db.commit()
    db.close()
    final = []
    i = 0
    while i < 15:
        final.append(result[i][0])
        i += 1
    return final   
    
def interpretChainsData():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    c.execute('''SELECT name, Count(name) as TotalRepetitions From usrest Group By name Order By TotalRepetitions DESC''')
    result = c.fetchall()
    db.commit()
    db.close()
    final = []
    i = 0
    while (i < 15):
        final.append(result[i][1])
        i+= 1
    return final


    
#print(interpretChainsData())





'''
    SELECT *
FROM usrest
GROUP By province
Having Count(*) = (
SELECT MAX(Cnt) FROM(
SELECT COUNT(*) as Cnt
FROM usrest
GROUP BY province) tmp)
'''