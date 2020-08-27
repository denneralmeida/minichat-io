import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Exit from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
}));

const Menu = ({ nome, handleSideNav, handleExit }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton
          color="inherit"
          size="small"
          className={classes.menuIcon}
          onClick={handleSideNav}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {nome}
        </Typography>
        <IconButton color="inherit" size="small" onClick={handleExit}>
          <Exit />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Menu.propTypes = {
  nome: PropTypes.string.isRequired,
  handleSideNav: PropTypes.func.isRequired,
  handleExit: PropTypes.func.isRequired,
};

export default Menu;
