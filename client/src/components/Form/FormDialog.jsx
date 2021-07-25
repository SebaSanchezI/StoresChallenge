import React from 'react';
import { useSelector} from 'react-redux';
import { useForm, Controller } from "react-hook-form";
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from '@material-ui/icons/Cancel';
import InputLabel from "@material-ui/core/InputLabel";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import Swal from 'sweetalert2';
//actions
import {addUser, updateUser} from '../../Redux/actions/users.actions';
import { getToken, userExists } from '../../Functions/functions';


export default function FormDialog({ open, handleClose,handleAction,dataUser={} }) {

    const { reset,handleSubmit, control } = useForm();
    //variable que uso para cargar el select con las tiendas existentes
    const stores = useSelector(store => store.storeReducer.stores);
    const allUsers = useSelector(store => store.userReducer.allUsers);

    const onSubmit = async (data) => {
        //refactorizar
        //pasar un objeto
        console.log('data',data)
        let res;
        let wanted;
        let alert;
        data={...data,id:dataUser.id}
        console.log('data2',data)
        //
        if(Object.keys(dataUser).length === 0){
            //se ingresa un usuario nuevo
            wanted  = userExists('add',data,allUsers);
            if (wanted){
                //existe
                if(wanted.email === data.email) alert = 'EMAIL';
                else alert = 'USER NAME';
                
                Swal.fire({
                title: `Warning!`,
                text: `${alert} already exist.`,
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    container: 'my-swal'
                }
            });
            }else{
                res = await addUser(getToken(),data);
                handleClose(false);
                reset();
                handleAction(res);
            }
        }else{ //modificacion de usuario
            wanted  = userExists('add',data,allUsers);
            if (wanted){
                if(wanted.email === data.email) alert = 'EMAIL';
                else alert = 'USER NAME';
                Swal.fire({
                    title: `Warning!`,
                    text: `${alert} already exist.`,
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    customClass: {
                        container: 'my-swal'
                    }
                });
            }else{
                res = await updateUser(getToken(),data);
                handleClose(false);
                reset();
                handleAction(res);
            }
            
        }
    };

    const Reset = (e)=>{
        handleClose(false);
        reset();
    }
    //
  return (
    <div>
    <Dialog   
        open={open}  
        aria-labelledby="form-dialog-title"
        fullWidth={true}
    >
        <DialogTitle id="form-dialog-title">USER FORM</DialogTitle>
        <DialogContent>
            <DialogContentText>
            {`Enter the data of the user you want to ${Object.keys(dataUser).length === 0 ? 'add' : 'update'}` }
            </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)} /* className={classes.form} */>
                    <div>
                        {Object.keys(dataUser).length !== 0 ? 
                            <Controller
                                name="id"
                                control={control}
                                /* defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.id : null} */
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="ID"
                                    variant="outlined"
                                    margin='dense'
                                    value={dataUser.id}
                                    onChange={onChange}
                                    defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.id : null}
                                    fullWidth={true}
                                    disabled={true}
                                />
                                )}
                            />
                        : 
                        null
                        }
                        
                        <Controller
                        name="name"
                        control={control}
                        /* defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.name : null}  */
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Name"
                            error={!!error}
                            variant="outlined"
                            margin='dense'
                            placeholder='Enter name'
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                            fullWidth={true}
                            defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.name : null}
                        />
                        )}
                        rules={ {   required: "Name name is required.",
                                    minLength:{ value:3, message:'the minimum of characters is 3'},
                                    pattern: {value:/^[A-Za-z\s]+$/g, message:'Name cannot contain numbers'}
                                }
                        }
                        />
                    </div>
                    <div>
                    <Controller
                        key={"last_name"}
                        name="last_name"
                        control={control}
                        defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.last_name : null}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Last Name"
                            error={!!error}
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            fullWidth={true}
                            margin='dense'
                            placeholder='Enter lastname'
                            defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.last_name : null}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={ {   required: "Last name is required.",
                                    minLength:{ value:3, message:'the minimum of characters is 3'},
                                    pattern: {value:/^[A-Za-z\s]+$/g, message:'Lastname cannot contain numbers'}
                                }
                        }
                    />
                    </div>
                    <div>
                    <Controller
                        name="profile"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FormControl 
                        variant="outlined" 
                        fullWidth={true} 
                        margin='dense'
                    >
                        <InputLabel>Profile</InputLabel>
                        <Select
                        label="Profile"
                        error={!!error}
                        value={value}
                        onChange={onChange}
                        margin='dense'
                        defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.profile: ''}
                        >
                        <MenuItem value="none">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={'supervisor'}>Supervisor</MenuItem>
                        <MenuItem value={'cajero'}>Cashier</MenuItem>
                        </Select>
                    </FormControl>
                    )}
                    rules={{ required: "Profile is required" }}
                    />
                    </div>
                    <div>
                    <Controller
                        name="store_id"
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl 
                            variant="outlined" 
                            fullWidth={true} 
                            margin='dense'
                        >
                        <InputLabel>Store</InputLabel>
                        <Select
                        label="Store"
                        error={!!error}
                        value={value}
                        onChange={onChange}
                        margin='dense'
                        defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.store_id : ''}
                        >
                        <MenuItem value=''>
                            <em>All</em>
                        </MenuItem>
                            {stores.map((item,i) => 
                                <MenuItem key={i} value={item.id}>
                                    {item.id + ' - ' + item.name}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    )}
                    rules={{ required: "Store is required" }}
                    />
                    </div>
                    <div>
                    <Controller
                        name="user_name"
                        control={control}
                        /* defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.user_name : null} */
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="User Name"
                            error={!!error}
                            variant="outlined"
                            margin='dense'
                            placeholder='Enter user name'
                            helperText={error ? error.message : null}
                            fullWidth={true} 
                            value={value}
                            onChange={onChange}
                            defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.user_name : null}
                        />
                        )}
                        rules={{ required: "User name required" }}
                    />
                    </div>
                    <div>
                    <Controller
                        name="email"
                        control={control}
                        /* defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.email : null} */
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Email"
                            error={!!error}
                            variant="outlined"
                            margin='dense'
                            placeholder='Enter email'
                            helperText={error ? error.message : null}
                            fullWidth={true} 
                            value={value}
                            onChange={onChange}
                            defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.email : null}
                            type="email"
                        />
                        )}
                        rules={{ required: "Email is required" }}
                    />
                    </div>
                    <div>
                    {Object.keys(dataUser).length === 0 ?
                    <Controller
                        name="password"
                        control={control}
                        /* defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.password : null} */
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Password"
                            error={!!error}
                            variant="outlined"
                            margin='dense'
                            placeholder='Enter password'
                            helperText={error ? error.message : null}
                            fullWidth={true} 
                            value={value}
                            onChange={onChange}
                            defaultValue={Object.keys(dataUser).length !== 0 ? dataUser.password : null}
                        />
                        )}

                        rules={{ required: "Password required",
                                minLength: {value:6, message:'The minimum of characters is 6.' }}}
                    />
                    :null
                    }
                    </div>
                    <div>
                         <DialogActions>
                        <Button
                                variant="contained"
                                color="primary"
                                /* className={classes.button} */
                                startIcon={<CloudUploadIcon />}
                                type="submit"
                                margin='dense'
                                >
                                    {`${Object.keys(dataUser).length === 0 ? 'Add' : 'Update'} user` }
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                /* className={classes.button} */
                                startIcon={<CancelIcon />}
                                margin='dense'
                                onClick={Reset}
                                >
                                    Cancel
                            </Button>
                        </DialogActions>
                    </div>
                </form>
                   
                        
                
            
            </DialogContent>
      </Dialog>
    </div>
  );
}