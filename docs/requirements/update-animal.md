# Atualizar um animal

## Sucesso
---
  - [X] Recebe uma requisição **PUT** no endpoint **/api/animal**. Os dados do animal são enviados no body e o ID do mesmo como parâmetro na url
  - [X] Valida os campos campos obrigatórios
  - [X] Atualiza o animal animal
  - [X] Retorna os dados do animal com o código de status **200**
  - [X] Retorna **204** se não existir animal com o ID informado

## Falha
---
  - [X] Retorna erro **500** se ocorrer uma falha interna no servidor
  - [X] Retorna erro **400** com uma mensagem de erro se faltar algum campo ou se for informado um valor inválido
