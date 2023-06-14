import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Files from '../Files';
import Animacao from '@/Components/AnimacaoFolder';
import Copyright from '@/Components/footer';
import FolderIcon from '@mui/icons-material/Folder';
import Header from '@/Components/header';
import api from '@/services/api';
import Cookies from 'js-cookie';
import ToastStyled from '@/Components/ToastStyled';
import { useRouter } from 'next/router';
import ModalPasta from '@/Components/ModalPasta';
const drawerWidth: number = 240;




const mdTheme = createTheme();

function DashboardContent() {
  const router = useRouter();
  const [folder, setFolder] = React.useState(false);
  const userId = Cookies.get('userId')
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [pastas, setPastas] = React.useState([])


  const getPastas = async () => {
    try {
      const { data } = await api.get(`/users/getpastas/?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })
     
      setPastas(data.pastas)
    } catch (error) {
      setSnackbarOpen(true)
      setSnackbarType('error');
      setSnackbarMessage('Algo deu Errado :(.')
    }
  }


  const handleClick = () => {
    setSnackbarOpen(false);
  }

  React.useEffect(() => {
    getPastas()
  }, [])

  const filesPages = (id: string) => {
    router.push(`/Files?idFolder=${id}`)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Header nome={'GED'} />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {pastas.length === 0 ?
              <div>
                <Animacao />
              </div> :
              <>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {pastas.map((item: any, index: number) => (
                    <div key={index}>
                      <IconButton onClick={() => filesPages(item.id)} >
                        <FolderIcon style={{ fontSize: '15rem' }} />
                      </IconButton>
                      <Typography style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }} component="h2" gutterBottom>
                        {item.nome}
                      </Typography>
                    </div>
                  ))}
                </div>
              </>
            }
            <Copyright sx={{ pt: 4 }} />

            <ToastStyled open={snackbarOpen} handleClose={handleClick} type={snackbarType} message={snackbarMessage} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}