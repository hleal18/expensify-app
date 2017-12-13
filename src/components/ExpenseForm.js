import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
//El css relacionado con el singledatepicker.
import 'react-dates/lib/css/_datepicker.css';

// Se recibe una instancia de moment.
// tiene el momento actual.
// const now = moment();
// imprime el objeto
// console.log(now);
// imprime la fecha en formato
// console.log(now.format());
// imprime el mes recortado.
// console.log(now.format('MMM'));
// imprime el mes recortado con el dia del mes.
// console.log(now.format('MMM Do'));
// imprime el mes recortado con el dia del mes y el año en cuatro digitos.
// console.log(now.format('MMM Do, YYYY'));


//Se busca aprovechar el estado interno del componente de los datos de los inputs
//y cuando se haya finalizado, esos datos del estado, se guardarán en redux mediante
//el nuevo expense.
class ExpenseForm extends Component {
    state = {
        description: '',
        amount: '',
        note: '',
        createdAt: moment(),
        calendarFocused: false
    };
    //Se enlaza la descripción del estado con la que escribe el usuario.
    //se mantiene guardado el estado en todo momento.
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    //Se busca que para el input de amount, se acepten numeros de hasta dos decimales
    //nada más.
    onAmountChange = (e) => {
        const amount = e.target.value;
        //Se usa una expresión regular. (regular expressiones)
        //es un tema grande a consultar.
        //Se busca la documentación en regex101.com
        if (amount.match(/^\d*(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        this.setState(() => ({ createdAt }));
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };
    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add expense</button>
                </form>
            </div>
        );
    }
}

export default ExpenseForm;
