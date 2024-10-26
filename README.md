#Cleaner

## Descrição

O **Message Cleaner** é um bot simples para Discord que permite a limpeza de mensagens em um canal. Este projeto foi desenvolvido com fins educacionais e serve como um exemplo prático de automação em um ambiente de chat.

## Funcionalidade

O bot é ativado por meio de uma reação de emoji. Quando um usuário reage a uma de suas próprias mensagens com um emoji específico, o bot inicia a remoção de todas as mensagens desse usuário no canal onde a mensagem original foi enviada.

### Como Funciona

1. **Reação ao Emoji:** O usuário reage à sua própria mensagem com um emoji configurado.
2. **Ativação do Bot:** O bot detecta a reação e começa a deletar todas as mensagens do usuário no canal.
3. **Limpeza de Mensagens:** O bot continua a deletar as mensagens até que todas sejam removidas ou até que o bot seja interrompido.

## Pré-requisitos

- Node.js
- Discord.js
- Um servidor Discord para testar o bot

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/message-cleaner.git
   cd message-cleaner

2. Instale as dependências:
`npm install`

3. Abra o arquivo config.json e adicione o token da sua conta:
```json
{
  "Token": "seu_token_aqui",
  "Emoji": "🤙"
}
```
## Como usar
> Abra o cmd no diretório do Cleaner e execute o comando `node .` ou `node index.js`.

*Não me responsabilizo por uso indevido.*
