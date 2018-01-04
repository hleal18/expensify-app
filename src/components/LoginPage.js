import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export class LoginPage extends React.Component {
    onGoogleStartLogin = () => {
        this.props.startLogin('google');
    };
    onGithubStartLogin = () => {
        this.props.startLogin('github');
    };
    render(){
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Expensify</h1>
                    <p>It's time to get your expenses under control.</p>
                    <button className="button" onClick={this.onGoogleStartLogin}>Login with google</button>
                    <button className="button" onClick={this.onGithubStartLogin}>Login with github</button>
                </div>                
            </div>
        );
    }
};

//Se necesita despachar una acción.
const mapDispatchToProps = (dispatch) => ({
    startLogin: (providerName) => dispatch(startLogin(providerName))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

