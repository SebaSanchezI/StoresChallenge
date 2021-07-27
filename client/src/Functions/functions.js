import Swal from 'sweetalert2';

//obtener token
export const getToken = ()=>{

    if(JSON.parse(sessionStorage.getItem('user'))){
        const {token} = JSON.parse(sessionStorage.getItem('user'));
        return token;
    }else{
        return null;
    }
}

//controla si existe un usuario antes de agregarlo o actualizarlo
export const userExists = (type,userWanted,allUsers)=>{

    let res;
    if (type === 'add'){
        res = allUsers.find(user => user.email === userWanted.email || user.user_name === userWanted.user_name);
    }else{
        //primero quito el usuario a actualizar de la lista
        const newAr = allUsers.filter(user => user.user_name !== userWanted.user_name);
        res = newAr.find(user => user.user_name === userWanted.user_name || user.email === userWanted.email);
    }
    
    return res;
}

//Alertas
//iconName puede ser: error, warning, success
export const CustomAlert = (title,iconName)=>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        width:'25%',
        background: iconName === 'error'? '#df1427':iconName ==='warning'?'#f87f03d9':'#2ca007',
        color:'#ffffff',
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        customClass: {
                    container: 'my-swal',
                    title:'my-title'
                }
    })
    Toast.fire({
        icon: `${iconName}`,
            title: `${title}`
    })
}
