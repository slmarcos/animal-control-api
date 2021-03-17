# Atualizar um animal

## Sucesso
---
  - [ ] Recebe uma requisição **PUT** no endpoint **/api/animal**. Os dados do animal são enviados no body e o ID do mesmo como parâmetro na url
  - [ ] Valida os campos campos obrigatórios
  - [ ] Atualiza o animal animal
  - [ ] Retorna os dados do animal com o código de status **200**
  - [ ] Retorna **204** se não existir animal com o ID informado

## Falha
---
  - [ ] Retorna erro **500** se ocorrer uma falha interna no servidor
  - [ ] Retorna erro **400** com uma mensagem de erro se faltar algum campo ou se for informado um valor inválido
