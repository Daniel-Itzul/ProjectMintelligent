from flask import Flask
mainP = Flask(__name__)

@mainP.route('/')

def index():
    return "Testing"

if __name__ == "__main__":
    mainP.run()