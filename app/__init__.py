from flask import Flask             #facilitate flask webserving
from flask import render_template   #facilitate jinja templating
from flask import request           #facilitate form submission
from flask import session           #facilitate sessions!
from flask import redirect
import os                           #facilitate key generation
import sqlite3


#______________________
app = Flask(__name__)    #create Flask object
from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('index.html')

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()
