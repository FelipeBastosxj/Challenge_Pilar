# Front-End Challenge (by coodesh)

Desafio Front-End feito pela Pilar/Coodesh

## Para instalar as dependencias
```bash
yarn
# ou
npm install
```

## O projeto foi iniciado com quasar CLI então ira precisar instalar
```bash
npm i -g @quasar/cli
```

## Por precaução instale a extensão de .env do quasar
```bash
quasar ext add @quasar/dotenv
```

## Dentro da pasta procure por .env e adicione, como e so um teste não tem problema colocar aqui, mas nunca faça isso.
```bash
VUE_APP_API_URL= https://randomuser.me/api/
```

### Iniciar o app
```bash
quasar dev
```


### Rodar os testes unitarios
```bash
npm run test:unit
```


### Tecnologias utilizadas
```bash
Vue.js 3, Jest, Vuex, Router, API, Quasar, firebase, Autenticação Google, Axios, Docker.
```



### Rodar em produção
```bash
quasar build
```

### Para construir o container 
```bash
docker build -t nomeContainer  .
```

### Para rodar o container 
```bash
docker run -it -p 8000:80 --rm nomeContainer
```

### Link apresentação 
```bash
https://www.loom.com/embed/2c4d65b68acd42f9869a924534680727
```

### O login não e obrigatorio, você pode ir para a rota usando /dashboard não esta bloqueado


### Autor
[Felipe Bastos Xavier](https://www.linkedin.com/in/felipe-bastos-48376115b/).
