from http.server import HTTPServer, BaseHTTPRequestHandler
from io import BytesIO
import json
from minizinc import Instance, Model, Solver,default_driver


'''
Esta función recibe 4 objetos:
    var: número de variables de la instancia
    clausulas: Una lista(de listas) con las clausulas correspondientes a la instancia
    path: nombre con el que quedará guardado el archivo .cnf 
No tiene retorno pues crea un archivo en el directorio X-SAT con la instancia reducida
'''
def writeInstace(body):

    path = "./Datos.dzn"
    file = open(path, "w")

    file.write("r="+ str(body["r"])+";\n")
    file.write("dr="+ str(body["dr"])+";\n")
    file.write("n="+ str(body["days"])+";\n")
    file.write("s="+ str(body["clients"])+";\n")
    file.write("Cn="+ str(body["cn"])+";\n")
    file.write("Ch="+ str(body["ch"])+";\n")
    file.write("Ct="+ str(body["ct"])+";\n")
    file.write("Pn="+ str(body["pn"])+";\n")
    file.write("Ph="+ str(body["ph"])+";\n")
    file.write("Pt="+ str(body["pt"])+";\n")
    
    file.write("D=[|")
    for day in body["matrix"]:
        for index,client in enumerate(day,start=1):
            if index!=len(day):
                file.write(str(client)+",")
            else:
                file.write(str(client))
        file.write("|")
    file.write("];")

    file.close()
    

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):  

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode('utf-8')
        body = json.loads(body)
        
        # Load n-Queens model from file
        model = Model("../../Modelo Minizinc/PlantaEnergia.mzn")
        
        #Create data file
        writeInstace(body)

        #add data file
        model.add_file("Datos.dzn")

        # Find the MiniZinc solver configuration for Gecode
        gecode = Solver.lookup("coin-bc")
        
        # Create an Instance of the n-Queens model for Gecode
        instance = Instance(gecode, model)

        #Execute minizinc
        result = instance.solve()


        # Output the array q
        if result.solution is None:
            responseData={
                'satisfactible':False
            }
        else:
            # Respuesta
            responseData = {
                'satisfactible':True,
                "N": result["PN"], 
                "H": result["PH"], 
                "T": result["PT"],
                "Objective": result["objective"]
            }

        print(responseData)

        self.send_response(200)        
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        response = BytesIO()

        jsonData = json.dumps(responseData)
        binaryData = jsonData.encode()        
        response.write(binaryData)        
        self.wfile.write(response.getvalue())


httpd = HTTPServer(('localhost', 5000), SimpleHTTPRequestHandler)
httpd.serve_forever()