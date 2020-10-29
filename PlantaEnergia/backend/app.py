from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
from minizinc import Instance, Model, Solver
import json
import asyncio



app = Flask(__name__)
CORS(app)

'''    instance["r"] = int(data["r"])
    instance["dr"] = int(data["dr"])
    instance["n"] = int(data["days"])
    instance["s"] = int(data["clients"])
    instance["Cn"] = int(data["cn"])
    instance["Ch"] = int(data["ch"])
    instance["Ct"] = int(data["ct"])
    instance["Ph"] = int(data["ph"])
    instance["Pt"] = int(data["pt"])
    instance["D"] = data["matrix"]
'''

def func(data):
    # Load model from file
    model = Model("./PlantaEnergia.mzn")
    model.add_file("Instancia1.dzn")

    # Find the MiniZinc solver configuration for Gecode
    gecode = Solver.lookup("gecode")

    # Create an Instance of the model for Gecode
    instance = Instance(gecode, model)
    
    result = instance.solve()

    return result




# Output the array q

@app.route('/', methods = ['POST'])
def update_text():
    data =  json.loads(request.data.decode("utf-8"))
   
    print("result", func(data))
    response = {
        "N": result.PN, 
        "H": result.PH, 
        "T": result.PT
        }
    print("response", response)
    return jsonify(response) 


if __name__ == '__main__':
    app.run(threaded=True)