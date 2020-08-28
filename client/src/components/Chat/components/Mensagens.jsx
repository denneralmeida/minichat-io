import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import ScrollToBottom from 'react-scroll-to-bottom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  padding: {
    padding: '5px 10px',
  },
  message: {
    padding: '5px',
    borderRadius: '4px',
    maxWidth: '400px',
    margin: '5px 0',
    wordBreak: 'break-word',
  },
  messageSend: {
    backgroundColor: '#e8f5e1',
  },
  messageReceived: {
    backgroundColor: '#e3f2fd',
  },
  row: {
    display: 'flex',
  },
  messageUsername: {
    lineHeight: '1',
    fontSize: '0.65rem',
  },
}));

const Mensagens = ({ mensagens, socketId }) => {
  const classes = useStyles();

  return (
    <ScrollToBottom className={classes.root}>
      <div className={classes.padding}>
        {mensagens.map(({ usuario, texto, data }, i) => (
          <div
            className={clsx(
              classes.row,
              usuario.socketId === socketId ? classes.flexEnd : classes.flexStart,
            )}
            key={i}
          >
            <div
              className={clsx(
                classes.message,
                usuario.socketId === socketId ? classes.messageSend : classes.messageReceived,
              )}
            >
              <Typography variant="subtitle2" color="textPrimary">
                {texto}
              </Typography>
              <Typography
                variant="overline"
                color="textSecondary"
                className={classes.messageUsername}
              >
                {usuario.nome} - {moment(data).format('HH:mm')}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </ScrollToBottom>
  );
};

Mensagens.propTypes = {
  mensagens: PropTypes.array.isRequired,
  socketId: PropTypes.string.isRequired,
};

export default Mensagens;
