import React, {useState, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import Slide from "@material-ui/core/Slide";

//components
import TableUsers from "./TableUsers";
import Charts from '../Charts/Charts.jsx';


//actions
import { getUsers, cleanUsersStore } from "../../Redux/actions/stores.actions";
import { getToken } from "../../Functions/functions";

import './userstore.module.css'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    width:'100%',
    
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  list: {
    width: "60%",
    alignItems: "center",
  },
  btn:{
    '&:hover':{
      backgroundColor:'#37a2eb'
    }
  }
  
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog({ name,id,nameStore }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState([]);
  const usersStore = useSelector(store => store.storeReducer.users);
  const dispatch = useDispatch();


  useEffect(() => {
    setRow(usersStore);
    //crear funcion de limpieza de componente
  }, [usersStore])

  const handleClickOpen = () => {
    dispatch(getUsers(id,getToken()));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(cleanUsersStore());
  };
  
  return (
    <div >
      <Button  
        variant="contained"  
        color='primary' 
        startIcon={name ==='users'?<PeopleIcon />:<BarChartIcon/>}
        onClick={handleClickOpen}
      >
        {name.toUpperCase()}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={classes.dialog}
      >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.btn}
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} >
              {nameStore.toUpperCase() + ' - ' + name.toUpperCase()}
            </Typography>
          </Toolbar>
        </AppBar>
        {name === 'users' ?
          <TableUsers 
            row={row}  
            type='storeDetails'
          />
          :  <Charts id={id}/> }
      </Dialog>
    </div>
  );
}
