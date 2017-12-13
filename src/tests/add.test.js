//Es tratado como un test file que será analizado por jest.
const add = (a, b) => a + b;

//Se tienen acceso a unas variables globales gracias jest y a la extension .test.
//Primero recibe una descripción de el test, luego la función que se ejecutará para ejecutar el test.
test('should add two numbers', () => {
    //Si no se tiran errores desde la prueba, se asume es correcta.
    const result = add(3, 4);
    //Si no se cumple hay un error en la implementación
    //En realidad se está creando un 'assertion'
    // if(result !== 7) {
    //     throw new Error(`You added 4 and 3. the resulta was ${result}. Expect 7`);
    // }
    //Se usan assertions
    expect(result).toBe(7);
});

const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should create a greeting with the correct name', () => {
    const result = generateGreeting('Humberto');
    expect(result).toBe('Hello Humberto!');
});

test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!')
})