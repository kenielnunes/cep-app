# 📦 CEP App

Bem-vindo ao **CEP App**! Este é um aplicativo incrível que permite que você consulte endereços a partir de CEPs brasileiros de forma rápida e fácil. Com uma interface amigável e funcionalidades robustas, o CEP App é a solução perfeita para quem precisa acessar informações de endereços de maneira eficiente.

## 🚀 Funcionalidades

- **Consulta de Endereços**: Insira um CEP e obtenha informações detalhadas sobre o endereço correspondente.
- **Histórico de Consultas**: Acompanhe todos os CEPs que você já consultou, facilitando o acesso a informações anteriores.
- **Autenticação de Usuário**: Crie uma conta e faça login para acessar funcionalidades exclusivas, como o histórico de consultas.
- **Interface Intuitiva**: Navegação fácil e design responsivo para uma experiência de usuário agradável.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, Sequelize
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JSON Web Tokens (JWT)
- **Docker**: Para facilitar a configuração e execução do ambiente

## 📸 Capturas de Tela

### Tela de Login
![Tela de Login](link-para-sua-captura-de-tela-login)

### Tela de Registro
![Tela de Registro](link-para-sua-captura-de-tela-registro)

### Tela de Consulta
![Tela de Consulta](link-para-sua-captura-de-tela-consulta)

### Histórico de Consultas
![Histórico de Consultas](link-para-sua-captura-de-tela-historico)

## 📦 Como Executar o Projeto

### Pré-requisitos

- Docker
- Docker Compose
- Node.js
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cep-app.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd cep-app
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```plaintext
   POSTGRES_USER=seu_usuario
   POSTGRES_PASSWORD=sua_senha
   POSTGRES_DB=cep_db
   JWT_SECRET=sua_chave_secreta
   API_URL=sua_url_de_api
   CEP_EXTERNAL_URL_API=api_externa_via_cep
   HASH_CRYPTO_SECRET=segredo_para_crypto
   ```

4. Inicie os serviços com Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. Navegue até o diretório do backend e instale as dependências:
   ```bash
   cd backend
   npm install
   ```


6. Inicie o servidor:
   ```bash
   npm start
   ```

7. Navegue até o diretório do frontend e instale as dependências:
   ```bash
   cd ../frontend
   npm install
   ```

8. Inicie o aplicativo frontend:
   ```bash
   npm run dev
   ```

9. Acesse o aplicativo em `http://localhost:3000`.

## 🤝 Contribuições

Contribuições são bem-vindas! Se você deseja contribuir, siga estas etapas:

1. Fork o projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça suas alterações e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para o branch original (`git push origin feature/nova-funcionalidade`).
5. Crie um novo Pull Request.

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Esperamos que você goste do **CEP App**! Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato.