## Flask

Crear un entorno virtual para instalar las dependencias de Python y posteriormente activar este entorno virtual

```sh
$ virtualenv venv
$ # en Linux 
$ source venv/bin/activate
$ # en Windows 
$ .\venv\Scripts\activate
```

Luego clonar el repositorio dentro del folder del entorno virtual:

```sh
$ cd venv
$ git clone https://github.com/stebanca1998/SATtoXSAT
```


Luego instalamos las dependencias:

```sh
(venv)$ cd SATtoXSAT
(venv)$ cd PlantaEnergia/backend
(venv)$ pip install -r requirements.txt
```
Nota el `(venv)` frente al prompt. Esto indica que el entono virtual esta activado.

Una vez `pip` ha terminado de descargar las dependencias corrremos el servidor de Flask:
```sh
(venv)$ python app.py
```

Para correr el proyecto posteriormente solo se debe activar el entorno virtual como se indicó en el primer paso.

## React

En una terminal diferente a la de Flask:

```sh
$ cd SATtoXSAT
$ cd PlantaEnergia/frontend
$ npm install
$ npm start
```
