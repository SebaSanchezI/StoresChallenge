import React, {useState} from 'react';
import { useForm } from "react-hook-form";
//Material UI
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Swal from 'sweetalert2';
//components
import FormDialog from '../Form/FormDialog';
//actions 
import { deleteUser } from '../../Redux/actions/users.actions';
import { getToken } from '../../Functions/functions';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    width:'100%',
    padding:'20px 20px',
  },
  paper:{
    width:'100%',
    alignItems:'center',
  },
  toolbar:{
    backgroundColor: '#5aa4e0',
    fontWeight:'bold'
  },
  row:{
    backgroundColor: '#e0dddd',
  }
});




export default function CustomizedTables({type='prueba',row=[],handleAction}) {
  const { reset } = useForm();
    //recibir como prop rows
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({
      id:null,
      name:'',
      last_name:'',
      profile:'',
      user_name:'',
      email:'',
      password:'',
      store_id:null,
    })

    const handleClose = () => {
      setOpen(false);
      reset();
      setUser({
        id:null,
        name:'',
        last_name:'',
        profile:'',
        user_name:'',
        email:'',
        password:'',
        store_id:null,
      })
    };
    
    const handleEdit = (row)=>{
      console.log('handle edit row',row)
      setUser(row);
      setOpen(true);
    }

    //DELETE
    const handleDelete = async (user)=>{

      const res = await Swal.fire({
        title: `Are you sure you want to delete the user ${user.name.toUpperCase()} ${user.last_name.toUpperCase()}?`,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        })
      
      if (res.isConfirmed) {
        const res = await deleteUser(getToken(),user.id);
      handleAction(res);
    }}

    

  return (
    <>  
    {   
        !row.length === 0 ? <CircularProgress /> 
        :
    <TableContainer component={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead className={classes.toolbar}>
          <TableRow >
            {type !== 'storeDetails' && <StyledTableCell className={classes.toolbar} align="left">ACTIONS</StyledTableCell>}
            <StyledTableCell className={classes.toolbar} align="left">NAME</StyledTableCell>
            <StyledTableCell className={classes.toolbar} align="left">LASTNAME</StyledTableCell>
            <StyledTableCell className={classes.toolbar} align="left">USERNAME</StyledTableCell>
            <StyledTableCell className={classes.toolbar} align="left">PROFILE</StyledTableCell>
            {type !== 'storeDetails' && 
            <StyledTableCell className={classes.toolbar} align="left">STORE</StyledTableCell>}
            <StyledTableCell className={classes.toolbar} align="left">EMAIL</StyledTableCell>
            <StyledTableCell className={classes.toolbar} align="left">PASSWORD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((row,i) => (
            <StyledTableRow key={row.name}>
              {type !=='storeDetails' && 
                <StyledTableCell className={i%2===1?classes.row:null} component="th" scope="row">
                  <Tooltip  title='Edit' >                                         
                    <IconButton size='small' aria-label='Edit'>
                      <EditIcon color="primary" onClick={()=>handleEdit(row)} />
                    </IconButton> 
                  </Tooltip> 
                  <Tooltip title='Delete' > 
                    <IconButton size='small' aria-label='Delete'>
                      <DeleteIcon  color="secondary" onClick={()=>handleDelete(row)} />
                    </IconButton>       
                  </Tooltip>                                                                          
              </StyledTableCell>
              }
              <StyledTableCell className={i%2===1?classes.row:null} component="th" scope="row">
                  {row.name}
              </StyledTableCell>
              <StyledTableCell className={i%2===1?classes.row:null} align="left">{row.last_name}</StyledTableCell>
              <StyledTableCell className={i%2===1?classes.row:null} align="left">{row.user_name}</StyledTableCell>
              <StyledTableCell className={i%2===1?classes.row:null} align="left">{row.profile}</StyledTableCell>
              {type !== 'storeDetails' &&
                <StyledTableCell className={i%2===1?classes.row:null} align="left" value={row.store_id}>
                {row.store.name}
                </StyledTableCell>}
              <StyledTableCell className={i%2===1?classes.row:null} align="left">{row.email}</StyledTableCell>
              <StyledTableCell className={i%2===1?classes.row:null} align="left">{row.password}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleAction={handleAction}
        dataUser={user}
    />
    </TableContainer>
    
     } 
    </>
  );
}
