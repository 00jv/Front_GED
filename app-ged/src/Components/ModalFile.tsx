import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Input, IconButton, Tooltip, InputAdornment, Grid, Snackbar, Alert, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import api from '@/services/api';
import Cookies from 'js-cookie';
import ToastStyled from './ToastStyled';

export default function ModalFile({ handleClickOpen, open, idFolder }: any) {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarType, setSnackbarType] = React.useState('');
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [nome, setNome] = React.useState('');
    const [file, setFile] = React.useState<File | null>(null);
    const [descricao, setDescricao] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [typeFile, setTypeFile] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveFile()
    };

    function handleUpload(event: any) {
        const value = event.target.files;
        setFile(value[0]);
        setNome(value[0]?.name);
        setTypeFile(value[0]?.type);
        setOpenSnackbar(true)
    }

    const saveFile = async () => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('file', file as File);
            formData.append('nome', nome);
            formData.append('descricao', descricao);
            formData.append('typeFile', typeFile);

            await api.post(`/users/pastas/createarquivos/?userId=${Cookies.get('userId')}&folderId=${idFolder}`, formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                },
            })

            setLoading(false)
            setSnackbarOpen(true)
            setNome('')
            setFile(null)
            setSnackbarOpen(true)
            setSnackbarType('success');
            setSnackbarMessage('Arquivo salvo com sucesso !!')
            handleClickOpen()
        } catch (error) {
            setLoading(false)
            setSnackbarOpen(true)
            setSnackbarType('error');
            setSnackbarMessage('Algo deu Errado :(')
        }
    }

    function handleClose() {
        setOpenSnackbar(false);
    }

    function formatFileSize(fileSize: number) {
        if (fileSize === 0) {
            return '0 Bytes';
        }

        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let i = Math.floor(Math.log(fileSize) / Math.log(1024));

        return parseFloat((fileSize / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const handleClick = () => {
        setSnackbarOpen(false);
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClickOpen} maxWidth={"md"} >
                <DialogTitle>Salvar Arquivo</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Crie um novo arquivo para organizar seus arquivos
                        </DialogContentText>
                        <TextField
                            sx={{ marginTop: '1rem' }}
                            id="input-with-icon-textfield"
                            label="Nome, Ex: CPF"
                            value={nome}
                            required
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
                            value={descricao}
                            onChange={(event) => setDescricao(event.target.value)}
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
                            {file === null ? (
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Anexar documento com foto, contendo o número de CPF">
                                        <Button
                                            variant="text"
                                            fullWidth
                                            sx={{ textDecoration: 'none', color: 'darkgray' }}
                                            component="label"
                                        >
                                            <UploadFile style={{ fontSize: '15rem' }} />
                                            <input required hidden onChange={handleUpload} type="file" />
                                        </Button>
                                    </Tooltip>

                                </Grid>
                            ) : (
                                <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome Do Arquivo (Nome Original)</TableCell>
                                            <TableCell align="right">Tamanho</TableCell>
                                            <TableCell align="right">Tipo do arquivo</TableCell>
                                            <TableCell align="right">Remover</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {file?.name}
                                            </TableCell>
                                            <TableCell align="right">{formatFileSize(file?.size)}</TableCell>
                                            <TableCell align="right">{file?.type}</TableCell>
                                            <TableCell align="right"><IconButton onClick={() => setFile(null)}><DeleteIcon color='error' /></IconButton></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            )}
                            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Arquivo Enviado
                                </Alert>
                            </Snackbar>
                        </div>

                        <ToastStyled open={snackbarOpen} handleClose={handleClick} type={snackbarType} message={snackbarMessage} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickOpen}>Cancelar</Button>
                        <Button type='submit' disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Salvar'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}