import React, { useState } from 'react';
import { FormGroup, Input, Button, Form, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin } from '../Redux/Action';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();

    const [formInput, setFormInput] = useState("");

    const logged = useSelector((state) => state.auth.isLogged);

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () => {
        dispatch(LoginAdmin(formInput));
    };

    if (logged) {
        return <Redirect to="/" />;
    }
    return (
        <React.Fragment>
            <h1 style={{'textAlign' : 'center'}}>Login</h1>
            <div className='d-flex justify-content-center' style={{height : '70vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={handleChange} />
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button color="primary" type='submit' onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
