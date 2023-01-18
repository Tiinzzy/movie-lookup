import * as React from 'react';
import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import HeaderMenu from './HeaderMenu';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

export default function Header() {
  const [search, setSearch] = useState('');

  function clickedHome() {
    window.location = "/home";
  }

  function searchTyped() {
    window.location = '/search-result?searched_item=' + search;
  }

  function allowSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ backgroundColor: '#333433' }}>
        <Toolbar position="static">
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: '#F5C518', fontWeight: '900', marginLeft: 15, cursor: 'pointer' }} onClick={clickedHome}>
            Box Office
          </Typography>
          <HeaderMenu />
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }} onChange={allowSearch} />
            <IconButton size="large" aria-label="search" color="inherit" onClick={searchTyped}>
              <SearchIcon />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
