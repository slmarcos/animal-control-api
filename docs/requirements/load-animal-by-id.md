# Buscar um animal por ID

## Sucesso
---
  - [X] Recebe uma requisição **GET** no endpoint **/api/animal/:animalId**. O ID do animal é enviado como parâmetro na url
  - [X] Valida o id do animal
  - [X] Busca o animal por ID
  - [X] Retorna os dados do animal com o código de status **200**
  - [X] Retorna **204** se não existir animal com o ID informado

## Falha
---
  - [X] Retorna erro **500** se ocorrer uma falha interna no servidor
  - [X] Retorna erro **400** com uma mensagem de erro se for informado um id inválido
