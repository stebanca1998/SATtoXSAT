from os import listdir
from os.path import isfile, join

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
Esta función recibe 3 objetos:
	clausulas: Una lista de las clausulas pertenecientes a las instancias que van a ser convertidas a X-SAT
	x: numero que me informa a que tipo X-SAT van a ser convertidas las clausulas
	var: número de variables de la instancia
Retorna una lista con las clausulas correspondientes a las clausular convertidas
'''
def ConvertirSATaXSAT(clausulas, x, var):

	nuevasClausulas = list()
	maxvar = int(var)
	
	for clause in clausulas:

		if( len(clause) < x ):
			continue

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


