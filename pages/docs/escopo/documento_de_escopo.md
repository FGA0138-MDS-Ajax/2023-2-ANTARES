
# Declaração de Escopo do Produto

### Membros da Equipe:

<ul>
  <li>Breno Lucena Cordeiro - 202017343</li>
  <li>Breno Soares Fernandes  - 202017540</li>
  <li>Kauan de Torres Eiras - 232014727</li> 
  <li>Leonardo Ferreira Borges  - 200062166</li>
  <li>Lucas Gabriel da Silva Antunes  - 190091681</li> 
  <li>Mateus Vinicius Vieira  - 202016963</li>
  <li>Matheus Ferreira Diogo  - 200024949</li>
  <li>Samuel Victor Oliveira Lima - 190059001</li> 
</ul>

### Histórico de Revisão

| Data       | Versão | Descrição                                                             | Autor(es)                                                                              |
|------------|--------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| 02/10/2023 | 0.1    | Confecção de documento de Visão do Produto e do Projeto               | Mateus Vieira, Matheus Ferreira, Lucas Antunes, Leonardo Borges, Kauan Eiras           |
| 04/10/2023 | 0.2    | Atualização dos documentos de Visão do Produto e do Projeto           | Lucas Antunes, Mateus Vieira                                                           |
| 09/10/2023 | 0.3    | Confecção de documento de Declaração de Escopo do Produto             | Kauan Eiras, Breno Lucena, Breno Soares, Leonardo Borges                               |
| 22/10/2023 | 0.4    | Confecção de Declaração de Escopo do Produto                          | Breno Lucena, Breno Soares, Leonardo Borges, Kauan Eiras                               |
| 23/10/2023 | 1.0    | Revisão e finalização do documento de Declaração de Escopo do Produto | Breno Lucena, Breno Soares, Leonardo Borges, Kauan Eiras, Lucas Antunes, Mateus Vieira |
| 26/11/2023 | 1.1    | Alterações na estrutura da página                                     | Mateus Vieira                                                                          |


### **Sumário**

- [1 - Problema / Sistema de Software](#1)
- [2 - Backlog do Produto](#2)
  - [2.1 - Perfis](#2.1)
  - [2.2 - Cenários](#2.2)
  - [2.3 - Backlog Funcional](#2.3)
  - [2.4 - Sprints previstas](#2.4)
- [3 - Definição de Ready/Done](#3)
- [4 - User Histories](#4)
- [5 - Diagrama de Casos de Uso](#5)
- [6 - MVP](#6)
- [7 - Referências](#7)

### Tabelas: 

- [1 - Perfis de acesso](#tabela-1)
- [2 - Cenários](#tabela-2)
- [2.3.1 -  Backlog Funcional - Temas](#tabela-2.3.1)
- [2.3.2 -  Backlog Funcional - Épicos](#tabela-2.3.2)
- [2.3.3 - Backlog Funcional - User Storys](#tabela-2.3.3)
- [3 -  Sprints previstas](#tabela-3)
- [4 -  User Histories](#tabela-4)
- [5 -  Minimum Viable Product (MVP)](#tabela-5)

### Figuras:
- [1 - Diagrama de Casos de Uso](#figura-1)



## <a name=1>**1 - Problema / Sistema de Software**</a>

### **Definição da equipe:**

A equipe de desenvolvimento do projeto UnB na Mão é composta pelos seguintes membros, cada um desempenhando seu papel específico:

- SCRUM Master: Lucas Antunes
- Responsável Front-End: Samuel Lima, com uma equipe de 3 integrantes rotativos
- Responsável Back-End: Mateus Vieira, com uma equipe de 3 integrantes rotativos
- Clientes: Fornecimento de requisitos (estudantes da UnB)
- Outros desenvolvedores: Breno Cordeiro, Breno Fernandes, Kauan Eiras, Leonardo Ferreira, Matheus Diogo, Lucas Antunes.

### **Resumo do problema:**

O problema a ser resolvido é a dificuldade que os estudantes da Universidade de Brasília enfrentam para gerenciar suas atividades acadêmicas. A faculdade envolve múltiplas matérias, horários variados, informações dispersas e falta de ferramentas eficazes para acesso às informações da universidade.

### **Sistema de Software:**

O sistema de software, denominado "UnB na Mão," tem como objetivo unificar as informações da universidade em um único aplicativo, facilitando o acesso a informações e gerenciamento acadêmico.

### **Resumo de tecnologias usadas:**

As tecnologias utilizadas no desenvolvimento do sistema incluem JavaScript como linguagem de programação, os frameworks Vue.js para o Front-End e Node.js para o Back-End, MongoDB para o banco de dados e ferramentas como GitHub, Notion, Microsoft Teams e Discord.

### **Resumo da metodologia de desenvolvimento usada:**

A metodologia adotada é o Scrum XP, com sprints semanais e reuniões de revisão conforme necessário. Para tarefas mais complexas, a programação em pares é empregada. A equipe planeja implementar a Integração Contínua com Testes de Unidade e utilizará a técnica de revisão de código antes da mesclagem na Branch principal.

### **Métricas usadas no desenvolvimento:**

**Métrica: Taxa de Resolução de Defeitos (TRD)**

- **Definição:** A Taxa de Resolução de Defeitos (TRD) mede a eficiência da equipe de desenvolvimento em identificar, corrigir e validar defeitos no software. Essa métrica ajuda a avaliar o desempenho da equipe na gestão de defeitos e na melhoria contínua da qualidade do software.
- **Fórmula de Cálculo:** TRD (%) = (Número de Defeitos Resolvidos / Número Total de Defeitos Identificados) * 100
- **Objetivo:** O objetivo da TRD é manter a taxa de resolução de defeitos alta, o que indica uma equipe eficiente na detecção e correção de problemas. Isso contribui para a entrega de um software mais estável e de alta qualidade.
- **Critérios de Avaliação:**
  - TRD > 90%: Excelente
  - 80% ≤ TRD ≤ 90%: Bom
  - TRD < 80%: Necessita de melhorias significativas na gestão de defeitos


### **Teste Manuais:**
- **Responsável:** Equipe de Desenvolvimento
- **Objetivo:** Testar manualmente unidades de código individuais.
- **Critérios de Aceitação:** Todas as unidades de código passam nos testes.

### **Teste de Unidade:**
- **Responsável:** Equipe de Desenvolvimento
- **Objetivo:** Testar unidades de código individuais.
- **Critérios de Aceitação:** Todas as unidades de código passam nos testes.

### **Teste de Integração:**
- **Responsável:** Equipe de Desenvolvimento
- **Objetivo:** Verificar a integração entre módulos e componentes.
- **Critérios de Aceitação:** Integração sem erros.

### **Objetivos do Produto:**
Os objetivos do produto é facilitar o acesso a informações acadêmicas de uso cotidiano, como o cardápio do Restaurante Universitário e o Calendário Universitário de Graduação. Além disso, há objetivos secundários, como um ambiente de avaliação de disciplinas por meio dos alunos, um painel de informações sobre vagas de estágio e atividades extracurriculares e controle de faltas e outros.

## <a name=2>**2 - Backlog do Produto**</a> 

O Backlog do Produto é uma lista priorizada de funcionalidades, melhorias e correções que a equipe planeja implementar no aplicativo "UnB na Mão". Ele é mantido e priorizado pelo Product Owner com base no feedback dos usuários e nas necessidades do negócio.

### <a name=2.1>**2.1 - Perfis**</a>

<div align="center">
  <h2><em> Perfis de acesso</em></h2>
</div>

| # | Nome do perfil | Características do perfil                                                                                         | Permissões de acesso                                                                                                                                 |
|---|----------------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Administrador  | Um perfil com acesso a todas as funcionalidades do sistema, consegue gerenciar perfis de usuários e publicadores. | - Acesso ao sistema. - Gerenciar perfis de usuários e publicadores. - Gerenciar publicações. - Acesso às funcionalidades de gerenciamento acadêmico. |
| 2 | Alunos         | Estudantes da UnB que desejam usar o sistema para gerenciar suas atividades acadêmicas.                           | - Acesso ao Sistema. - Acesso às informações acadêmicas. - Acesso ao gerenciamento acadêmico.                                                        |
| 3 | Publicador     | Administradores de atléticas e EJs (Empresas Juniores) que desejam publicar no sistema.                           | - Acesso ao sistema. - Acesso às informações acadêmicas. - Poder fazer Publicações.                                                                  |

<sub><em><a name=tabela-1>Tabela 1: Perfis de acesso</a></em></sub>


### <a name=2.2>**2.2 - Cenários**</a> 
<div align="center">
  <h2><em> Cenários Funcionais</em></h2>
</div>
  
 <div align="center">
  <h3><em> Sistema: UnB na mão  – Cenários funcionais</em></h3>
</div>

| Numeração do cenário | Nome do cenário                                                     | Sprints  |
|----------------------|---------------------------------------------------------------------|----------|
| 1                    | Registro de Aluno                                                   | Sprint 1 |
| 2                    | Autenticação de Aluno                                               | Sprint 1 |
| 3                    | Registro de Atléticas/ “EJ”                                         | Sprint 1 |
| 4                    | Validação de Entradas para Aluno                                    | Sprint 1 |
| 5                    | Validação de Entradas para Atléticas / “EJ”                         | Sprint 1 |
| 6                    | Recuperação de Senha                                                | Sprint 2 |
| 7                    | Conectar o Sistema ao Endpoint de Login                             | Sprint 2 |
| 8                    | Acesso de Aluno ao Mural de Vagas                                   | Sprint 3 |
| 9                    | Publicação de Vagas por Publicador                                  | Sprint 3 |
| 10                   | Acesso a Lista de Disciplinas por Aluno                             | Sprint 4 |
| 11                   | Avaliação de Disciplinas por Aluno                                  | Sprint 4 |
| 12                   | Acesso ao Cardápio Semanal do "RU" por Aluno                        | Sprint 4 |
| 13                   | Acesso ao Cardápio Diário do "RU" por Aluno                         | Sprint 4 |
| 14                   | Cadastro de Matéria por Aluno                                       | Sprint 5 |
| 15                   | Cadastro de Falta e Presença por Aluno                              | Sprint 5 |
| 16                   | Visualização de Faltas e Presenças por Aluno                        | Sprint 5 |
| 17                   | Verificação de Limite de Faltas por Matéria                         | Sprint 5 |
| 18                   | Visualização de Horários de Disciplinas por Aluno                   | Sprint 6 |
| 19                   | Verificação do Último Dia de Fechamento de Matrícula Extraordinária | Sprint 6 |
| 20                   | Verificação do Último Dia de Retirar uma Matéria                    | Sprint 6 |
| 21                   | Verificação do Último Dia para Trancar uma Matéria                  | Sprint 6 |
| 22                   | Adição de Eventos Pessoais ao Calendário por Aluno                  | Sprint 6 |

<sub><em><a name=tabela-2>Tabela 2: Cenários funcionais</a></em></sub>

### <a name=2.3>**2.3 - Backlog do Produto**</a>
#### Backlog Funcional
#### *Temas*
| Tema ID | Tema                            |
|---------|---------------------------------|
| T01     | Acesso ao Sistema               |
| T02     | Acesso a Informações Acadêmicas |
| T03     | Gerenciamento Acadêmico         |

<sub><em><a name=tabela-2.3.1>Tabela 2.3.1:  Backlog Funcional - Temas</a>T</em></sub>

### *Épicos*
| Tema ID | Épico ID | Descrição                                     |
|---------|----------|-----------------------------------------------|
| T01     | E01      | Tela de Login                                 |
| T01     | E02      | Tela de Registro                              |
| T01     | E03      | Tela de Redefinição de Senha                  |
| T02     | E04      | Tela de Mural de Vagas                        |
| T02     | E05      | Tela de Avaliação de Disciplinas              |
| T02     | E06      | Tela do Cardápio do Restaurante Universitário |
| T03     | E07      | Tela de Controle de Faltas                    |
| T03     | E08      | Tela de Calendário Acadêmico Pessoal          |

<sub><em><a name=tabela-2.3.2>Tabela 2.3.2:  Backlog Funcional - Épicos</a></em></sub>

### *User Storys*
| Tema ID | Épico ID | US-ID | Descrição                                                                                                           |
|---------|----------|-------|---------------------------------------------------------------------------------------------------------------------|
| T01     | E01      | US-01 | Eu como aluno quero ser capaz de acessar o sistema.                                                                 |
| T01     | E01      | US-02 | Eu como publicador quero ser capaz de acessar o sistema.                                                            |
| T01     | E02      | US-03 | Eu como aluno quero ser capaz de me registrar no sistema.                                                           |
| T01     | E02      | US-04 | Eu como publicador quero ser capaz de solicitar registro no sistema.                                                |
| T01     | E03      | US-05 | Eu como aluno quero ser capaz de redefinir minha senha de acesso.                                                   |
| T01     | E03      | US-06 | Eu como publicador quero ser capaz de redefinir minha senha de acesso.                                              |
| T02     | E04      | US-07 | Eu como aluno quero ser capaz de visualizar o mural de vagas.                                                       |
| T02     | E04      | US-08 | Eu como aluno quero ser capaz de visualizar uma vaga em detalhe.                                                    |
| T02     | E04      | US-09 | Eu como publicador quero ser capaz de registrar novas vagas ao mural.                                               |
| T02     | E04      | US-10 | Eu como publicador quero ser capaz de visualizar minhas publicações.                                                |
| T02     | E05      | US-11 | Eu como usuário quero ser capaz de visualizar todas as avaliações de disciplinas.                                   |
| T02     | E05      | US-12 | Eu como usuário quero ser capaz de buscar por uma disciplina.                                                       |
| T02     | E05      | US-13 | Eu como usuário quero ser capaz de cadastrar uma avaliação.                                                         |
| T02     | E06      | US-14 | Eu como usuário quero ser capaz de visualizar o cardápio semanal do R.U.                                            |
| T02     | E06      | US-15 | Eu como usuário quero ser capaz de visualizar o cardápio diário do R.U.                                             |
| T03     | E07      | US-16 | Eu como usuário quero ser capaz de cadastrar minhas disciplinas em curso.                                           |
| T03     | E07      | US-17 | Eu como usuário quero ser capaz de adicionar faltas às matérias em curso.                                           |
| T03     | E07      | US-18 | Eu como usuário quero ser capaz de verificar a quantidade de faltas já cadastradas.                                 |
| T03     | E07      | US-19 | Eu como usuário quero ser capaz de verificar o limite de faltas por disciplina.                                     |
| T03     | E08      | US-20 | Eu como usuário quero ser capaz de visualizar o calendário acadêmico com o horário das aulas das matérias em curso. |
| T03     | E08      | US-21 | Eu como usuário quero ser capaz de visualizar no calendário a data de fechamento de matrícula extraordinária.       |
| T03     | E08      | US-22 | Eu como usuário quero ser capaz de visualizar no calendário a data limite para retirada de matrícula.               |
| T03     | E08      | US-23 | Eu como usuário quero ser capaz de visualizar no calendário a data limite para trancamento de matéria.              |
| T03     | E08      | US-24 | Eu como usuário quero ser capaz de adicionar eventos pessoais ao calendário.                                        |

<sub><em><a name=tabela-2.3.3>Tabela 2.3.3:  Backlog Funcional - User Storys</a></em></sub>

### <a name=2.4>**Spints Previstas**</a> 
<div align="center">
  <h3><em> Sprints Previstas</em></h3>
</div>
 <div align="center">
  <h3><em> Sistema de Sprints previstas</em></h3>
</div>
  

| Sprint   | Descrição                                             | Objetivos                                                                                                                                                               | Users Stories                       |
|----------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| Sprint 1 | Criação e configuração de ambiente de desenvolvimento | Preparação do ambiente de desenvolvimento (Backend e Frontend) Início do Tema 1.                                                                                        |                                     |
| Sprint 2 | Tema 1 – Acesso ao sistema                            | Desenvolver tela de login, registro e recuperação de senha. Finalizar o Tema 1.                                                                                         | US-01 US-02 US-03 US-04 US-05 US-06 |
| Sprint 3 | Tema 2 – Acesso às informações acadêmicas             | Início do Tema 2: Desenvolver a tela de vagas e suas funcionalidades.                                                                                                   | US-07 US-08 US-09 US-10             |
| Sprint 4 | Tema 2 – Acesso às informações acadêmicas             | Desenvolver a tela de avaliação de disciplinas e suas funcionalidades. Desenvolver a tela de visualização do cardápio do restaurante universitário. Finalizar o Tema 2. | US-11 US-12 US-13 US-14 US-15       |
| Sprint 5 | Tema 3 – Gerenciamento acadêmico                      | Início do Tema 3: Desenvolver a tela de avaliação de disciplinas e suas funcionalidades                                                                                 | US-16 US-17 US-18 US-19             |
| Sprint 6 | Tema 3 – Gerenciamento acadêmico                      | Desenvolver a tela de calendário acadêmico e suas funcionalidades Finalizar o Tema 3.                                                                                   | US-20 US-21 US-22 US-23 US-24       |
| Sprint 7 | Inspeção e finalização do projeto                     | Auditar funcionalidades e preparar apresentação final.                                                                                                                  |                                     |

<sub><em><a name=tabela-3>Tabela 3:  Sprints previstas</a></em></sub>

<div align="center">
  Fonte: (Grupo Antares, 2023)
</div>

## <a name=3>**3 - Definição de Ready / Done**</a>

Os critérios de **"Ready" (Pronto)** são utilizados para atividades que já foram desenvolvidas, passaram pela fase "To-Do", mas ainda aguardam testes por outro desenvolvedor da equipe e devem incluir:

- **Definição clara de tarefas:** A funcionalidade ou tarefa deve ser descrita de forma precisa e completa, para que todos na equipe tenham uma compreensão comum do que foi desenvolvido.

- **Especificação de critérios de aceitação:** Critérios de aceitação bem definidos devem estar estabelecidos, indicando como a funcionalidade será avaliada durante os testes.

- **Dependências identificadas:** Todas as dependências, seja de outras funcionalidades, recursos ou informações, devem ser identificadas e resolvidas antes que a tarefa seja encaminhada para os testes.

- **Recursos disponíveis:** A equipe de teste deve ter os recursos necessários, incluindo tempo e competências, para realizar os testes de forma adequada.

- **Priorização clara:** A funcionalidade deve estar devidamente priorizada dentro do backlog, para que a equipe possa se concentrar nas atividades mais importantes a serem testadas.

Já os critérios de **Done (Concluído)** devem incluir:

- **Atendimento aos critérios de aceitação:** Todos os critérios de aceitação estabelecidos devem ser satisfeitos.

- **Testes e validações completos:** A funcionalidade deve ser testada e validada para garantir que funcione conforme o esperado e não introduza problemas no sistema.

- **Documentação atualizada:** A documentação relevante deve ser atualizada para refletir as mudanças introduzidas pela funcionalidade.

- **Revisão e aprovação:** A funcionalidade deve passar por uma revisão e aprovação da equipe ou do cliente antes de ser considerada concluída.

## <a name=4>**4 - User Histories**</a> 
| US-ID | História de Usuário                                                                         | Sprint   | Perfil de Acesso | Técnica de Elicitação                               | Critérios De Aceitação                                                                                                                                                            |
|-------|---------------------------------------------------------------------------------------------|----------|------------------|-----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US-01 | Como estudante, quero ser capaz de acessar o sistema.                                       | Sprint 2 | Usuários         | Pesquisa de mercado, levantamento de requisitos     | Ter um campo para colocar e-mail institucional. Ter um campo para senha de até 8 caracteres. Ter um botão Entrar.                                                                 |
| US-02 | Como publicador quero ser capaz de acessar o sistema.                                       | Sprint 2 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter um campo para colocar meu e-mail institucional. Ter um campo para senha de até 8 caracteres. Ter um botão Entrar.                                                             |
| US-03 | Como estudante, quero poder me registrar no sistema.                                        | Sprint 2 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter um campo para colocar o e-mail e ter a validação de e-mail sendo ele o institucional. Ter um campo para senha de até 8 caracteres. Ter o botão de Registra-se.                |
| US-04 | Como publicador quero poder me registrar no sistema.                                        | Sprint 2 | Publicador       | Pesquisa de mercado, levantamento de requisitos.    | Ter um campo para colocar o e-mail. Ter um campo para senha de até 8 caracteres. Ter o botão de Registra-se. Receber o e-mail do Admin com o feedback da solicitação de registro. |
| US-05 | Como estudante, quero a possibilidade de recuperar minha senha.                             | Sprint 2 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter um botão de recuperar senha que abra uma tela para colocar um e-mail e logo em seguida uma tela para colocar o token recebido no e-mail de recuperação.                       |
| US-06 | Como publicador quero a possibilidade de recuperar minha senha.                             | Sprint 2 | Publicador       | Pesquisa de mercado, levantamento de requisitos.    | Ter um botão de recuperar senha. Abrir uma tela para colocar o e-mail de recuperação. Abrir uma tela para colocar o token recebido no e-mail de recuperação.                      |
| US-07 | Como estudante, quero poder acessar o mural de vagas.                                       | Sprint 3 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter uma tela com todas as opções de vagas de EJ, atléticas e outros.                                                                                                              |
| US-08 | Como estudante quero ver com detalhes uma opção do mural de vagas.                          | Sprint 3 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Poder clicar em uma vaga e abrir uma tela com todos os detalhes específicos da vaga.                                                                                              |
| US-09 | Como publicador quero ser capaz de adicionar vagas de estágio e informações diversas.       | Sprint 3 | Publicador       | Pesquisa de mercado, levantamento de requisitos.    | Ter uma tela para adicionar vagas de estágios ou alguma informação relevante para os estudantes.                                                                                  |
| US-10 | Como publicador e quero ser capaz de ver minhas publicações.                                | Sprint 3 | Publicador       | Pesquisa de mercado, levantamento de requisitos.    | Ter uma tela de feed com as informações cadastradas.                                                                                                                              |
| US-11 | Como usuário quero uma tela que contenha todas as disciplinas com suas avaliações.          | Sprint 4 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter uma tela com todas as disciplinas. Ter opção de detalhar a avaliação da disciplina escolhida.                                                                                 |
| US-12 | Como usuário quero ser capaz de pesquisar uma disciplina.                                   | Sprint 4 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter uma tela com um botão capaz de pesquisar uma matéria específica.                                                                                                              |
| US-13 | Como usuário quero ser capaz de avaliar uma disciplina.                                     | Sprint 4 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Opção de escolher disciplina para avaliar. Opção de avaliar em anônimo. Opção de avaliar com perfil sem ser em anônimo.                                                           |
| US-14 | Como Usuário quero ser capaz de acessar o cardápio de Restaurante Universitário semanal.    | Sprint 4 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Deve conter uma tela com o cardápio semanal do “RU”.                                                                                                                              |
| US-15 | Como Usuário quero ser capaz de acessar o cardápio de Restaurante Universitário diário.     | Sprint 4 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Deve conter uma tela com o cardápio diário do “RU”.                                                                                                                               |
| US-16 | Como usuário quero ser capaz de cadastrar uma matéria.                                      | Sprint 5 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Deve ser possível cadastrar matéria. Apresentar matéria cadastrada no calendário semestral.                                                                                       |
| US-17 | Como usuário quero ser capaz de cadastrar uma falta e presença no calendário semestral.     | Sprint 5 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Cadastrar falta no calendário semestral. Cadastrar presença no calendário semestral.                                                                                              |
| US-18 | Como usuário quero ser capaz de visualizar minhas faltas e presenças cadastradas.           | Sprint 5 | Usuários         | Pesquisa de requisitos, levantamento de requisitos. | Visualizar faltas e presenças cadastradas.                                                                                                                                        |
| US-19 | Como usuário quero saber meu limite de faltas por matéria.                                  | Sprint 5 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Guardar histórico de faltas adicionadas.                                                                                                                                          |
| US-20 | Como usuário quero ser capaz de visualizar os horários das disciplinas.                     | Sprint 6 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter histórico de matérias cadastradas e apresentar horários.                                                                                                                      |
| US-21 | Como usuário quero ser capaz de ver o último dia de fechamento da matrícula extraordinária. | Sprint 6 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter o calendário acadêmico e apresentar o último dia da matéria extraordinária.                                                                                                   |
| US-22 | Como usuário quero ser capaz de ver o último dia de retirar uma matéria.                    | Sprint 6 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter o calendário acadêmico e apresentar o último dia de retirada de matéria.                                                                                                      |
| US-23 | Como usuário quero ser capaz de ver o último dia para trancar uma matéria.                  | Sprint 6 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter o calendário acadêmico e apresentar o último dia para trancar uma matéria.                                                                                                    |
| US-24 | Como usuário quero ser capaz de adicionar eventos pessoais ao calendário.                   | Sprint 6 | Usuários         | Pesquisa de mercado, levantamento de requisitos.    | Ter o calendário acadêmico. Poder adicionar eventos pessoais nele.                                                                                                                |

<sub><em><a name=tabela-4>Tabela 4:  User Histories</a></em></sub>

## <a name=5>**5 - Diagrama de Casos de Uso**</a> 

![Figura 1: Diagrama de caso de uso](https://raw.githubusercontent.com/FGA0138-MDS-Ajax/2023-2-ANTARES/e5b55a71d10e45eca890e1b7733a778499094414/Documentos/figuras/Declaracao%20de%20Escopo%20-%20Figura01%20-%20Diagrama%20Casos%20de%20Uso.png)

<sub><em>Figura 1:  Diagrama de caso de uso</em></sub>

No diagrama de casos de uso é possível visualizar que existem três tipos de perfil de acesso, que são, administradores, alunos e publicadores (EJs/atléticas). Suas funções dentro do sistema possuem variações.  

O administrador tem acesso a todos as funções do sistema, mas só ele pode gerenciar perfis de acesso, criar novos usuários e gerenciar registros dos publicadores. O aluno pode avaliar turmas anteriores, ter o controle de suas faltas, atualizar o cardápio semanal e também visualizar as publicações. Os publicadores são responsáveis por divulgar informações acadêmicas.

## <a name=6>**6 - Minimum Viable Product (MVP)**</a>
| **Usuários**                                          | **Proposta do MVP**                                                                                                                                           | **Resultado Esperado**                                                                                                                                                         | **Funcionalidades**                                                                                                               | **Jornadas**                                                 | **Métricas para Validação**                             |
|-------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|---------------------------------------------------------|
| Discentes da FGA, <br>Atlética, <br>Empresas Juniores | Acesso a informações acadêmicas, <br>Cardápio do RU, <br>Gerenciamento acadêmico por meio de controle de faltas para cada matéria e avaliações de disciplinas | Informações acadêmicas centralizadas, <br>Que discentes consigam se organizar, <br>Facilitar comunicação entre EJs/Atléticas entre alunos por meio de publicações informativas | Feedback de turmas anteriores, <br>Divulgação de informações acadêmicas, <br>Acesso ao cardápio da semana, <br>Controle acadêmico | Acessar o site, <br>Buscar a funcionalidade desejada no menu | Feedback dos discentes, <br>Nível de adesão do software |

<sub><em><a name=tabela-5>Tabela 5:  Minimum Viable Product (MVP)</a></em></sub>

# 7 - Referências
