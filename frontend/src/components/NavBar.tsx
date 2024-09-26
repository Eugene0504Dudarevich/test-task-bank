import { FC } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export const NavBar: FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon/>
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, ml: 2 }}
        >
          Millennium
        </Typography>
        <IconButton
          size="large"
          aria-label="account-of-current-user"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};