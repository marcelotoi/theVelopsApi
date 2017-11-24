# theVelopsApi
Prova de Iniciante theVelops

Primeiramente, rode o seguinte comando na pasta bin do MongoDB:
mongod --dbpath=/data

Em seguida, vá para o diretório onde foi salvo theVelopsApi e inicie-o utizando o seguinte comando:
npm run start

O servidor foi iniciado na porta local 3000. A documentação swagger pode ser encontrada em: http://localhost:3000/api-docs

Uma vez iniciado o aplicativo, será necessário se registrar como usuário utlizando a rota POST http://localhost:3000/register. Para tal, são necessárias duas informações:
"username" e "password". Por exemplo:

{

"username": "marcelo200",

"password": "12345"

}

Após registrar-se no banco de dados, faça o login utilizando POST http://localhost:3000/login, inserindo-se o username e password escolhidos previamente.

Pronto, agora é possível acessar as outras rotas do aplicativo.

As rotas disponíveis são:
- POST/register - Realiza o registro de um usuário com um "username" e "password".

- POST/login - Realiza o login de um usuário registrado

- GET/users - Exibe a lista de usuários do database.
 
- POST/users - Adiciona um usuário ao database caso sejam fornecidos todos os dados necessários para um usuário (first_name, last_name, email e personal_phone).
 
- GET/users/:id - Procura no database por um usuário com a id desejada e retorna-o.
 
- PUT/users/:id - Procura no database por um usuário com a id desejada, atualiza-o com os dados da request e retorna-o.
  
- DELETE/users/:id - Procura no database por um usuário com a id desejada e deleta-o.

Um exemplo de usuário a ser guardado no database é:

{

"_id": ObjectId("582d6df6afb38c6a468c5864")

"email": "karla.fagundes@gmail.com",

"first_name": "Karla",

“last_name: “Fagundes”,

"personal_phone": "(11) 97169-6297"

}

OBS: São necessárias todas as informações, com excessão da id, para que o usuário seja salvo no database com sucesso. A id do usuário será gerada automaticamente.
