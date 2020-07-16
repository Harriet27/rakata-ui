import React, { useState } from 'react';
import { FormGroup, Input, Button, Form, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin } from '../Redux/Action';
import { Redirect } from 'react-router-dom';
import profile from '../Components/assets/pp2.png';

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
    console.log(formInput);

    const handleLogin = () => {
        dispatch(LoginAdmin(formInput));
    };

    if (logged) {
        return <Redirect to="/dashboard" />;
    }
    console.log(logged);
    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <img src={`${profile}`} alt='profile img' height='120px' width='120px' style={{marginTop: '80px'}} />
            </div>
            <div className='d-flex justify-content-center' style={{alignItems : 'center'}}>
                <Form style={{width : '400px', height: '205px'}}>
                    <FormGroup>
                        <Label for="examplePassword">Enter Password</Label>
                        <Input type="password" name="password" placeholder="Password" onChange={handleChange} autoComplete="on" />
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button outline color='primary' type='submit' onClick={handleLogin} style={{borderRadius: '50px', padding: '12px'}}>
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
