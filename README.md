[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- LOGO DO PROJETO -->
<br />
<div align="center">
  <a href="https://github.com/EuMotta/swagger-frontend">
    <img src="https://i.ibb.co/K6wGmvs/next-1.png" alt="Logo" width="600" height="100">
  </a>

  <h3 align="center">Task Manager - Next.js</h3>

  <p align="center">
    Um gerenciador de tarefas moderno, rápido e intuitivo desenvolvido com Next.js, TypeScript e ferramentas avançadas do ecossistema React.
    <br />
    <br />
    <a href="https://github.com/EuMotta?tab=repositories">Meus repositórios</a>
    ·
    <a href="https://github.com/EuMotta/swagger-frontend/issues">Reportar Bugs</a>
    ·
    <a href="https://github.com/EuMotta/swagger-frontend/pulls">Enviar Pull Request</a>
  </p>
</div>

---

## 📋 Sobre o Projeto

**Task Manager** é uma aplicação web desenvolvida com **Next.js** que permite aos usuários:

- Criar, editar e excluir tarefas.
- Organizar as tarefas por categorias e status (pendente, em progresso, concluída).
- Pesquisar e filtrar tarefas por nome ou status.
- Realizar autenticação de usuário (login/logout).
- Interface responsiva e amigável com **Tailwind CSS**.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🚀 Funcionalidades Principais

✅ **Gerenciamento Completo de Tarefas**  
   - Criar, editar e excluir tarefas.  
   - Atualizar o status das tarefas.  

✅ **Autenticação com NextAuth**  
   - Login seguro com NextAuth.  

✅ **Pesquisa e Filtros**  
   - Filtrar tarefas por status (pendente, em andamento, concluída).  
   - Buscar tarefas por palavras-chave.  

✅ **Interface Intuitiva e Responsiva**  
   - Design moderno usando **Tailwind CSS**.  
   - Compatível com dispositivos móveis.  

✅ **Notificações em Tempo Real**  
   - Feedback visual para ações (ex.: sucesso, erro, carregamento) com **sonner**.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias principais:

- **Next.js**: Framework React para SSR (Server-Side Rendering) e SSG (Static Site Generation).
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
- **React Hook Form + Zod**: Gerenciamento avançado e validação de formulários.
- **@tanstack/react-query**: Cache e gerenciamento de estado assíncrono (ex.: chamadas à API).
- **NextAuth**: Autenticação segura.
- **Radix UI**: Componentes acessíveis (ex.: modais, tooltips, checkboxes).
- **Sonner**: Biblioteca para notificações dinâmicas e personalizáveis.

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

---

## 📦 Estrutura do Projeto

```
📦 swagger-frontend
├── 📂 src
│   ├── 📂 @interfaces     # Tipagens das entidades
│   ├── 📂 adapters        # Adaptadores para o lado do servidor
│   ├── 📂 app             # Rotas do Next.js
│   ├── 📂 components      # Componentes reutilizáveis
│   ├── 📂 constants       # Constantes
│   ├── 📂 env             # Proteção das variávens de ambiente
│   ├── 📂 hooks           # Hooks customizados
│   ├── 📂 http            # Hooks e tipagens fornecidos pelo Orval
│   ├── 📂 providers       # Provedores customizados
│   ├── 📂 styles          # Estilização do projeto
│   ├── 📂 utils           # Funções auxiliares
│   └── 📂 middlewares     # Middlewares customizados + construtor
├── .....
├── orval.config.ts        # Configuração do orval para receber o swagger
└── package.json           # Dependências do projeto
```

---

## 📚 Documentação Inline

Todo o código possui **documentação inline**  para facilitar a compreensão e manutenção.  
Exemplo de documentação em um hook:  

```typescript
/**
 * @summary Hook para buscar todas as tarefas.
 *
 * @param {number} page - Número da página atual.
 * @param {number} limit - Quantidade de tarefas por página.
 * @param {string} [status] - Status das tarefas (opcional).
 *
 * @returns {UseQueryResult<Task[]>} Lista de tarefas paginada.
 */
export function useGetTasks(page: number, limit: number, status?: string) {
  return useQuery(['tasks', page, status], () =>
    fetchTasks(page, limit, status)
  );
}
```

---

## ▶️ Executando o Projeto Localmente

### ✅ Pré-requisitos:

- Node.js (utilizei no projeto a versão v23.6.1)
- Git (opcional)

### 🔨 Passos para rodar localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/EuMotta/swagger-frontend.git
   cd swagger-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e adicione:

   ```env
   DATABASE_URL="sua_url_do_banco"
   NEXTAUTH_SECRET="seu_segredo"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!  
Se você deseja melhorar o projeto, siga os passos:

1. Faça um **Fork** do projeto.
2. Crie um novo **Branch** para sua funcionalidade (`git checkout -b feature/minha-feature`).
3. Faça as mudanças e crie um **Commit** (`git commit -m 'feat: minha nova funcionalidade'`).
4. Faça um **Push** no branch (`git push origin feature/minha-feature`).
5. Abra uma **Pull Request**.

---

## 📄 Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.

---

## 📞 Contato

José Antonio Motta - [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-antonio-bueno-motta-61006a26b/)

Link do projeto: [https://github.com/EuMotta/swagger-frontend](https://github.com/EuMotta/swagger-frontend)

---

<h1 align="center">
    <div>🚀 Obrigado por conferir este projeto!</div>
</h1>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555  
[linkedin-url]: https://linkedin.com/in/jos%C3%A9-antonio-bueno-motta-61006a26b/  
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white  
[Next-url]: https://nextjs.org/  
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB  
[React-url]: https://react.dev/
