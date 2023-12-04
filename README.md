# Frontend 🖥️
- Projeto Quasar ( framework baseado em Vue3 )
## Dependências
- node: 18.13.0
- quasar/cli: v2.2.2
## Como Rodar
- 'npm install'
- 'quasar dev' ou 'npm run dev'
-  acessar 'http://localhost:9000/' ( padrão ) 
# Backend 🛠️
- 'npm install'
- 'npm run dev'
- Porta:9999 (secundaria: 3000)


# Como utilizar as rotas:

## Publicação de vagas 
Como utilizar a rota de publicar vagas:
- Prepare um arquivo json com os dados:
{
    "criadorEmail": "exemplo@exemplo.com",
    "titulo": "Desenvolvedor Front-End",
    "descricao": "Procuramos um desenvolvedor front-end experiente para se juntar à nossa equipe.",
    "contato": "contato@empresa.com",
    "link": "https://www.empresa.com/carreiras",
    "dataEncerramento": "2023-12-31T23:59:59.000Z" // Data opcional, formato ISO 8601
}
- enviar uma requisição post para:  link/vagas com o body no formato do json acima.
- status 201: vaga criada com sucesso
- status 400: erros de validação no body
- status 500: erro de conexão com o servidor
