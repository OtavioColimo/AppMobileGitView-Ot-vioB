# 🐦 Pokédex Mobile App

Aplicativo mobile React Native com Expo para explorar Pokémon usando a **PokéAPI**.

## ✨ Features

- ✅ **Autenticação Local** - Login e cadastro com AsyncStorage
- ✅ **Pokédex** - Lista infinita com scroll de Pokémon
- ✅ **Detalhes do Pokémon** - Informações completas e cadeia evolutiva
- ✅ **Tipos de Pokémon** - Tags coloridas por tipo
- ✅ **Stats Visuais** - Gráfico de atributos (HP, ATK, DEF, etc)
- ✅ **Cadeia Evolutiva** - Navegação entre evoluções
- ✅ **Sem Chaves de API** - PokéAPI é totalmente gratuita!

## 🏗️ Estrutura do Projeto

```
src/
├── pages/
│   ├── login.js              # Tela de login
│   ├── cadastro.js           # Tela de cadastro
│   ├── main.js               # Pokédex (lista de Pokémon)
│   └── pokemonDetail.js      # Detalhes + evolução
├── services/
│   └── api.js               # Configuração PokéAPI
├── routes.js                # Navegação entre telas
└── styles.js                # Componentes styled-components
```

## 🚀 Como Iniciar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Projeto
```bash
npm start
# ou
expo start
```

### 3. Testar
- **Shifq + M** (Android) - Abrir DevTools
- **Shake device** (iOS) - Abrir menu

## 📱 Fluxo de Uso

```
1. CADASTRO
   Email: seu@email.com
   Senha: sua_senha

2. LOGIN
   Email: seu@email.com
   Senha: sua_senha

3. POKÉDEX
   - Scroll infinito (20 em 20)
   - Clique no card para ver detalhes

4. DETALHES DO POKÉMON
   - Fotos e tipos
   - Stats em gráfico
   - Cadeia evolutiva
   - Clique em evolução para ver próximo
```

## 🎨 Paleta de Cores

- **Primária**: `#ff0000` (Vermelho Pokémon)
- **Secundária**: `#fff` (Branco)
- **Background**: `#f5f5f5` (Cinza claro)

## 📦 Dependências Principais

- `react-native`
- `expo`
- `@react-navigation/native`
- `@react-navigation/stack`
- `axios`
- `styled-components`
- `async-storage`

## 🔧 API Endpoints

**Base URL**: `https://pokeapi.co/api/v2`

### Endpoints Utilizados

```javascript
GET /pokemon?limit=20&offset=0        // Lista de Pokémon
GET /pokemon/{name}                   // Detalhes do Pokémon
GET /pokemon-species/{id}             // Espécie (para evolução)
{evolution_chain_url}                 // Cadeia evolutiva
```

## 🎯 Funcionalidades por Página

### Main (Pokédex)
- [x] Carregar 20 Pokémon por vez
- [x] Scroll infinito (lazy loading)
- [x] Cards com imagem, nome, tipos
- [x] Estatísticas (altura, peso)
- [x] Botão logout

### PokemonDetail
- [x] Imagem do Pokémon
- [x] ID e nome
- [x] Tipos com cores
- [x] Altura e peso
- [x] Habilidades
- [x] Stats (6 principais)
- [x] Cadeia evolutiva
- [x] Descrição de tipo

## 🐛 Debug

Para ver logs da API:
```
Console do DevTools (Shift+M no Android)
Procure por: "Response Status: 200"
```

## 📝 Notas

- A chave pública de Pokémon é adicionada automaticamente
- Dados são carregados do cache do Expo
- Sem limite de requisições (gratuito)

## 🔐 Segurança

- Senhas são armazenadas localmente no AsyncStorage
- Para produção: usar encriptação
- Nenhuma informação sensível na PokéAPI

---

**Desenvolvido com ❤️ usando React Native + Expo**
