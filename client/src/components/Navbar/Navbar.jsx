import React, { useState, useContext,useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Context from '../../context/UserContext';
import useUser from '../../hooks/useUser';
///MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//action
import { getAllUsers } from '../../Redux/actions/users.actions';
import { getToken } from '../../Functions/functions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width:'100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: 'capitalize',
    padding:'1px 25px 1px 25px',
    textAlign:'center'
  },
  btn:{
    fontWeight:'bold',
    //border:'1px solid white',
    borderRadius:'20px',
    padding:'0px 15px 0px 15px',
    '&:hover':{
        border:'1px solid white',
        borderRadius:'20px',
        padding:'0px 15px 0px 15px',
        backgroundColor:'white',
        color:'#3f51b5'
    },
    li:{
      
        backgroundColor:'#37a2eb'
     
    }

  }
}));

export default function Navbar() {
    const classes = useStyles();
    const {user} = useContext(Context);
    const {logout} = useUser();
    const history = useHistory();
    const dispatch = useDispatch();


    const [auth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

   
      
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleCrud = ()=>{
        dispatch(getAllUsers(getToken()));
        history.push('/crud');
      }

      useEffect(() => {
        if(!getToken()) history.push('/');
        // eslint-disable-next-line
    }, [])


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            open={open}
          >
            <MenuIcon />
          </IconButton>
          {auth && 
          <div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                  <MenuItem className={classes.li} onClick={handleCrud}>Manage Users</MenuItem>
                  <MenuItem onClick={()=>history.push('/home')}>Home</MenuItem>
              </Menu>
          </div>}  
          {user ?
          <Typography variant="h6" className={classes.title}>
            {`${user.name},${user.last_name} - ${user.profile }`}
          </Typography>
          : null }
          <Button color="inherit" 
                    onClick={logout}
                    className={classes.btn}
                    >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
