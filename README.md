![Deploy badge](https://github.com/diegoprofissional/imoveis-backend/actions/workflows/main.yml/badge.svg)

**Esse repositório se trata de um backend feito em Nodejs para fins de demonstração de boas práticas de código.**



**O frontend do sistema foi feito em Angular e pode ser acessado abaixo.**

[Frontend do site](http://www.imootour.com) 



**.**



O projeto se trata de um módulo de cadastro de imóveis. Se trata de um MVP (minimum viable product) com as funcionalides iniciais de cadastro de corretores e também de alguns imóveis, casa e apartamento, para vendas.

estrutura do projeto

O projeto tem a pasta src como root da aplicação.
dentro de src temos 5 pastas principais (presentation, domain, data, infra e main)

presentation (controllers)
domain (modelos)
data (implementações de repositórios)
infra (adaptadores de bibliotecas externas, express, sharp)
main (factories, decorators, configurações)

Principais tecnologias utilizadas na API

Postgres (como banco de dados)
typeorm (como ORM)
express
API Rest
SQL
Typescript
Javascript
Pg-Mem para teste de integração
Jest para teste de unidade
ESLint
Git


algumas técnicas de desenvolvimento utilizadas
TDD
Teste de integração
Factory
Adapter
Composite
Decorator
Proxy
Clean Arquitecture
clean code
Linting
Versionamento de projeto
Dependency Injection
Builder
Single Responsibility Principle (SRP)
Open Closed Principle (OCP)
Liskov Substitution Principle (LSP)
Interface Segregation Principle (ISP)
Dependency Inversion Principle (DIP)
Separation of Concerns (SOC)
Don't Repeat Yourself (DRY)
You Aren't Gonna Need It (YAGNI)
Keep It Simple, Silly (KISS)
Composition Over Inheritance

**CI/CD**

Github Workflow

**Notas para os programadores**

Arquivos de configurações

Informações sensíveis no .env
As chaves de APIs e algumas configurações ficam .env na raiz do projeto.
Por favor, se alterações forem feitas no .env refleti-las no .env.exemple

Informações menos sensíveis no /config/sistema.config.ts
Se a informação não representa algum tipo de informação secreta deve ser armazenado em config/sistema.config.ts


**Flow do Sistema**

server.ts
O ponto de entrada do sistema se encontra em src/main/server.ts

app.ts
Em server.ts o /src/main/config/app.ts é carregado. No app.ts o express é instanciado, os middlewares são aplicados
a suas rotas definidas.

rotas
src/main/routes
É passado um factory para a função adaptRoute(). O factory deve retornar um LogControllerDecorator. No factory é 
feito a composição das contruções criadas no sistema que será utilizado na rota.


**Segurança e autenticação**
O sistema utiliza tokens para reconhecimento e identidade do usuário.

Para proteger uma rota que não é pública utilize o middleware makeAuthMiddleware. Um exemplo abaixo

  const adminAuth = adaptMiddleware(makeAuthMiddleware('anunciante'))

  router.post('/casas-venda', adminAuth, multerAdapter, adaptRoute(casaVendaControllerFactory())


**Localização das contruções no sistema**
Agora que foi abordado o flow do sistema. Em resumo server.ts >> App.ts >> rotes >> factory para fazer composição das contruções.
A descrição de onde as construções do sistema devem ficar obrigatoriamente.










