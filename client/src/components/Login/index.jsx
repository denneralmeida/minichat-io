import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Divider,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import paths from '../../utils/paths';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  paper: {
    maxWidth: '400px',
    padding: '1%',
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '700',
    padding: '2%',
    textAlign: 'center',
  },
  formControl: {
    marginTop: theme.spacing(1.5),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [nome, setNome] = useState('');
  const [sala, setSala] = useState(1);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.title} color="primary">
          MiniChat IO
        </Typography>
        <Divider variant="fullWidth" />
        <Box padding={2}>
          <TextField
            label="Nome"
            fullWidth
            value={nome}
            onChange={({ target }) => setNome(target.value)}
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="sala">Sala</InputLabel>
            <Select
              labelId="sala"
              fullWidth
              value={sala}
              onChange={evt => setSala(evt.target.value)}
            >
              <MenuItem value={1}>Sala 1</MenuItem>
              <MenuItem value={2}>Sala 2</MenuItem>
              <MenuItem value={3}>Sala 3</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            fullWidth
            className={classes.button}
            disabled={!nome || !sala}
            onClick={() => history.push(paths.CHAT, { nome, sala })}
          >
            entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
