# PosTech

Destinados a projetos de estudos

# Repositorio Git

[text](https://github.com/techchallengegroup28/TechChallengeFase2.git)

Como executar o projeto

1 -> Abrir o projeto pelo VS Code

2 -> Dentro do diretório principal ...\TechChallengeFase2 executar o npm install

Executando o docker localmente a parti dos comandos abaixo
Atenção é necessario que o docker esteja em execução no windows

Dentro do diretório principal ...\TechChallengeFase2 executar

1 -> docker-compose build

2 -> docker-compose up -d "Ambiente de dev"
2.1 -> docker-compose up --build "Ambiente de produção"

Isso irá executar as imagens da aplicação e banco de dados, ao finalizar o processo
a aplicação está funcionando no link

http://localhost:3000/

O postgres estara iniciado com o banco de dados FIAP criado e a tabela post criada contendo 10 registros para testes na api.

Comandos Docker

--Criar uma imagem
docker build -t Nome_da_Imagem:tag .

--Para os contêineres em execução e deletar
docker-compose down

--Listar as imagens docker
docker images

--Remover imagens
docker rmi <id_imagem>

--Baixa uma imagem de um repositorio
docker pull Seu_Repositorio/Nome_da_imagem:lasted

--Cria tag para uma imagen docker
docker tag postgres:latest Seu_Repositorio/postgres:latest

--Realizar o push para o repositório remoto
docker push Seu_Repositoriov/postgres:latest
