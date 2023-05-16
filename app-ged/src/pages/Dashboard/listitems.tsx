import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PersonIcon from '@mui/icons-material/Person';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';

interface mainListItemsProps {
  handleFolder: () => void;
}


export const mainListItems = ({handleFolder}: mainListItemsProps) => {
  const router = useRouter();

  function login() {
    router.push('../Login');
  }
  
  return (

 <React.Fragment>
    <ListItemButton onClick={() => handleFolder()}>
      <ListItemIcon>
        <CreateNewFolderIcon />
      </ListItemIcon>
      <ListItemText primary="Criar Pasta" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NoteAddIcon />
      </ListItemIcon>
      <ListItemText primary="Criar Arquivo" />
    </ListItemButton>  
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>
    <ListItemButton onClick={() => login()}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);

}