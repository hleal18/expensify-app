export default (state = {}, action) => {
    switch (action.type) {
        //Cuando se inicia sesion
        case 'LOGIN':
            //Se retorna un objeto con un campo con la uid.
            //Eso se guardará en el state del store de redux.
            return {
                uid: action.uid
            };
            break;
        case 'LOGOUT':
            //Retorna un objeto vacío, que implica que se cerró
            //sesión.
            return {};
            break;
        default:
            return state;
    }
};