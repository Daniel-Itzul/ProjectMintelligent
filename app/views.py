from app import app
from flask import render_template
from flask import request, redirect

@app.route('/')
def index():
    return render_template("public/index.html")

@app.route('/main', methods=["GET", "POST"])
def main():
    if request.method == "POST":
        req = request.form
        print(req)
        return redirect(req["target_page"])
    return render_template("public/main.html")