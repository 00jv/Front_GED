import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputAdornment } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
export default function ModalFile({ handleClickOpen, open }: any) {

    return (
        <div>
            <Dialog open={open} onClose={handleClickOpen}>
                <DialogTitle>Criar Arquivo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Crie um novo arquivo para organizar seus arquivos
                    </DialogContentText>
                    <TextField
                        sx={{ marginTop: '1rem' }}
                        id="input-with-icon-textfield"
                        label="Nome, Ex: CPF"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NoteAddIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        sx={{ marginTop: '1rem' }}
                        id="input-with-icon-textfield"
                        label="Descrição, Ex: RG"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NoteAddIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <TextField
                        sx={{ marginTop: '1rem' }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Arquivo"
                        type="file"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NoteAddIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpen}>Cancelar</Button>
                    <Button onClick={handleClickOpen}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}