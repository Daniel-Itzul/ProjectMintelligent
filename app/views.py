from app import app
from flask import render_template
from flask import request, redirect, jsonify, make_response
from app import mainUtils
import scrapmaster
import json

@app.route('/')
def index():
    return render_template("public/index.html")

@app.route('/main')
def main():
    return render_template("public/main.html")

@app.route("/main/request-category", methods=["POST"])
def create_entry():
    req = request.get_json()
    response = mainUtils.prepareResponse(req["url"])
    res = make_response(json.dumps(response), 200)
    return res

@app.route('/test')
def test():
    return render_template("public/test-table.html")