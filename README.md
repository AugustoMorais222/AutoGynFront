# Autogynfront

Este projeto é o front-end do sistema **AutoGyn**, desenvolvido com [Angular CLI](https://github.com/angular/angular-cli) versão 19.2.11.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (recomendado: versão 18 ou superior)
- [Angular CLI](https://angular.io/cli): instale com o comando  
  ```bash
  npm install -g @angular/cli
  ```
- Um gerenciador de pacotes como `npm` (instalado com o Node.js)

## Instalando dependências

Após clonar o repositório, instale as dependências do projeto:

```bash
npm install
```

## Rodando o servidor de desenvolvimento

Para iniciar o servidor local de desenvolvimento, execute:

```bash
ng serve
```

Depois, acesse a aplicação no navegador:  
[http://localhost:4200](http://localhost:4200)

A aplicação será recarregada automaticamente sempre que houver mudanças no código-fonte.

## Gerando componentes automaticamente

Você pode gerar novos componentes, serviços, módulos e outros artefatos Angular com os comandos da CLI.  
Por exemplo, para gerar um novo componente:

```bash
ng generate component nome-do-componente
```

Para ver todos os comandos disponíveis:

```bash
ng generate --help
```

## Compilando para produção

Para gerar os arquivos otimizados para produção, execute:

```bash
ng build --configuration production
```

Os arquivos resultantes serão gerados na pasta `dist/`.

## Executando testes unitários

Para rodar os testes unitários com o [Karma](https://karma-runner.github.io):

```bash
ng test
```

## Testes de ponta a ponta (e2e)

Se você configurou testes e2e (como com Cypress ou Protractor), execute:

```bash
ng e2e
```

> ⚠️ Observação: Angular CLI não inclui uma ferramenta de e2e por padrão. Escolha e configure a que preferir.

## Recursos adicionais

- [Documentação do Angular CLI](https://angular.dev/tools/cli)
- [Documentação oficial do Angular](https://angular.dev/)
