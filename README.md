# Sistema de Barbearia - Projeto Integrador

Sistema completo de barbearia com frontend React e backend Rails API.

## 🚀 Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- React Router DOM
- Styled Components

### Backend
- Ruby on Rails 8.0
- PostgreSQL
- JWT para autenticação
- bcrypt para hash de senhas
- rack-cors para CORS

## 📁 Estrutura do Projeto

```
projeto-integrador/
├── backend/          # Rails API
└── frontend/         # React App
```

## 🛠️ Como Executar

### Pré-requisitos
- Ruby 3.4+
- Node.js 16+
- PostgreSQL
- Rails 8.0+

### 1. Backend (Rails API)

```bash
# Navegar para pasta backend
cd backend

# Instalar gems
bundle install

# Configurar banco de dados
rails db:create
rails db:migrate

# Iniciar servidor Rails
rails server
```

O backend estará rodando em: `http://localhost:3000`

### 2. Frontend (React)

```bash
# Navegar para pasta frontend
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## 🔐 Funcionalidades

### Autenticação
- Login com usuário e senha
- Cadastro de administradores
- JWT para autenticação
- Rotas protegidas

### Telas
1. **Login** (`/`)
   - Campos: Usuário e Senha
   - Botões: Entrar, Esqueceu sua senha?, Cadastrar-se

2. **Cadastro** (`/register`)
   - Campos: Nome, Sobrenome, Email, Usuário, Senha
   - Botão: Cadastrar

3. **Dashboard Admin** (`/admin`)
   - Menu superior: Histórico, Listas, Promoções, Avaliações, Configuração
   - Agenda semanal clicável
   - Modal com detalhes dos agendamentos

## 🎨 Paleta de Cores

- **Fundo**: `#fdf6f0`
- **Texto de título**: `#0d47a1`
- **Texto dos campos**: `#37474f`
- **Botões**: Fundo `#8b0000`, Texto `#ffffff`
- **Menu superior**: Fundo `#8b0000`, Texto `#ffffff`
- **Agenda**: Fundo `#ffffff`, Títulos `#0d47a1`
- **Datas**: Fundo `#1565c0`, Texto `#ffffff`

## 📡 Endpoints da API

### POST `/login`
- **Body**: `{ "username": "admin", "password": "123456" }`
- **Response**: `{ "token": "jwt_token" }`

### POST `/admins`
- **Body**: `{ "first_name": "João", "last_name": "Silva", "email": "joao@email.com", "username": "admin", "password": "123456" }`
- **Response**: `{ "message": "Admin criado com sucesso!" }`

### GET `/agenda`
- **Headers**: `Authorization: Bearer jwt_token`
- **Response**: Array de agendamentos mockados

## 🔧 Configuração do Banco

O projeto usa PostgreSQL. Certifique-se de que:
1. PostgreSQL está instalado e rodando
2. As credenciais estão configuradas em `backend/config/database.yml`
3. O banco foi criado com `rails db:create`

## 📝 Dados Mockados

A agenda inicial contém dados fictícios para demonstração:
- Agendamentos para os próximos 7 dias
- Diferentes tipos de serviços (corte, barba, corte + barba)
- Horários variados

## 🚨 Troubleshooting

### Erro de CORS
- Verifique se o backend está rodando na porta 3000
- Confirme se o rack-cors está configurado corretamente

### Erro de Banco de Dados
- Execute `rails db:create db:migrate`
- Verifique se o PostgreSQL está rodando

### Erro de Dependências
- Execute `bundle install` no backend
- Execute `npm install` no frontend

## 📋 Próximos Passos

- [ ] Implementar funcionalidades do menu superior
- [ ] Adicionar sistema de agendamento
- [ ] Implementar recuperação de senha
- [ ] Adicionar validações mais robustas
- [ ] Implementar testes automatizados 