import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CssBaseline, Fab, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { Container } from './styles';
import Header from '@/Components/header';
import Fotter from '@/Components/footer';
import { useRouter } from 'next/router';
import api from '@/services/api';
import Cookies from 'js-cookie';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AnimacaoFiles from '@/Components/AnimacaoFiles';
import ModalFile from '@/Components/ModalFile';
import ModalPasta from '@/Components/ModalPasta';

const Files = () => {
  const router = useRouter();
  const { idFolder } = router.query;
  const [arquivos, setArquivos] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalFolder, setOpenModalFolder] = React.useState(false);


  const getArquivos = async () => {
    try {
      const { data } = await api.get(`/users/pastas/getarquivos/?userId=${Cookies.get('userId')}&folderId=${idFolder}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })

      setArquivos(data)
    } catch (error) {
      console.log(error)
    }

  }

  React.useEffect(() => {
    getArquivos()
  }, [])

  const handleClickOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleClickOpenModalFile = () => {
    setOpenModalFolder(!openModalFolder);
  };



  return (
    <>
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
          <Header nome={'Arquivos'} />

          <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', justifyContent: 'end', marginTop: '1rem', marginRight: '2rem' }}>
            <Tooltip title="Adicionar Arquivo">
              <Fab color="primary" aria-label="add" onClick={() => handleClickOpenModal()}>
                <UploadFileIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Editar Pasta">
              <Fab color="primary" aria-label="edit" >
                <EditIcon />
              </Fab>
            </Tooltip>
            <Tooltip title="Deletar Pasta">
              <Fab color="primary" aria-label="delete">
                <FolderDeleteIcon />
              </Fab>
            </Tooltip>
          </Box>

          {arquivos.length === 0 ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimacaoFiles />
            </div> : (
              <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem', padding: '1rem' }}>
                <>
                  {arquivos.map((arquivo: any, index: number) => (
                    <Card sx={{ width: 500 }} key={index}>
                      <PictureAsPdfIcon sx={{ display: 'flex', justifyContent: 'center', margin: '0 auto', fontSize: '15rem', flexDirection: 'column' }} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {arquivo.nome}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {arquivo.descricao ? arquivo.descricao : 'Sem descrição'}
                        </Typography>
                        <Button variant="text">Download</Button>
                        <Button variant="text" color='error'>Apagar</Button>
                      </CardContent>
                    </Card>
                  ))}
                </>
              </Box>
            )}

          <ModalFile handleClickOpen={handleClickOpenModal} open={openModal} idFolder={idFolder} />
          <Fotter />
        </Box>
      </Box>
    </>
  );
}

export default Files;