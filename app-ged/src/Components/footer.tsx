import { Link, Typography } from "@mui/material";

export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'João Victor © '}
        <Link color="inherit" href="https://github.com/00jv">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }