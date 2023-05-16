import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { InputAdornment } from '@mui/material';

export default function ModalPasta({ handleClickOpen, open }: any) {
  return (
    <div>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Nova Pasta</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Crie uma nova pasta para organizar seus arquivos
          </DialogContentText>
          <div style={{marginTop: '1rem'}}>
            <TextField
              id="input-with-icon-textfield"
              label="Nome, Ex: Documentos"
              fullWidth
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
          <Button onClick={handleClickOpen}>Criar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}