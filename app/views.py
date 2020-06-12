from app import app
from flask import render_template

@app.route('/')
def index():
    return "<h1> Welcome </h1>"

@app.route('/main')
def main():
    return render_template("main.html")