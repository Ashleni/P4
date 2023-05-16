
'''
We’re Witty Wombats :: Shreya Roy, Kosta Dubovskiy, Jeffrey Zou, Shafiul Haque
SoftDev Pd 2
P04
2022-05-01
'''

from flask import Flask, session, render_template, redirect, url_for, request as flask_request
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

def get_rest_everything():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()
    usrestlist = c.execute("SELECT address, city, country, keys, latitude, longitude, name, postalcode, province, websites from usrest;").fetchall()
    db.commit()
    db.close()
    return usrestlist

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

