# CarbonFootprint Calculator

Calculate how much your actions affect the carbon footprint

This calculator aims to raise awareness in the easiest way possible how our day-to-day actions have an impact on the carbon footprint we leave on the planet and thus take action to slow it down.

## Data

The system works with three databases in Json format

### 1. Questions data
Main database containing questions and answer options (actions). The latter associated with the minimum, maximum and value in ToCO₂ (Tons of carbon dioxide) that each share represents. [Source](https://iopscience.iop.org/article/10.1088/1748-9326/ab8589)

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
    ]
}
```

### 2. Emissions per capita data
This file contains the relationship between Country and Tons of CO₂ per capita. [Source](https://en.wikipedia.org/wiki/List_of_countries_by_greenhouse_gas_emissions_per_person)

```json
{
    "name": "Spain",
    "value": 6.99
}
```

### 3. Equivalence of CO₂
This file is used to pragmatize and help visualize what 1 ToCO₂ would equal. It is a list of equivalences and their multiplier coefficient. [Source](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator)

```json
{
    "text":"Average vehicle Km",
    "value": 4020,
    "icon":"fa-route"
}
```