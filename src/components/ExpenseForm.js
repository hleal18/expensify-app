import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

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
    constructor(props){
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    
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
        //se fuerza que haya por lo menos un numero antes del punto decimal.
        //tambien se permite que el usuario borre toda la cantidad.
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => {
        if(createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }))
    };
    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.description || !this.state.amount) {
            //Set error state equal to 'Please provide description and amount.'
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        } else {
            //Clear the error
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount),
                note: this.state.note,
                //Se le pasa el timestamp. No el objeto moment.
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
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

//Una vez terminada la implementación del componente y sus estados queda incluir la conexión
//con los datos de redux.
//Debido a que este componente será reutilizado, no combiene usarlo aquí sino en los componentes
//que se beneficiarán de éste.

export default ExpenseForm;
