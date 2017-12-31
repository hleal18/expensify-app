import { login, logout } from '../../actions/auth';

//Evalua que se retorna el objeto que describa la accion de LOGIN.
test('should generate action LOGIN object', () => {
    const uid = 12345;
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

//Evalua que se retorne el objeto que describa la accion de LOGOUT.
test('should generate LOGOUT action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});

