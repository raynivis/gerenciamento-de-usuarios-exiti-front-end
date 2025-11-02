# Gerenciamento de Usuários (Front-End)

Este projeto é a interface front-end para um sistema de gerenciamento de usuários. Ele foi construído com React e Vite, permitindo operações básicas de CRUD e incluindo uma funcionalidade de importação de usuários em lote via arquivos Excel (.xlsx).

## Demonstração

<img width="1604" height="915" alt="image" src="https://github.com/user-attachments/assets/7ad524da-41db-4091-a611-96107e4553c9" />

<img width="1443" height="912" alt="image" src="https://github.com/user-attachments/assets/ab19803e-36bc-4d88-aaa4-aa21db7a4b25" />

<img width="1455" height="914" alt="image" src="https://github.com/user-attachments/assets/823d8c41-b4c3-4827-9fd2-8cbc1d6a109a" />

<img width="1453" height="919" alt="image" src="https://github.com/user-attachments/assets/74510d60-dfad-4bea-90fc-ff18391398d9" />


## Funcionalidades

O sistema permite as seguintes operações:

* **Listar/Visualizar:** Exibição de usuários em tabela.
* **Criar Usuário:** Formulário com validação de e-mail (e-mail deve ser único).
* **Editar Usuário:** Atualização dos dados de um usuário existente.
* **Remover Usuário:** Exclusão de um usuário.
* **Importar Excel (.xlsx):** Envio de um arquivo `.xlsx` para cadastro de usuários em lote.

### Funcionalidades Adicionais
* Paginação na listagem de usuários.
* Filtros por nome e por status.
* Modal de confirmação para ações de remoção.
* Troca rápida de status (ativo/inativo) diretamente na tabela (switch).

##  Tecnologias e Justificativa

A principal tecnologia utilizada foi o **React (com Vite)**.

A escolha se deu pela alta produtividade e familiaridade minha com o ecossistema React (atuamente trabalho com React). 

## Instalação e Execução Local

Siga os passos abaixo para executar o projeto em sua máquina.

1.  **Clone o repositório:**
    ```sh
    git clone https://github.com/raynivis/gerenciamento-de-usuarios-exiti-front-end.git
    ```

2.  **Acesse o diretório do projeto:**
    ```sh
    cd gerenciamento-de-usuarios-exiti-front-end/usuario-gerenciador-react
    ```

3.  **Instale as dependências:**
    *(Escolha seu gerenciador de pacotes)*
    ```sh
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto. Este arquivo deve conter a URL da sua API backend, conforme o exemplo abaixo:
    ```env
    VITE_API_URL=http://localhost:8080
    ```

5.  **Inicie a aplicação:**
    ```sh
    npm run dev
    ```

A aplicação estará disponível localmente, geralmente em `http://localhost:5173`.
