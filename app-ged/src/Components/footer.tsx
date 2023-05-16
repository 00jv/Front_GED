import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'João Victor © '}
        <Link color="inherit" target="_blank" href="https://github.com/00jv">
          Github
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }