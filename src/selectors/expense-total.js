
//Se combinara map con reduce para calcular el total.
export default (expenses) => {
    /*Se usa map para retornar, para cada posición del arreglo, solamente la
    cantidad guardada de la propiedad 'amount' del objeto.
    Con cada posición del arreglo albergando el valor de amount, se reduce normalmente
    al retornar la suma del amount anterior y siguiente sin caer posibles errores
    al querer acceder a un campo del objeto y erróneamente retornar un objeto
    y no la cantidad de la suma, o viceversa.
    Al usar map y reduce, la posibilidad de errores al querer obtener una cantidad total
    disminuye al tratarse de un arreglo de objetos inicialmente.
    Se establece el valor inicial a 0
    */
    return expenses
        .map((expense) => expense.amount)
        .reduce((prevAmount, currentAmount) => prevAmount + currentAmount, 0);
};