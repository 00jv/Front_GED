import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import ModalPasta from "./ModalPasta";
import ModalFile from "./ModalFile";
import Image from 'next/image';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer({ toggleDrawer, state }: any) {

  const router = useRouter();

  const login = () => {
    router.push('/Login');
  }

  const [openFolder, setOpenFolder] = React.useState(false);
  const [openFile, setOpenFile] = React.useState(false);

  function handleClickOpenFolder() {
    setOpenFolder(!openFolder);
  }

  function handleClickOpenFile() {
    setOpenFile(!openFile);
  }


  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItemButton onClick={() => handleClickOpenFolder()}>
          <ListItemIcon>
            <CreateNewFolderIcon />
          </ListItemIcon>
          <ListItemText primary="Criar Pasta" />
        </ListItemButton>
        <Divider/>
        <ListItemButton onClick={() => handleClickOpenFile()}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="Criar Arquivo" />
        </ListItemButton>
        <Divider/>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>
        <Divider/>
        <ListItemButton onClick={() => login()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>

    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>

      <ModalPasta handleClickOpen={handleClickOpenFolder} open={openFolder} />
      <ModalFile handleClickOpen={handleClickOpenFile} open={openFile} />
    </div>
  );
}
