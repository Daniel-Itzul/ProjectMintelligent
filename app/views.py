from app import app
from flask import render_template
from flask import request, redirect, jsonify, make_response
from app import mainUtils
import json

@app.route('/')
def index():
    return render_template("public/index.html")

@app.route('/xplorer')
def main():
    return render_template("public/xplorer.html")

@app.route("/main/request-category", methods=["POST"])
def create_entry():
    req = request.get_json()
    response = mainUtils.prepareResponse(req["url"])
    res = make_response(json.dumps(response), 200)
    return res

@app.route('/feedback')
def feedback():
    return render_template("public/feedback.html")

@app.route('/contact')
def contact():
    return render_template("public/contact.html")