from app import app
from flask import render_template

@app.route('/')
def index():
    return render_template("public/index.html")

@app.route('/main')
def main():
    return render_template("main.html")