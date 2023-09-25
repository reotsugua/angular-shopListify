# Angular ShopListify

Aplicação de desenvolvimento web no framework Angular, desenvolvida em Angular que oferece uma interface intuitiva para explorar e selecionar produtos a partir de uma lista diversificada.

Desenvolvido como parte do bootcamp front-end oferecido pela Ada Tech em parceria com a Cielo, a aplicação retorna produtos de uma API e os exibe em uma lista, apresentando sua imagem, nome, avaliação, categoria e preço. Dentro desta lista, o usuário pode clicar em qualquer um dos produtos para abrir um pop-up (modal), onde poderá visualizar a descrição do produto, bem como selecionar a quantidade de produtos que deseja adicionar ou remover de seu carrinho. Os produtos adicionados ao carrinho são armazenados no local storage do navegador do usuário.

O usuário ainda pode buscar um produto por nome, ou filtrar a lista de acordo com categorias ou preços.

## Instalação

Para instalar basta, dentro da pasta "shoplistify", rodar os seguintes comandos:

```bash
  npm install && ng serve
```

Certifique-se de estar rodando a [API](https://github.com/pablords/fake-product-api/tree/master/), e alterar o seu endereço, localizado no arquivo "product-service.ts", dentro da variável apiUrl, caso seja necessário.

### Front-end


>Tela do front:


<p  align="center">
<img  width="460"  height="300"  src="src/assets/tela.gif">
</p>

  
<p  align="center">
<img  width="460"  height="300"  src="src/assets/modal.png">
</p>

  
<p  align="center">
<img  width="460"  height="300"  src="src/assets/tema-dark.png">
</p>

  
<p  align="center">
<img  width="460"  height="300"  src="src/assets/tema-light.png">
</p>


### Getting Started


## Rodar localmente

  
caso possua o gerenciador de versão do node `nvm` necessário Node => v18

  

```bash

nvm  use && npm  install && npm start

```

  

ou

  

```bash

npm  install && npm start

```

  

#### Versão do Angular: 16.1.0

  

**Back-end:**


>. Api fornecida pelo professor [Pablo](https://github.com/pablords/fake-product-api/tree/master) de listagem de produtos / pedido

  
## Documentação da API


#### Retorna todos os itens

  

```http

GET /products

```

  

| Parâmetro | Tipo | Descrição |

| :---------- | :--------- | :---------------------------------- |

| `pageSize` | `string` | **Opcional**. quantidade de produtos retornados |

| `pageNumber` | `string` | **Opcional**. número da pagina |

| `search` | `string` | **Opcional**. nome do produto |

## Projeto Shoplistify realizado pela equipe:

>.  [Cristina Dias](https://github.com/crisgit) 
>.  [ Mateus Felipe](https://github.com/mateus271) 
>.  [Rosangela](https://github.com/Roseffc) 
>. [Renan Santos](https://github.com/reotsugua) 
