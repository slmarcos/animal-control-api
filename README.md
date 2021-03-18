# **Animal-Control-API**

Para executar o projeto pela primeira vez é necessário executar o comando `npm install` e na sequência o `npm run up:prod`. A API estará disponível para acesso na porta **3010**.

# **Scripts disponíveis**

### `npm run start`
Inicia a aplicação executando o arquivo main.

### `npm run build`
Gera o build do projeto.

### `npm run build:watch`
Gera o build do projeto e mantem no modo watch para recompilar caso tenha alguma alteração no código.

### `npm run debug`
Inicia a aplicação com o nodemon e habilita a porta 9222 para debug pelo VSCode.

### `npm run up:dev`
Executa o comando `docker-compose -f docker-compose-dev.yaml up -d`.

### `npm run down:dev`
Executa o comando `docker-compose -f docker-compose-dev.yaml down`.

### `npm run up:prod`
Gera o build do projeto e executa o comando docker-compose up -d

### `npm run down:prod`
Executa o comando docker-compose down

### `npm run test`
Executa todos os testes

### `npm run test:unit`
Executa os testes unitários no modo watch

### `npm run test:integration`
Executa os testes de integração

### `npm run test:ci`
Executa todos os testes e gera o coverage

# **Endpoints**

## Criar um animal
`[POST] /api/animal`
### Request
#### Body
    {
      "name": string,
      "age": number,
      "weight": number,
      "type": string
    }
### Response
    statusCode: 200
    {
      "id": string,
      "name": string,
      "age": number,
      "weight": number,
      "type": string
    }

## Atualizar um animal
`[PUT] /api/animal/:animalId`
### Request
#### Body
    {
      "name": string,
      "age": number,
      "weight": number,
      "type": string
    }
### Response
    statusCode: 200
    {
      "id": string,
      "name": string,
      "age": number,
      "weight": number,
      "type": string
    }

Caso o ID informado não exista a resposta será ***noContent***:
    
    statusCode: 204


## Buscar um animal por ID
`[GET] /api/animal/:animalId`
### Request
    
### Response
    statusCode: 200
    {
      "id": string,
      "name": string,
      "age": number,
      "weight": number,
      "type": string
    }

Caso o ID informado não exista a resposta será  ***noContent***:
    
    statusCode: 204


## Buscar todos os animais
`[GET] /api/animals`
### Request
    
### Response
    statusCode: 200
    [
      {
      "id": string,
      "name": string,
      "age": number,
      "weight": number,
      "type": string
      },
      {
      "id": string,
      "name": string,
      "age": number,
      "weight": number,
      "type": string
      }
    ]

Caso não tenha animais cadastrados a resposta será:
    
    statusCode: 200
    []

# **Erros**
## Falha na solicitação - Atributo não enviado
    statusCode: 400
    {
      "error": "Missing param: ${nome do parâmetro}"
    }

## Falha na solicitação - Parâmetro inválido
    statusCode: 400
    {
      "error": "Invalid param: ${nome do parâmetro}"
    }

## Falha interna
    statusCode: 500
    {
      "error": "Internal server error"
    }
