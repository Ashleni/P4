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
    #restaurants = get_restaurant_coordinates()
    return render_template('test.html')

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()

