from flask import Flask
from flask.templating import render_template
from werkzeug.utils import redirect

app = Flask(__name__)


@app.route('/')
def redir():
    return redirect('/playground/', code=302)

@app.route('/home/')
def index():
    return render_template('index.html')

@app.route('/playground/')
def playground():
    return render_template('playground.html')

if __name__ == "__main__":
    app.run()