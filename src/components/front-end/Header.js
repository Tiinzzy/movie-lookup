import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import HeaderMenu from './HeaderMenu';
import { emitter } from './messaging';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  height: 44,
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


let counter = 0;

export default function Header() {
  const [search, setSearch] = useState('');
  const mounted = useRef(false);

  function clickedHome() {
    window.location = "/home";
  }

  function searchTyped() {
    window.location = '/search-result?searched_item=' + search;
  }

  function allowSearch(e) {
    if (e.key === 'Enter') {
      searchTyped()
    } else if (!e.key) {
      setSearch(e.target.value);
    }
  }

  // function searchThisText(e) {
  //   console.log(e.detail);
  // }

  function searchThisText(args) {
    console.log(args);
  }

  useEffect(() => {
    mounted.current = true;
    if (++counter === 1) {
      // LISTENERS.getHeader().addEventListener('search-this-text', searchThisText, false);
      emitter.on('search-this-text', searchThisText);
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} id="header-serach-box">
      <AppBar position="sticky" style={{ backgroundColor: '#333433' }}>
        <Toolbar position="static">
          <img alt="camera-img" src="images/camera.png" height="40" style={{ marginLeft: 16, cursor: 'pointer' }} onClick={clickedHome} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: '#F5C518', fontWeight: '900', marginLeft: 4, cursor: 'pointer' }} onClick={clickedHome}>
            Box Office
          </Typography>
          <HeaderMenu />
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }} onKeyDown={allowSearch} onChange={allowSearch} />
            <IconButton size="large" aria-label="search" color="inherit" onClick={searchTyped}>
              <SearchIcon />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
