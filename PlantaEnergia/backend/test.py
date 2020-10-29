from minizinc import Instance, Model, Solver,default_driver

print(default_driver.minizinc_version)

# Load n-Queens model from file
model = Model("./PlantaEnergia.mzn")
model.add_file("Instancia1.dzn")
# Find the MiniZinc solver configuration for Gecode
gecode = Solver.lookup("gecode")

# Create an Instance of the n-Queens model for Gecode
instance = Instance(gecode, model)

result = instance.solve()
# Output the array q
print(result)
