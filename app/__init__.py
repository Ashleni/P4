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

#Reading data
data_df = pd.read_csv("./static/data/churn_data.csv")
churn_df = data_df[(data_df['Churn']=="Yes").notnull()]

#csv reader, already completed created db
df = pd.read_csv('static/data/FastFoodRestaurants.csv', skiprows=0)

if (countrest() == 0):
    for i in range(len(df.index)):
        store_rest_data(df.loc[i])

dx = pd.read_csv('static/data/fastfood.csv', skiprows=0)

if (countnutr() == 0):
    for i in range(len(dx.index)):
        store_nutr_data(dx.loc[i])


@app.route("/")
def index():
    chains = ['wendys', 'dominos', 'sonic', 'taco bell', 'whataburger', 'popeyes', 'subway', 'pizza hut', 'arbys', 'chick-fil-a', 'jack in the box', 'bojangles']
    return render_template('index.html', chains=chains)

def calculate_percentage(val, total):
   """Calculates the percentage of a value over a total"""
   percent = np.round((np.divide(val, total) * 100), 2)
   return percent

def data_creation(data, percent, class_labels, group=None):
   for index, item in enumerate(percent):
       data_instance = {}
       data_instance['category'] = class_labels[index]
       data_instance['value'] = item
       data_instance['group'] = group
       data.append(data_instance)

@app.route("/insights")
def insights():
    restaurants = ["McDonald's", "Burger King", "Wendy's", "Domino's", "Taco Bell", "Sonic", "Whataburger", "Popeyes", "Subway", "Pizza Hut", "Arby's", "Chick-fil-A", "Jack-in-the-Box", "Bojangle's"]
    restaurant = "McDonald's"
    return render_template('insights.html', restaurant = restaurant, restaurants=restaurants)

@app.route("/analysis")
def analysis():
    return render_template('analysis.html')

@app.route("/takeaways")
def takeaways():
    return render_template('takeaways.html')

@app.route("/about")
def about():
    return render_template('about.html')

@app.route("/nutrition")
def nutrition():
    return render_template('nutrition.html')

@app.route('/restaurants')
def get_rest_coordinates():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    usrestlist = c.execute("SELECT address, city, country, keys, latitude, longitude, name, postalcode, province, websites from usrest;").fetchall()
    db.commit()
    db.close()
    return jsonify(usrestlist)

@app.route('/nutritions')
def get_nutritions():
    db = sqlite3.connect('p4.db')
    print("Database connection successful")
    c = db.cursor()
    restnutrlist = c.execute("SELECT rest, item, calories, calfat, totalfat, satfat, transfat, chol, sodium, totalcarb, fiber, sugar, protein, vita, vitc, calcium from nutr;").fetchall()
    db.commit()
    db.close()
    print(restnutrlist)
    return jsonify(restnutrlist)


'''
@app.route('/get_piechart_data')
def get_piechart_data():
   contract_labels = ['Month-to-month', 'One year', 'Two year']
   _ = churn_df.groupby('Contract').size().values
   class_percent = calculate_percentage(_, np.sum(_)) #Getting the value counts and total

   piechart_data= []
   data_creation(piechart_data, class_percent, contract_labels)
   return jsonify(piechart_data)

@app.route('/get_barchart_data')
def get_barchart_data():
   tenure_labels = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79']
   churn_df['tenure_group'] = pd.cut(churn_df.tenure, range(0, 81, 10), labels=tenure_labels)
   select_df = churn_df[['tenure_group','Contract']]
   contract_month = select_df[select_df['Contract']=='Month-to-month']
   contract_one = select_df[select_df['Contract']=='One year']
   contract_two =  select_df[select_df['Contract']=='Two year']
   _ = contract_month.groupby('tenure_group').size().values
   mon_percent = calculate_percentage(_, np.sum(_))
   _ = contract_one.groupby('tenure_group').size().values
   one_percent = calculate_percentage(_, np.sum(_))
   _ = contract_two.groupby('tenure_group').size().values
   two_percent = calculate_percentage(_, np.sum(_))
   _ = select_df.groupby('tenure_group').size().values
   all_percent = calculate_percentage(_, np.sum(_))

   barchart_data = []
   data_creation(barchart_data,all_percent, tenure_labels, "All")
   data_creation(barchart_data,mon_percent, tenure_labels, "Month-to-month")
   data_creation(barchart_data,one_percent, tenure_labels, "One year")
   data_creation(barchart_data,two_percent, tenure_labels, "Two year")
   return jsonify(barchart_data)
'''
   
@app.route('/pieChart')
def get_pieChart_data():
    return get_for_piechart("McDonald's")
    
@app.route('/stateBarData')
def state_data():
    return interpretData()

@app.route('/stateBarLabel')
def state_label():
    return  interpretLabel()
    
@app.route('/chainBarLabel')
def chain_label():
    return interpretChainsLabel()
    
@app.route('/chainBarData')
def chain_data():
    return interpretChainsData()

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()


# from flask import Flask
# app = Flask(__name__)

# @app.route("/")
# def hello_world():
#     return "No hablo queso"

# if __name__ == "__main__":  # true if this file NOT imported
#     app.debug = True        # enable auto-reload upon code change
#     app.run()

