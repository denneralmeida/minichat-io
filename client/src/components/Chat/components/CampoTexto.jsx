import React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
  button: {
    minWidth: '150px',
  },
});

const CampoTexto = ({ sendMessage, changeMessage, messagem }) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      <TextField
        multiline
        placeholder="Digite sua mensagem..."
        fullWidth
        variant="outlined"
        size="medium"
        rowsMax={2}
        onChange={changeMessage}
        value={messagem}
      />
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={classes.button}
        endIcon={<Send />}
        onClick={sendMessage}
      >
        Enviar
      </Button>
    </div>
  );
};

CampoTexto.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  changeMessage: PropTypes.func.isRequired,
  messagem: PropTypes.string.isRequired,
};

export default CampoTexto;
