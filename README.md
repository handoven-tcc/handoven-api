# API-APS6

Criar .env com MASTER_KEY

##### instalar dependencias
`npm i`

##### rodar testes
`npm run coverage`

##### rodar api
`npm run dev`


### Endpoints Products:

##### get
`http://localhost:9000/products`

##### get :id
`http://localhost:9000/products/63424365c2123898724a3772`

##### get :familyId
`http://localhost:9000/products/familyId/6346ebaf7e09cc2e95bf1689`

##### post
`http://localhost:9000/products`
```json
{
    "name": "Molho de Banana",
    "type": "notRefrigerated",
    "validity": "2022-10-29T00:00:00.000Z",
    "category": "Canned",
    "cost": "3.95",
    "amount": 5,
    "familyId": "6346ebaf7e09cc2e95bf1689"
}
```

##### put :id
`http://localhost:9000/products/6342519146534d1b0c645e78`
```json
{
    "name": "Molho de BABA",
    "type": "notRefrigerated",
    "validity": "2022-10-29T00:00:00.000Z",
    "category": "Canned",
    "cost": "3.95",
    "amount": 5,
    "familyId": "6346ebaf7e09cc2e95bf1689"
}
```

##### delete
`http://localhost:9000/products/6342519146534d1b0c645e78`


### Endpoints Plates:

##### get
`http://localhost:9000/plates`

##### get :id
`http://localhost:9000/plates/63424365c2123898724a3772`

##### post
`http://localhost:9000/plates`
```json
{
  "name": "Lasanha de Microondas",
  "category": "oven",
  "ingredients": "Massa de Lasanha, Molho de Tomate, Presunto, Queijo Mussarela",
  "available": false
}
```

##### put :id
`http://localhost:9000/plates/6342519146534d1b0c645e78`
```json
{
  "name": "Lasanha de Forno",
  "category": "oven",
  "ingredients": "Massa de Lasanha, Molho de Tomate, Presunto, Queijo Mussarela",
  "available": false
}
```

##### delete
`http://localhost:9000/plates/6342519146534d1b0c645e78`


### Endpoints User:

##### get
`http://localhost:9000/user`

##### get :id
`http://localhost:9000/user/6344482bd7e63b4e39a2de42`


##### get :familyId
`http://0.0.0.0:9000/user/familyId/6346ebaf7e09cc2e95bf1689`

##### post
`http://localhost:9000/user`
```json
{
  "name": "Josué Jozé de Jozefino",
  "birthDate": "1969-03-12T00:00:00.000Z",
  "cell": "(00) 99999-9999",
  "email": "email.teste@gmail.com",
  "password": "UmaSenhaQualqu3r"
}
```

##### put :id
`http://localhost:9000/user/6344482bd7e63b4e39a2de42`
```json
{
  "name": "Josué Jozé de Jozefino",
  "birthDate": "1969-03-12T00:00:00.000Z",
  "cell": "(00) 99999-9999",
  "email": "email.teste@gmail.com",
  "password": "UmaSenhaQualqu3r"
}
```

##### delete
`http://localhost:9000/user/6344482bd7e63b4e39a2de42`


### Endpoints Family:

##### get
`http://localhost:9000/family`

##### get :id
`http://localhost:9000/family/6346ebaf7e09cc2e95bf1689`

##### post
`http://localhost:9000/family`
```json
{
    "name": "Alonso"
}
```

##### put :id
`http://localhost:9000/family/6346ebaf7e09cc2e95bf1689`
```json
{
    "name": "Alonso"
}
```

##### delete
`http://localhost:9000/user/6346ebaf7e09cc2e95bf1689`
