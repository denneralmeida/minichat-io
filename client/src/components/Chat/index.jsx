import React from 'react';
import { Menu, UsuariosAtivos, Mensagens, CampoTexto } from './components';
import { Box, makeStyles, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import paths from '../../utils/paths';
import { Redirect } from 'react-router';
import io from 'socket.io-client';
import { useSnackbar } from 'notistack';

const SOCKET_SERVER = 'http://192.168.15.5:9000';

const useStyles = makeStyles({
  boxHeight: {
    height: `calc(100% - 50px)`,
  },
  loading: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Chat = ({ location, history }) => {
  const { state } = location;
  const classes = useStyles();
  const snackbar = useSnackbar();

  const [socketIO, setSocket] = useState(null);
  const [openSideNav, setOpenSideNav] = useState(true);
  const [usuariosAtivos, setUsuariosAtivos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  const handleSideNav = () => {
    setOpenSideNav(!openSideNav);
  };

  const handleExit = () => {
    if (socketIO) {
      socketIO.off();
      socketIO.disconnect();
    }

    history.push(paths.HOME);
  };

  const sendMessage = () => {
    console.log(mensagem);
    if (mensagem.trim()) {
      socketIO.emit('mensagem', mensagem, () => setMensagem(''));
    }
  };

  const changeMessage = ({ target }) => {
    setMensagem(target.value);
  };

  useEffect(() => {
    const initializeSocket = () => {
      const socket = io(SOCKET_SERVER, {
        query: {
          nome: state?.nome,
          sala: state?.sala,
        },
      });

      const disconnect = () => {
        socket.off();
        socket.disconnect();
        history.push(paths.HOME);
      };

      socket.on('connect', () => {
        setSocket(socket);

        socket.on('novoUsuario', nome => snackbar.enqueueSnackbar(`O usuário ${nome} entrou!`));

        socket.on('saidaUsuario', nome => snackbar.enqueueSnackbar(`O usuário ${nome} saiu!`));

        socket.emit('usuariosAtivos', state?.sala);

        socket.on('usuariosAtivos', setUsuariosAtivos);
      });

      socket.on('disconnect', () => {
        disconnect();
        snackbar.enqueueSnackbar('Você está desconectado.', {
          variant: 'info',
        });
      });

      socket.on('error', message => {
        disconnect();
        snackbar.enqueueSnackbar(message, { variant: 'error' });
      });

      socket.on('mensagem', mensagem => {
        setMensagens(mensagens => [...mensagens, mensagem]);
      });
    };

    setTimeout(initializeSocket, 500);
  }, [snackbar, state, history]);

  return !state?.nome || !state?.sala ? (
    <Redirect to={paths.HOME} />
  ) : socketIO ? (
    <Box height="100%">
      <Menu nome={state.nome} handleSideNav={handleSideNav} handleExit={handleExit} />
      <Box display="flex" className={classes.boxHeight}>
        <UsuariosAtivos
          open={openSideNav}
          usuarios={usuariosAtivos}
          sala={state.sala}
          socketId={socketIO.id}
        />
        <Box component="div" display="flex" flexDirection="column" width="100%">
          <Mensagens mensagens={mensagens} socketId={socketIO.id} />
          <CampoTexto sendMessage={sendMessage} changeMessage={changeMessage} messagem={mensagem} />
        </Box>
      </Box>
    </Box>
  ) : (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

export default Chat;
