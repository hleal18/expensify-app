import authReducer from '../../reducers/auth';

//Evalya que se devuelva el correcto estado para la accion the LOGIN.
test('should set uid for login', () => {
    //Se crea un uid, el objeto con la accion.
    const uid= 12345;
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(uid);
});

//Evalua que se devuelva el correcto estado para la accion de LOGOUT.
test('should clear uid for logout', () => {
    //Evalua que el reducer devuelva un objeto vacio cuando se
    //invoca la accion LOGOUT con un uid en el state.
    const uid = 12345;
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid }, action);
    expect(state).toEqual({});
});