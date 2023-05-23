from flask import Flask, jsonify    #facilitate flask webserving
from flask import render_template   #facilitate jinja templating
from flask import request           #facilitate form submission
from flask import session           #facilitate sessions!
from flask import redirect
from db import *
import os                           #facilitate key generation
import sqlite3
import csv
import pandas as pd
import numpy as np
import json
#______________________
app = Flask(__name__)    #create Flask object
from flask import Flask, render_template
app = Flask(__name__)


#csv reader, already completed created db
'''df = pd.read_csv('static/data/FastFoodRestaurants.csv', skiprows=0)

if (countrest() == 0):
    for i in range(len(df.index)):
        store_rest_data(df.loc[i])'''



@app.route("/")
def index():
    restaurants = get_for_treemap("McDonald's")
    return render_template('test.html', restaurants = restaurants)
    

@app.route('/restaurants')
def get_restaurant_coordinates():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    desired = "McDonald's"
    c.execute('''SELECT province FROM usrest WHERE name LIKE "McDonald's";''')
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
'''

@app.route('/restaurants')
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
'''
if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()

