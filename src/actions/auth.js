//Se pondran las funciones o acciones necesarias que requieran
//gestionar el proceso de autenticacion con firebase por medio
//del proveedor google.

import { firebase, googleAuthProvider } from '../firebase/firebase';

//Acción para el inicio de sesion.
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});
//Funcion asincrona para iniciar el proceso de inicio de sesion.
export const startLogin = () => {
    return () => {
        //Se accede a las funcionalidades de firebase, auth.
        //Lo siguiente quiere decir que se va a inicar sesión
        //por medio del popup system, con una cuenta google.
        //Regresa un promise
        //El popup abre una ventanita emergente para elegir la cuenta
        //google
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

//Acción para el cierre de la sesión.
export const logout = () => ({
    type: 'LOGOUT'
});
//Funcion asincrona para el proceso de cerrar sesion.
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};