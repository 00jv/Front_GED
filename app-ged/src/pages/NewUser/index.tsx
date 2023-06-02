import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '@/Components/footer';
import { useRouter } from 'next/router';
import ToasStyled from '@/Components/ToastStyled';
import api from '@/services/api';
const theme = createTheme();

export default function SignUp() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email')
    const password = data.get('password')

    Newuser(email as string, password as string)
  };

  const Newuser = async (email: string, password: string) => {
    try {

      const { data } = await api.post('/signup', {email, password})


      if (data.message === 'Usuário criado com sucesso.') {
        setSnackbarOpen(true)
        setSnackbarType('success');
        setSnackbarMessage('Cadastro feito com sucesso !!')
        login()
      } else if (data.message = "Este email já está em uso") {
        setSnackbarOpen(true)
        setSnackbarType('info');
        setSnackbarMessage('Este email já está em uso.')
      }
    } catch (error: any) {
      if (error.message = "Request failed with status code 400") {
        setSnackbarOpen(true)
        setSnackbarType('info');
        setSnackbarMessage('Este email já está em uso.')
        return;
      }
      setSnackbarOpen(true)
      setSnackbarType('error');
      setSnackbarMessage('Algo deu Errado :(.')
    }
  }

  const handleClick = () => {
    setSnackbarOpen(false);
  }

  const login = () => {
    router.push('/Login')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar Novo Usuário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Criar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Já tem uma conta? Faça Login
                </Link>
              </Grid>
            </Grid>
          </Box>
          <ToasStyled open={snackbarOpen} handleClose={handleClick} type={snackbarType} message={snackbarMessage} />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}