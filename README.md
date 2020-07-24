# My chat with Socket.io
Criação de um chat em tempo real com o socket.io.

# Screenshots

<p align="center">
          <img src="screenshots/screenshot1" />
</p> 
<hr />
<p align="center">
          <img src="screenshots/screenshot2" />
</p> 
<hr />
<p align="center">
          <img src="screenshots/screenshot3" />
</p> 
<hr />

# Exemplos de uso

* `` io.on("connection", (client) => {...} `` </br>
  * _Disparado quando o usuário entra na aplicação_

* `` client.emit('message', "this is a test"); `` </br>
  * _Enviar apenas para o cliente atual_

* `` io.emit('message', "this is a test"); `` </br>
  * _Enviar para todos os clientes, inclusive o atual_

* `` client.broadcast.emit('message', "this is a test"); `` </br>
  * _Enviar para todos os clientes, exceto o atual_

* `` socket.broadcast.to('game').emit('message', 'nice game'); `` </br>
  * _Enviar para todos os clientes (com exceção do atual) para uma sala específica_

* `` io.in('game').emit('message', 'cool game'); `` </br>
  * _Enviar para todos os clientes em uma sala específica_

* `` client.to('game').emit('message', 'enjoy the game'); `` </br>
  * _Enviar para o atual, caso ele esteja na sala_

* `` io.of('namespace1').emit('message', 'gg'); `` </br>
  * _Enviar para todos os clientes em um namespace 'namespace1'_

* `` client.broadcast.to(socketid).emit('message', 'for your eyes only'); `` </br>
  * _Enviando para um socketid individual_
