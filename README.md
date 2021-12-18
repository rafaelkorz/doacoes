
## 👨🏻‍💻 Siga os passos abaixo para executar o projeto

Faça o clone do projeto. 

```bash
https://github.com/rafaelkorz/donations.git
```

Abra o projeto em uma IDE de sua preferência.

## Backend

- Execute as intalações de dependência ```yarn install```
- Configuração **.ENV**  ```APP_URL_DB=mongodb+srv://korz:korz@cluster0.2emxk.mongodb.net/doacoes_prod?retryWrites=true&w=majority``` 
  ou utilize seu proprio BD mongo.

- Usuário ADM utilizar **Usuário:** adm **Senha:** adm
- Cadastro de novos usuários somente conseguem fazer doações e não pesquisas doeções de outros doadores ou gerar relatórios.
- Execute ```yarn server```

## Frontend
- Execute as intalações de dependência ```yarn install```
- Configuração **.ENV**  ```APP_URL=http://localhost:5000```
- Execute ```yarn start```
