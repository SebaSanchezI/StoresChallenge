import React, { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

//components
import Navbar from '../Navbar/Navbar';
import TableUsers from '../StoresDetails/TableUsers';
import FormDialog from '../Form/FormDialog';
import Footer from '../Footer/Footer';
//actions
import {getAllUsers, cleanAllUsers} from '../../Redux/actions/users.actions';
import {getToken} from '../../Functions/functions';
//Material UI
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
//style
import styleCrud from './crud.module.css';
import Swal from 'sweetalert2';

const Crud = () => {

    const [open, setOpen] = useState(false);
    let [row, setRow] = useState([]);
    const [optionSelected, setOptionSelected] = useState('');//select principal
    const [selectedStore, setSelectedStore] = useState(null);//
    const [selectedProfile, setSelectedProfile] = useState('');
    const [input, setInput] = useState('');
    const [listFilter, setListFilter] = useState([]);

    const allUsers = useSelector(store => store.userReducer.allUsers);
    const stores = useSelector(store => store.storeReducer.stores);
    const dispatch = useDispatch();

    //ADD USERS
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = (res)=>{

        dispatch(getAllUsers(getToken()));
        Swal.fire({
            title: `Success!`,
            text: res,
            icon: 'success',
            confirmButtonText: 'OK',
        });
    }
    //FILTROS
    const handleChangeSelectType = (e)=>{

        switch (e.target.value) {
            case 'name':
                setOptionSelected('name');
                setInput('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            case 'last_name':
                setOptionSelected('last_name');
                setInput('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            case 'user_name':
                setOptionSelected('user_name');
                setInput('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            case 'profile':
                setOptionSelected('profile');
                setSelectedProfile('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            case 'store_id':
                setOptionSelected('store_id');
                setSelectedStore('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            case 'email':
                setOptionSelected('email');
                setInput('');
                setRow(allUsers);
                setListFilter(allUsers);
                break;
            default:
                setOptionSelected('');
        }
    }

    const handleChangeSelects = (e) => {
        if (e.target.name ==='store_id') setSelectedStore(e.target.value)
        else setSelectedProfile(e.target.value)
        let res = [];
        if(e.target.value){
            res = listFilter.filter((user) => user[e.target.name] === e.target.value);
            if (res.length > 0) setRow(res);
            else {
                        setRow(allUsers);
                        Swal.fire({
                            title: `No results found!`,
                            text: res,
                            icon: 'info',
                            confirmButtonText: 'OK',
                        });
            }
        }else{
            setRow(allUsers);
        }
    };

    ///const rowsOriginal = row.map((el) => el);
    const handleInput = (e) => {
        let res = [];
        setInput(e.target.value);
        if (e.target.value) {
            res = listFilter.filter((user) => user[e.target.name].includes(e.target.value));
            setRow(res);
        }
        else setRow(allUsers);
    }

    useEffect(() => {
        dispatch(getAllUsers(getToken()));

        return ()=>{
            clearStates ();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setRow(allUsers);
        // eslint-disable-next-line
    }, [allUsers])

    //FUNCIONES
    const clearStates = ()=>{
        dispatch(cleanAllUsers());
    }

    return ( 
        <div>
            <Navbar/>
                {
                    allUsers.length === 0 ? <CircularProgress/>
                    :
                    <div className={styleCrud.ctn}>
                        <h1>USERS</h1>
                        <div className={styleCrud.tablehead}>
                            <div className={styleCrud.add}>
                            <Button
                                variant="contained"
                                color="primary"
                                /* className={classes.button} */
                                startIcon={<PersonAddIcon />}
                                margin='dense'
                                onClick={handleClickOpen}
                                >
                                    Add User
                            </Button>
                            </div>
                            <div className={styleCrud.search}>
                                <label>Filters</label>
                                <FormControl label="Type">
                                    {/* <InputLabel>Type</InputLabel> */}
                                    <Select
                                        label="Type"
                                        className={styleCrud.select}
                                        fullWidth={true}
                                        variant='outlined'
                                        value={optionSelected}
                                        margin='dense'
                                        onChange={(e) => handleChangeSelectType(e)}
                                        
                                    >
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'name'} selected={true}>Name</MenuItem>
                                        <MenuItem value={'last_name'}>Last Name</MenuItem>
                                        <MenuItem value={'user_name'}>User Name</MenuItem>
                                        <MenuItem value={'store_id'}>Store</MenuItem>
                                        <MenuItem value={'profile'}>Profile</MenuItem>
                                        <MenuItem value={'email'}>Email</MenuItem>
                                    </Select>
                                </FormControl>

                                {   optionSelected === 'name' ||
                                    optionSelected === 'last_name' ||
                                    optionSelected === 'user_name' ||
                                    optionSelected === 'email' 
                                ? (
                                    <TextField
                                        variant="outlined"
                                        margin='dense'
                                        type='text'
                                        name={optionSelected}
                                        label={optionSelected}
                                        value={input}
                                        placeholder={`Enter ${optionSelected}`}
                                        onChange={(e) => handleInput(e)}
                                    />
                                    
                                )
                                :
                                optionSelected === 'store_id' ? (
                                    <FormControl>
                                        <Select
                                            inputProps={{
                                                style: { width: '177px' },
                                            }}
                                            label="Store"
                                            value={selectedStore}
                                            onChange={(e) =>
                                                handleChangeSelects(e)
                                            }
                                            name='store_id'
                                            variant='outlined'
                                            size='small'
                                            margin='dense'
                                        >
                                        <MenuItem value=''>
                                            <em>None</em>
                                        </MenuItem>
                                            {stores.map((item,i) => 
                                                <MenuItem key={i} 
                                                    value={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            )}   
                                        </Select>
                                    </FormControl>
                                )
                                :
                                optionSelected === 'profile' ? (
                                    <FormControl>
                                        <Select
                                            inputProps={{
                                                style: { width: '177px' },
                                            }}
                                            label="Profile"
                                            value={selectedProfile}
                                            onChange={(e)=>handleChangeSelects(e)}
                                            variant='outlined'
                                            size='small'
                                            margin='dense'
                                            name='profile'
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'supervisor'}>Supervisor</MenuItem>
                                        <MenuItem value={'cajero'}>Cashier</MenuItem>    
                                        </Select>
                                    </FormControl>
                                )
                                : optionSelected === '' ? null : null
                                }
                            </div>
                        </div>
                        <div className={styleCrud.table}>
                        <TableUsers 
                            row={row}  
                            type='usersCrud'
                            handleAction={handleAction}
                        />
                        </div>
                        <FormDialog
                            open={open}
                            handleClose={handleClose}
                            handleAction={handleAction}
                            allUsers={allUsers}
                        />
                    </div>
                }
        <Footer/>
        </div>
    );
}

export default Crud;