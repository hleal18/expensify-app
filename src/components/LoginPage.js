import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
    render(){
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expensify App</h1>
                    <p>It's time to get your expenses under control.</p>
                    <button onClick={this.props.startLogin}>Login</button>                
                </div>                
            </div>
        );
    }
};

//Se necesita despachar una acción.
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

