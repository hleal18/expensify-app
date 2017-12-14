import moment from 'moment';
//milliseconds are counting in milliseconds.
// 0 = January 1st 1970 (unix epoch) at midnight

//Get visible expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        ///Se obtiene una instancia del timestamp del expense evaluado.
        const createdAtMoment = moment(expense.createdAt);
        //Se compara para el comienzo y el final del filtro elegido mediante
        //isSameOfBefore con respecto al día.
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        //Se encarga de encontrar una coincidencia de el texto en la descripción.
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy == 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};