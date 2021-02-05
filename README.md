# Bolsa de trabajo  CIFP Virgen de Gracia

Se trata de una bolsa de trabajo , exclusiva del centro CIFP Virgen de Gracia , donde sus actuales y antiguos alumnos podran aparecer listados en su plataforma siendo visibles para empresas interesadas en la metodologia y conocimientos que se llevan a cabo en el centro buscando asi alguien graduado en dicho centro.



### Pre-requisitos 📋

Docker y docker compose .


## Despliegue 📦

El entorno en desarrollo esta desplegado en Docker , el primer paso seria añadir a tu archivo host las siguientes lineas:

127.0.0.1 bolsaTrabajo.com
127.0.0.1 phpmyadmin.com

Tras esto procedemos a realizar un : 

1º Realizamos *docker-compose up -d*  en el directorio de front por medio de consola.
2º Realizamos *docker-compose up -d*  en el directorio de back por medio de consola.
3º En el navegador ahora estan disponibles las siguientes direcciones bolsaTrabajo.com y phpmyadmin.com .

Contraseña por defecto :  !aA123456  para todos los usuarios.
## Autores ✒️

* **Luis Quesada** - [kherop](https://github.com/kherop)
* **Dario Leon** - [darioL506](https://github.com/darioL506)
* **Israel Molina** - [isra9shadow](https://github.com/TP01AB)  

---
## OTHER
# BolsaTrabajoFront

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
