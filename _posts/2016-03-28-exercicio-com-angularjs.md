---
layout: post
title: "Exercício com AngularJS"
date: 2016-03-28 10:10:26
image: '/assets/exercicio-com-angularjs/exercicio-com-angularjs.jpg'
description: 'Esse é um exercício básico que recebi do meu professor de Linguagens De Programação. A resolução do mesmo devia ser feito em Delphi, mas resolvi criá-lo em Angular apenas a título de aprendizagem.'
tags:
- AngularJS
- Exercício
categories: AngularJS
---

# Exercício com AngularJS

## Introdução
Esse é um exercício básico que recebi do meu professor de Linguagens De Programação. A resolução do mesmo devia ser feito em Delphi, mas resolvi criá-lo em Angular apenas a título de aprendizagem.

### Segue o print da enunciado:
![Print do Exercício](/assets/exercicio-com-angularjs/exercicio-pdf.png)

### Resolução:
Para resolver esse exercício, eu resolvi "brincar" um pouco com o dinamismo que o Angular oferece, inclusive aplicar um conceito que aprendi a poucos dias.
Para flexibilizar o código, resolvi escreve-lo no [JSFiddle](https://jsfiddle.net/). 

Incluí apenas a biblioteca Angular e o ng-locale do Brasil. 

No estilo, apenas coloquei borda para dividir a tabela e um efeito no saldo, para melhor visualização.

No código em questão, eu criei um contoller, um filter e uma factory, sendo que o filtro criado, seria apenas para transformar o valor decimal/inteiro em um inteiro concatenado com '%'. A factory eu usei para criar uma função que recebe o valor relativo e o valor total para retornar a porcentagem.

No controller eu setei os valores como 0 (zero) e a função geral que aplica os cálculos. Então dividi cada responsabilidade em uma função.

No HTML, criei a tabela, expressei as variáveis e apliquei os filtros determinados. Para tornar mais dinâmico, coloquei a função de calculo no ng-change, para chamar a função assim que o valor for alterado, também disponibilizei um botão para calcular, sendo ele, vinculado ao evento click (ng-click). No saldo, eu usei a diretiva ng-class para aplicar a classe de valor positivo ou negativo.

As práticas que apliquei, foi setar o módulo com `angular.module('', [])` sem atribuir a nenhuma variável, para então chamá-lo em `angular.module('')`. Outra questão importante que aprendi dias atrás, foi injetar as dependências verbalmente: `['dep1', 'dep2', function(dep1, dep2){}]`. Pois assim, garante que o primeiro e segundo parâmetro se referem a dependência 1 e dependência 2. Permitindo a minificação do arquivo sem gerar error, por ex: `['$scope', 'porcentFactory', function('$scope', 'porcentFactory'){}]` minifica para: `['$scope', 'porcentFactory', function('a', 'b'){}]`

### Código:
O link para o JSFiddle está [aqui](https://jsfiddle.net/lucasmahle/t4csk866/7/).
Ou visualize por aqui mesmo:
<script async src="http://jsfiddle.net/lucasmahle/t4csk866/6/embed/js,html,css,result/dark/"></script>