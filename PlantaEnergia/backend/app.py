from flask import Flask, request
from flask import jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/', methods = ['POST'])
def update_text():
    data = request.data.decode("utf-8") 
    print("\nrequest", data)    
    
    response = {
        "N": [1, 2, 3], 
        "H": [4, 5, 6], 
        "T": [7, 8, 9]
        }
    # print("response", response)
    return jsonify(response) 


if __name__ == '__main__':
    app.run()