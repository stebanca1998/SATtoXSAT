import sys

'''
Esta función recibe el nombre de un archivo de tipo .cnf y retorna 3 objetos
	clausulas: Una lista(de listas) con las clausulas correspondientes a la instancia
	variables: número de variables de la instancia
	numClausulas: número de clausulas que contiene la instancia
'''
def ArchivoAListaDeClausulas(path):

	file = open("./InstanciasSAT/"+path)

	clausulas = list()
	clausulas.append(list())

	variables = 0
	numClausulas = 0

	for line in file:

		tokens = line.split()

		if len(tokens) == 0 or tokens[0] == "c":
			continue

		if tokens[0] == "p":
			variables = tokens[2]
			numClausulas = tokens[3]
			continue

		for nums in tokens:
			
			if nums=="%":
			   break
			lit = int(nums)

			if lit == 0:
				clausulas.append(list())
			else:
				clausulas[-1].append(lit)

	assert len(clausulas[-1]) == 0
	clausulas.pop()

	file.close()

	return clausulas, variables, numClausulas


