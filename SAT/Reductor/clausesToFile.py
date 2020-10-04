
'''
Esta función recibe 4 objetos:
	var: número de variables de la instancia
	clausulas: Una lista(de listas) con las clausulas correspondientes a la instancia
	path: nombre con el que quedará guardado el archivo .cnf 
No tiene retorno pues crea un archivo en el directorio X-SAT con la instancia reducida
'''
def ListaDeClausulasAArchivo(var,claus,path):

	path = "./X-SAT/reduced-"+path
	file = open(path, "w")

	file.write("p cnf " + var + " " + str(len(claus)) )

	for clausula in claus:
		file.write("\n")
		file.write(" ".join([ "%d" % lit for lit in clausula ]) + " 0" )

	file.close()

