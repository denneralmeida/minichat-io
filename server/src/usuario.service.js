class UsuarioService {
  constructor() {
    this.usuariosLogados = [];
    this.mensagens = [];
  }

  logarUsuario(usuario) {
    this.usuariosLogados.push(usuario);
  }

  deslogarUsuario(socketId) {
    this.usuariosLogados = this.usuariosLogados.filter(
      ({ socketId: _socketId }) => _socketId !== socketId
    );
  }

  salvarMensagem(mensagem) {
    this.mensagens.push(mensagem);
  }
}

module.exports = UsuarioService;
