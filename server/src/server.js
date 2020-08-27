const UsuarioService = require('./usuario.service');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

const service = new UsuarioService();

io.use((socket, next) => {
  const { nome, sala } = socket.handshake.query;
  if (nome && sala) {
    service.logarUsuario({ nome, sala, socketId: socket.id });

    socket.join(sala);
    socket.to(sala).broadcast.emit('novoUsuario', nome);

    next();
  } else {
    next(new Error('Não foi possível conectar na socket.'));
  }
});

const atualizarUsuariosAtivos = (sala) => {
  io.to(sala).emit(
    'usuariosAtivos',
    service.usuariosLogados.filter(({ sala: _sala }) => _sala == sala)
  );
};

io.on('connection', (socket) => {
  console.log('Novo cliente conectado: ' + socket.id);

  const getUsuarioBySocketId = () =>
    service.usuariosLogados.find(({ socketId }) => socketId === socket.id);

  socket.on('usuariosAtivos', atualizarUsuariosAtivos);

  socket.on('disconnect', () => {
    const usuario = getUsuarioBySocketId();

    if (usuario) {
      const { nome, sala } = usuario;

      service.deslogarUsuario(socket.id);
      socket.to(sala).broadcast.emit('saidaUsuario', nome);
      atualizarUsuariosAtivos(sala);

      console.log('Cliente desconectado: ' + socket.id);
    }
  });

  socket.on('mensagem', (mensagem, callback) => {
    const usuario = getUsuarioBySocketId();
    const dados = {
      texto: mensagem,
      usuario,
      data: new Date(),
    };

    io.to(usuario.sala).emit('mensagem', dados);

    service.salvarMensagem(dados);
    callback && callback();
  });
});

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Servidor funcionando na porta: ${PORT}`);
});
