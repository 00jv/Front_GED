import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Input, IconButton, Tooltip, InputAdornment, Grid, Snackbar, Alert } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import styled from "styled-components";

const StyledUploadIcon = styled(UploadFile)`
  font-size: 15rem;
`;

const StyledInput = styled(Input)`
  display: none;
`;

const StyledUploadContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;





export default function ModalFile({ handleClickOpen, open }: any) {
    const [nome, setNome] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    function handleUpload(event: any) {
        const value = event.target.files;
        setFile(value[0]);
        setNome(value[0].name);
        setOpenSnackbar(true)
    }

    function handleClose() {
        setOpenSnackbar(false);
    }

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
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
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

                    <div style={{ marginTop: "1rem", display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} sm={6}>
                            <Tooltip title="Anexar documento com foto, contendo o número de CPF">
                                <Button
                                    variant="text"
                                    fullWidth
                                    sx={{ textDecoration: 'none', color: 'darkgray' }}
                                    component="label"
                                >
                                    <UploadFile style={{ fontSize: '15rem' }} />
                                    <input hidden onChange={handleUpload} type="file" />
                                </Button>
                            </Tooltip>
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Arquivo Enviado
                                </Alert>
                            </Snackbar>
                        </Grid>

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickOpen}>Cancelar</Button>
                    <Button onClick={handleClickOpen}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}