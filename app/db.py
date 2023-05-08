
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

