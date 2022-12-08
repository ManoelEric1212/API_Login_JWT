# API_Login_JWT

Exemplo de criação de uma API de Login baseada com autenticação com Json Web Token, permitindo assim a implementação do controle de acesso por níveis de usuário. O projeto foi construindo com Node.js, utilizando o banco de dados Postgres especificamente o banco online ElephantSql e a lib do Sequelize como ORM da aplicação.

## Instalando a aplicação 

### Instalar dependências

```
npm install
```

### Rodar o projeto 

```
npm start
```

## Testando a aplicação com o insomnia

Por default o servidor estará rodando na porta 8080, podendo ser acessado no navegador por localhost:8080.

### Cadastrando um usuário

![cadastro](https://user-images.githubusercontent.com/35776840/206335424-ca115415-0b27-4823-80cd-bbbbcdd0c7e7.png)

### Testando cadastrar um usuário com email ou nome de usuário já cadastrados

![testvalidaçãoCadastro](https://user-images.githubusercontent.com/35776840/206335437-2a47d837-430a-4af1-9417-15288ef2af05.png)

### Fazendo o Login com os dados corretos

![loginCorreto](https://user-images.githubusercontent.com/35776840/206335456-0a761b87-2542-40ff-8ead-8ecaa6bd3c9f.png)

### Fazendo o Login com os dados incorretos

![testando senha errada](https://user-images.githubusercontent.com/35776840/206335474-63ab43c0-a218-462e-ab49-151b3ae93acc.png)

### Testando acesso com o token correto à um nível existente

![testConteudoRoleuser](https://user-images.githubusercontent.com/35776840/206335493-a97ef5b1-db79-4d89-a0ab-ad03e353cd4c.png)

## Testando o acesso à um nível que não existe para o token criado 

![testConteudoAdminNegado](https://user-images.githubusercontent.com/35776840/206335503-14c16d1f-bcd4-4778-a482-4d01f6463f60.png)
