import React from 'react';
import {
  List,
  ListItem,
  makeStyles,
  ListSubheader,
  Divider,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
    overflowY: 'auto',
    transition: 'margin-left 0.2s ease-in-out',
  },
  hide: {
    marginLeft: '-200px',
  },
}));

const UsuariosAtivos = ({ usuarios, sala, open, socketId }) => {
  const classes = useStyles();

  const renderSubHeader = () => (
    <ListSubheader component="div">Usuários Ativos - Sala {sala}</ListSubheader>
  );

  return (
    <List
      className={clsx(classes.root, { [classes.hide]: !open })}
      component="nav"
      subheader={renderSubHeader()}
    >
      <Divider />
      {usuarios.map(
        (usuario, i) =>
          usuario.socketId !== socketId && (
            <ListItem button key={i}>
              <ListItemText primary={String(usuario.nome).toUpperCase()} />
            </ListItem>
          ),
      )}
    </List>
  );
};

UsuariosAtivos.defaultProps = {
  open: true,
  socketId: '',
  usuarios: [],
};

UsuariosAtivos.propTypes = {
  open: PropTypes.bool,
  socketId: PropTypes.string,
  usuarios: PropTypes.array,
  sala: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default UsuariosAtivos;
