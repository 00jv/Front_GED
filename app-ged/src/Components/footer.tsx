import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
       
        <Link color="inherit" target="_blank" href="https://github.com/00jv">
        {'João Victor '}
        </Link>
        <Link color="inherit" target="_blank" href="https://github.com/GuxtoOo">
        {'e Augusto Manoel © '}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }