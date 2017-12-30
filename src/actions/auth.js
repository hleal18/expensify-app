//Se pondran las funciones o acciones necesarias que requieran
//gestionar el proceso de autenticacion con firebase por medio
//del proveedor google.

import { firebase, googleAuthProvider } from '../firebase/firebase';

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