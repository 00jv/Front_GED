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
import Animacao from '@/Components/Animacao';
import Copyright from '@/Components/footer';
import FolderIcon from '@mui/icons-material/Folder';
import Header from '@/Components/header';
const drawerWidth: number = 240;




const mdTheme = createTheme();

function DashboardContent() {
  const [folder, setFolder] = React.useState(false);


  function handleFolder() {
    setFolder(!folder);
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
          <Header />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {folder === true ?
              <div>
                <Animacao />
              </div> :
              <>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <div>
                    <IconButton>
                      <FolderIcon style={{ fontSize: '15rem' }} />
                    </IconButton>
                    <Typography style={{ margin: '0 auto', display: 'flex', justifyContent: 'center'}} component="h2" gutterBottom>
                      Documentações
                    </Typography>
                  </div>
                </div>
              </>
            }
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}