# angular-shopListify
Aplicação web desenvolvida em Angular que oferece uma interface intuitiva para explorar e selecionar produtos a partir de uma lista diversificada.

Desenvolvido como parte do bootcamp front-end oferecido pela Ada Tech em parceria com a Cielo, a aplicação retorna produtos de uma API e os exibe em uma lista, apresentando sua imagem, nome, avaliação, categoria e preço. Dentro desta lista, o usuário pode clicar em qualquer um dos produtos para abrir um pop-up (modal), onde poderá visualizar a descrição do produto, bem como selecionar a quantidade de produtos que deseja adicionar ou remover de seu carrinho. Os produtos adicionados ao carrinho são armazenados no local storage do navegador do usuário.

O usuário ainda pode buscar um produto por nome, ou filtrar a lista de acordo com categorias ou preços.

## Instalação

Para instalar basta, dentro da pasta "shoplistify", rodar os seguintes comandos:

```bash
  npm install && ng serve
```

Certifique-se de estar rodando a [API](https://github.com/pablords/fake-product-api/tree/master/), e alterar o seu endereço, localizado no arquivo "product-service.ts", dentro da variável apiUrl, caso seja necessário.