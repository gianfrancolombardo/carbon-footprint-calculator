# CarbonFootprint Calculator

Calcula cuanto afectan tus acciones a la huella de carbono

Esta calculadora pretende consientizar de la forma mas facil posible como nuestras acciones del dia a dia tienen un impacto en la huella de carbono que dejamos en el planeta y de este modo accionar para realentizar la misma.

## Data

El sistema funciona con tres base de datos en formato Json

### 1. Questions data
Base de datos principal que contiene preguntas y opciones de respuesta (acciones). Estas ultimas asosiada al valor en ToCO₂ (Toneladas de dioxido de carbono) que representa cada accion. [Fuente](https://iopscience.iop.org/article/10.1088/1748-9326/ab8589)

```json
{
    "question": "Question 1?",
    "options": [
        {
            "value": 2.0979,
            "min": 1.32,
            "max": 2.525,
            "text": "Action 1"
        },
        ...
    ]
}
```

### 2. Emissions per capita data
Este archivo contiene la relacion entre Pais y Toneladas de CO₂ por habitante. [Fuente](https://en.wikipedia.org/wiki/List_of_countries_by_greenhouse_gas_emissions_per_person)

```json
{
    "name": "Spain",
    "value": 6.99
}
```

### 3. Equivalence of CO₂
Este archivo es utilizado para pragmatisar y ayudar a visualizar a que equivaldria 1 ToCO₂. Es un listado de equivalencias y su coeficiente multiplicador. [Fuente](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator)

```json
{
    "text":"Km vehículo promedio",
    "value": 4020,
    "icon":"fa-route"
}
```