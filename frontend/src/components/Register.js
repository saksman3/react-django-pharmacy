import React, { useState } from 'react'
/* import PhoneInput from 'react-phone-input-2' */
/* import 'react-phone-input-2/lib/style.css' */
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";
import { NavLink } from 'react-router-dom';

const Register = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState();
    const handleInputChange = e => {
        const name = e.target.name;
        console.log(name);
        switch (name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password1':
                setPassword1(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                console.log("error")
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/rest-auth/registration/', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                username, email, password1, password2
            })

        }).then(res => res.json()).then(data => {
            const token = data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationDate", expirationDate);
            window.location.replace("/");
        }).catch(e => {
            console.log(e);
        });
    }
    const handlePhone = (Phone)=>{
        console.log(Phone)
        setPhone(phone)
    }
    return (
        <Grid textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle">
            <Grid.Column
                style={{ maxWidth: 400 }}

            >
                <Header as="h2" color="black" textAlign="center">
                    Signup to your account
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            value={username}
                            name="username"
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            value={email}
                            name="email"
                            fluid
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email address"
                            onChange={handleInputChange}
                        />
                        <Form.Input
                            value={password1}
                            name="password1"
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type='password'
                            onChange={handleInputChange}
                        />

                        <Form.Input
                            value={password2}
                            name="password2"
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="confirm password"
                            type="password"
                            onChange={handleInputChange}
                        />
                        {/* <PhoneInput
                            country={'za'}
                            value={phone}
                            onChange={phone =>handlePhone(phone)}
                        /> */}
                        <Button color="black"
                            size='large'

                        >Register</Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <NavLink to="/login">Login</NavLink>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register;