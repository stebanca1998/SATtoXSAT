from os import listdir
from os.path import isfile, join
from itertools import product
import numpy as np

onlyfiles = [f for f in listdir("../InstanciasSAT/") if isfile(join("../InstanciasSAT/", f))]

'''
Esta función recibe el nombre de un archivo de tipo .cnf y retorna 3 objetos
	clausulas: Una lista(de listas) con las clausulas correspondientes a la instancia
	variables: número de variables de la instancia
	numclausulas: número de clausulas que contiene la instancia
'''
def ArchivoAListaDeClausulas(path):

	file = open("../InstanciasSAT/"+path)

	clausulas = list()
	clausulas.append(list())

	variables = 0
	numclausulas = 0

	for line in file:

		tokens = line.split()

		if len(tokens) == 0 or tokens[0] == "c":
			continue

		if tokens[0] == "p":
			variables = tokens[2]
			numclausulas = tokens[3]
			continue

		for nums in tokens:

			lit = int(nums)

			if lit == 0:
				clausulas.append(list())
			else:
				clausulas[-1].append(lit)

	assert len(clausulas[-1]) == 0
	clausulas.pop()

	file.close()

	return clausulas, variables, numclausulas

'''
Esta función recibe 4 objetos:
	var: número de variables de la instancia
	clausulas: Una lista(de listas) con las clausulas correspondientes a la instancia
	path: nombre con el que quedará guardado el archivo .cnf 
No tiene retorno pues crea un archivo en el directorio X-SAT con la instancia reducida
'''
def ListaDeClausulasAArchivo(var,claus,path):

	path = "../X-SAT/reduced-"+path
	file = open(path, "w")

	file.write("p cnf " + var + " " + str(len(claus)) )

	for clausula in claus:
		file.write("\n")
		file.write(" ".join([ "%d" % lit for lit in clausula ]) + " 0" )

	file.close()


'''
Función auxiliar que genera nuevas variables numéricas aún no usadas, recibe 1 argumento:
    max_variable_usada: mayor valor numérico usado por una variable en el conjunto de entrada
    (observación -> se incializa solo una vez en todo el programa)
Retorna una nueva varible a partir de 'max_variable_usada + 1', cada que se llama con el metodo 'next(var)'
'''
def GeneradorDeVariables(max_variable_usada):

    n = max_variable_usada + 1
    while True:
        yield n
        n += 1

'''
Esta función recibe 3 argumentos:
    clausula: la clausula actual de la lista de clausulas que van a ser convertidas a X-SAT    
    x: numero que me informa a que tipo X-SAT van a ser convertidas las clausulas
    nuevasClausulas: variable donde se almacenarán las clausulas generadas
NO retorna nada, ya que adiciona el resultado directamente a las clausulas de salida en 'nuevasClausulas'
'''
def GenerarNuevasClausulas(clausula, x, nuevasClausulas):
    
    num_variables_adicionales = x-len(clausula)    
    lista_variables_adicionales = [next(variable) for i in range(num_variables_adicionales)]    
    matriz_de_signos = [list(i) for i in product([1,-1],repeat=num_variables_adicionales)]
        
    for var in matriz_de_signos:
        nuevasClausulas.append( clausula + (np.array(lista_variables_adicionales) * np.array(var)).tolist() )

'''
Esta función recibe 3 objetos:
	clausulas: Una lista de las clausulas pertenecientes a las instancias que van a ser convertidas a X-SAT
	x: numero que me informa a que tipo X-SAT van a ser convertidas las clausulas
	var: número de variables de la instancia
Retorna una lista con las clausulas correspondientes a las clausular convertidas
'''
def ConvertirSATaXSAT(clausulas, x, var):

	nuevasClausulas = list()
	maxvar = int(var)

	max_variable_usada = max( [item for sublist in clausulas for item in sublist] )
	global variable
	variable = GeneradorDeVariables(max_variable_usada) # inicializar el generador	
	
	
	for clause in clausulas:

		if( len(clause) < x ):
			GenerarNuevasClausulas(clause, x, nuevasClausulas)

		if( len(clause) == x ):
			nuevasClausulas.append(clause)

		if( len(clause) > x ):

			nuevasClausulas.append(list())
			for i in range(0, x-1):
				nuevasClausulas[-1].append(clause[i])
			maxvar += 1
			nuevasClausulas[-1].append(maxvar)

			for i in range(x-1,len(clause)-x+1):
				nuevasClausulas.append(list())
				nuevasClausulas[-1].append(-maxvar)
				nuevasClausulas[-1].append(clause[i])
				maxvar += 1
				nuevasClausulas[-1].append(maxvar)

			nuevasClausulas.append(list())
			nuevasClausulas[-1].append(-maxvar)
			for i in range(len(clause)-x+1, len(clause)):
				nuevasClausulas[-1].append(clause[i])

	return nuevasClausulas, str(maxvar)

#=============================================================================================================

ejemploClau = [[1, -2, 3], [2, 4, 5,], [4, 6, 2, -1]]



x,y,z = ArchivoAListaDeClausulas(onlyfiles[0])

ejemploConv,variables = ConvertirSATaXSAT(x,3,y)

ListaDeClausulasAArchivo(variables,ejemploConv,onlyfiles[0])


