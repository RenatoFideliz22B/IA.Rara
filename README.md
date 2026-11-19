# Trocaí

> **Aprender também é trocar.**

O **Trocaí** é uma plataforma web **white-label** que aproxima estudantes de **ensino a distância (EAD)**. No ensino presencial, a convivência acontece naturalmente: no corredor, no intervalo, esperando o próximo professor. No EAD, essas oportunidades praticamente não existem. O Trocaí cria esse espaço de convivência dentro do próprio curso, sem transformar a interação em obrigação.

A instituição de ensino adquire a plataforma e a personaliza com a sua identidade visual (logotipo, cores e fontes). Os alunos acessam com as credenciais institucionais.

🔗 **Deploy:** https://ia-rara.vercel.app/
🎥 **Vídeo-pitch:** 

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Acesso de demonstração](#acesso-de-demonstração)
- [Rotas](#rotas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Temas (white-label)](#temas-white-label)
- [Ia.rara: assistente de IA](#iarara-assistente-de-ia)
- [Persistência de dados](#persistência-de-dados)
- [Acessibilidade](#acessibilidade)
- [Escopo do protótipo](#escopo-do-protótipo)
- [ODS relacionados](#ods-relacionados)
- [Equipe](#equipe)

---

## Funcionalidades

### Jornada do aluno

1. **Login institucional:** acesso com RA e senha, com botão para alternar o tema da instituição.
2. **Cadastro (primeiro acesso):** o aluno escolhe um avatar (ou envia uma imagem própria) e as tags que representam seus interesses e sua rotina.
3. **Praça (Home):** o principal espaço de convivência.
4. **Perfil:** edição de avatar, interesses, apelido e bio. Nome completo e curso vêm da instituição e ficam bloqueados.
5. **Sala de bate-papo:** conversa por afinidade, com chamadas de áudio/vídeo e perguntas quebra-gelo.

### Na Praça

- **Meta coletiva:** gamificação com tarefas simples (check-in diário, completar a bio, participar de um encontro). A barra de progresso da turma sobe conforme as tarefas são concluídas, sem ranking individual.
- **Sua turma:** lista de colegas com avatar e apelido; ao clicar, abre o perfil do colega (bio e interesses).
- **Salas de bate-papo por afinidade:** alunos **da mesma turma** são agrupados pelos interesses do perfil (9 salas no protótipo).
- **Encontros guiados:** encontros entre alunos de **todas as turmas**. O aluno clica em *Quero participar* e responde a perguntas quebra-gelo, para que já exista assunto em comum quando o encontro acontecer.

### Outros destaques

- **Ia.rara:** mascote e assistente de IA, disponível em todas as telas.
- **Tema white-label** alternável com um clique (Trocaí / FIAP).
- **Acessibilidade** tratada desde o código (teclado, ARIA, foco, contraste).

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [React](https://react.dev/) | Interface e estado dos componentes |
| [Vite](https://vitejs.dev/) | Servidor de desenvolvimento e build |
| [React Router](https://reactrouter.com/) (`HashRouter`) | Navegação entre telas |
| [Phosphor Icons](https://phosphoricons.com/) (`@phosphor-icons/react`) | Ícones |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Renderização das respostas da Ia.rara |
| CSS Modules + variáveis CSS | Estilos e sistema de temas |

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm

### Instalação

```bash
# 1. Clone o repositório
git clone [COLAR LINK DO REPOSITÓRIO]
cd [NOME-DA-PASTA]

# 2. Instale as dependências
npm install

# 3. Rode em modo de desenvolvimento
npm run dev
```

O Vite mostrará no terminal o endereço local (normalmente `http://localhost:5173`).

### Outros comandos

```bash
npm run build     # gera a versão de produção na pasta dist/
npm run preview   # serve localmente a versão de produção
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
VITE_API_URL=http://localhost:3001
```

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_URL` | URL base do backend da Ia.rara | `http://localhost:3001` |

> Sem o backend rodando, todo o resto da plataforma funciona normalmente. Apenas a Ia.rara exibirá uma mensagem de erro amigável ao tentar responder.

---

## Acesso de demonstração

O login institucional é simulado com credenciais de demonstração:

| Campo | Valor |
|---|---|
| **RA** | `123456` |
| **Senha** | `senha123` |

---

## Rotas

O app usa `HashRouter`, o que facilita o deploy em hospedagens estáticas.

| Rota | Tela | Layout |
|---|---|---|
| `/` | Login | Autenticação |
| `/cadastro` | Cadastro (primeiro acesso) | Autenticação |
| `/praca` | Praça (Home) | Aplicação (com cabeçalho) |
| `/perfil` | Perfil (aceita `#sobre-mim` para rolar até a bio) | Aplicação |
| `/sala/:id` | Sala de bate-papo | Aplicação |

---

## Estrutura do projeto

```
src/
├── App.jsx                     # Rotas e restauração do tema salvo
├── main.jsx                    # Ponto de entrada
├── index.css                   # Design tokens (variáveis CSS) e temas
├── assets/
│   ├── avatars/                # 16 avatares (8 por tema)
│   └── images/                 # Logotipos (Trocaí e FIAP)
├── components/
│   ├── AssistantWidget/        # Ia.rara (chat flutuante com IA)
│   ├── layout/                 # AuthLayout, AppLayout e Header
│   └── ui/Button/              # Botão reutilizável (variantes)
├── data/
│   ├── alunos.js               # Alunos de exemplo da turma
│   └── salas.js                # Salas por afinidade, mensagens e perguntas quebra-gelo
├── hooks/
│   └── useTema.js              # Hook que observa o tema ativo
└── pages/
    ├── Login/
    ├── Cadastro/
    ├── Home/                   # Praça
    ├── Perfil/
    └── Sala/
```

---

## Temas (white-label)

Todas as cores, fontes e sombras são **variáveis CSS** definidas em `src/index.css`. O tema ativo é controlado pelo atributo `data-theme` da tag `<html>`:

| Tema | Identidade |
|---|---|
| **Trocaí** (padrão) | Azul `#1F3BFF` e verde-limão `#C6FF00`; fontes Fredoka e Inter |
| **FIAP** (`data-theme="fiap"`) | Preto e rosa; fonte Poppins |

Ao clicar no botão da tela de login, o JavaScript:

1. salva a escolha no `localStorage` (`trocaiTema`);
2. atualiza o `data-theme` no `<html>`;
3. troca automaticamente logotipo, avatares e ícone da Ia.rara (via hook `useTema`, que usa `MutationObserver`).

Para adicionar uma nova instituição, basta definir um novo bloco `:root[data-theme='nome']` com as variáveis e incluir os assets correspondentes.

---

## Ia.rara: assistente de IA

A Ia.rara aparece como um botão flutuante em todas as telas. O front-end conversa com um **backend próprio**:

**Requisição**

```http
POST {VITE_API_URL}/api/chat
Content-Type: application/json

{
  "message": "texto da pergunta do aluno",
  "history": [
    { "role": "user",  "text": "mensagem anterior do aluno" },
    { "role": "model", "text": "resposta anterior da Ia.rara" }
  ]
}
```

**Resposta esperada**

```json
{ "reply": "texto da resposta da Ia.rara" }
```

Em caso de erro, o servidor pode retornar `{ "error": "mensagem" }` com status diferente de 2xx.

Comportamento no front-end:

- histórico salvo no `localStorage` (`IA.Rara-chat`) e restaurado ao reabrir;
- indicador de "digitando" e campo bloqueado durante a resposta;
- respostas formatadas em Markdown;
- mensagem amigável em caso de falha de rede ou do servidor.

**Backend:** [COMPLETAR: repositório do backend, modelo/serviço de IA utilizado, como configurar a chave de API e como rodar o servidor localmente]

---

## Persistência de dados

No protótipo, os dados ficam no `localStorage` do navegador:

| Chave | Conteúdo |
|---|---|
| `trocaiTema` | Tema escolhido |
| `trocaiPerfil` | Avatar, interesses, apelido e bio do aluno |
| `trocaiHome` | Progresso das missões e respostas do encontro guiado |
| `IA.Rara-chat` | Histórico da conversa com a Ia.rara |

As telas se comunicam por um evento do navegador (`trocaiPerfilAtualizado`), que mantém o cabeçalho e a lista da turma sincronizados com o perfil sem recarregar a página.

Para "zerar" a demonstração, limpe o armazenamento local do site nas ferramentas do desenvolvedor do navegador.

---

## Acessibilidade

- HTML semântico (`main`, `nav`, `header`, `section`, `fieldset`/`legend`) e hierarquia de títulos
- Link "Pular para o conteúdo"
- Foco visível em todos os controles (`:focus-visible`)
- Navegação completa por teclado; modais fecham com `Esc` e devolvem o foco ao botão de origem
- Estados e rótulos ARIA (`aria-pressed`, `aria-expanded`, `role="dialog"`, `role="progressbar"`, `role="alert"`, `role="status"`, `role="log"`)
- Formulários com `label` associado e mensagens de erro claras
- Informações não dependem apenas de cor (ícones e texto)
- Cores com contraste adequado nos dois temas
- Layout responsivo

---

## Escopo do protótipo

Este projeto é um protótipo acadêmico. Para a demonstração, alguns recursos são **simulados no front-end**:

- login institucional (SSO) com credenciais fixas de demonstração;
- chamadas de áudio/vídeo e envio de arquivos na sala (apenas representação visual);
- colegas, salas, mensagens e participantes dos encontros são dados de exemplo;
- o valor-base da meta coletiva (78%) é fixo, simulando a contribuição da turma.

A **Ia.rara** é a parte que se conecta a um servidor real.

---

## ODS relacionados

- **ODS 4: Educação de Qualidade:** ambientes de aprendizagem mais inclusivos e colaborativos no EAD.
- **ODS 10: Redução das Desigualdades:** diminui a desigualdade de experiência entre alunos a distância e presenciais.
- **ODS 3: Saúde e Bem-Estar:** combate o isolamento e promove o pertencimento.

---

## Equipe

**DEVaneios**
- Leticia Magialis Cunha
- Arthur Ramos do Carmo
- Laura Moreno Higino Zapata
- Matheus Felipe Berti
- Renato Fideliz dos Santos Menezes
