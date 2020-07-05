from app import app
from flask import render_template
from flask import request, redirect
import scrapmaster
import json

extractDef = {
                "type":"1",
                "url":"",
                "elementSet":{"etag":"li","eclass":"zg-item-immersion"},
                "elementDef":[
                    {"elementName":"Rank","elementTag":"span","elementClass":"zg-bexadge-text","extractType":"0","elementExtract":"text"},
                    {"elementName":"Url","elementTag":"a","elementClass":"a-link-normal","extractType":"1","elementExtract":"href"},
                    {"elementName":"Description","elementTag":"div","elementClass":"p13n-sc-truncate","extractType":"0","elementExtract":"text"},
                    {"elementName":"Price","elementTag":"span","elementClass":"p13n-sc-price","extractType":"0","elementExtract":"text"},
                    {"elementName":"Stars","elementTag":"span","elementClass":"a-icon-alt","extractType":"0","elementExtract":"text"}
                ]
            }

@app.route('/')
def index():
    return render_template("public/index.html")

@app.route('/main', methods=["GET", "POST"])
def main():
    if request.method == "POST":
        req = request.form
        extractDef["url"] = req["target_page"]
        grid_request = scrapmaster.scrapGrid(extractDef)
        print(grid_request)
    return render_template("public/main.html")