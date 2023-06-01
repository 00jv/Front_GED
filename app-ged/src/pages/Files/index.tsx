import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { Container } from './styles';

const Files: React.FC = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <PictureAsPdfIcon sx={{display: 'flex', justifyContent: 'center', margin: '0 auto', fontSize: '15rem'}}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Documentção do Projeto
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Documentação do projeto, contendo as informações necessárias para o desenvolvimento do projeto.
          </Typography>
          <Button variant="text">Download</Button>
        </CardContent>
    </Card>
  );
}

export default Files;