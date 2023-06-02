import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Copyright from '@/Components/footer';
import ToasStyled from '@/Components/ToastStyled';
import api from '@/services/api';
import Cookies from 'js-cookie';
const theme = createTheme();


export default function SignIn() {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    loginUser(email as string, password as string)
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const Body = {
        email: email,
        password: password
      }

      const { data } = await api.post('/login', Body)

      console.log(data)

      if (data.token) {
        setSnackbarOpen(true)
        setSnackbarType('success');
        setSnackbarMessage('Login feito com sucesso !!')
        Cookies.set('token', data.token)
        Cookies.set('userId', data.userId)
        Dashboard()
      } else if (!data.token) {
        setSnackbarOpen(true)
        setSnackbarType('error');
        setSnackbarMessage('Email ou senha inválidos.')
      }

    } catch (error) {
      setSnackbarOpen(true)
      setSnackbarType('error');
      setSnackbarMessage('Algo deu Errado :(.')
    }
  }

  const handleClick = () => {
    setSnackbarOpen(false);
  }

  function Dashboard() {
    router.push('/Dashboard');
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
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type='email'
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Link href="/NewUser" variant="body2">
                  {"Não tem uma conta ? Cadastra-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <ToasStyled open={snackbarOpen} handleClose={handleClick} type={snackbarType} message={snackbarMessage} />
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}