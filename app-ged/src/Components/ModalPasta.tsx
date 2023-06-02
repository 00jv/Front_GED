import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Box, InputAdornment } from '@mui/material';
import Cookies from 'js-cookie';
import api from '@/services/api';
import ToastStyled from './ToastStyled';
import CircularProgress from '@mui/material/CircularProgress';

export default function ModalPasta({ handleClickOpen, open }: any) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarType, setSnackbarType] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [nomepasta, setNomepasta] = React.useState('')
  const [loading, setLoading] = React.useState(false)


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = data.get('nomepasta')

    createPastas(nome as string)
  };


  const createPastas = async (nome: string) => {
    try {
      setLoading(true)
      await api.post(`/users/createpastas/?userId=${Cookies.get('userId')}`, { nome: nomepasta }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        },
      })
      setLoading(false)
      setSnackbarOpen(true)
      setSnackbarType('success');
      setSnackbarMessage('Pasta criada com sucesso !!')
    } catch (error) {
      setLoading(false)
      setSnackbarOpen(true)
      setSnackbarType('error');
      setSnackbarMessage('Algo deu Errado :(')
    }
  }


  const handleClose = async () => {
    setSnackbarOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClickOpen}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogTitle>Nova Pasta</DialogTitle>
          <DialogContent>

            <DialogContentText>
              Crie uma nova pasta para organizar seus arquivos
            </DialogContentText>
            <div style={{ marginTop: '1rem' }}>

              <TextField
                id="input-with-icon-textfield"
                label="Nome, Ex: Documentos"
                fullWidth
                required
                name="nomepasta"
                value={nomepasta}
                onChange={(e) => setNomepasta(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreateNewFolderIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickOpen}>Cancelar</Button>
            <Button type='submit'>
              {loading ? <CircularProgress size={24} /> : 'Criar'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <ToastStyled type={snackbarType} open={snackbarOpen} handleClose={handleClose} message={snackbarMessage} />
    </div>
  );
}