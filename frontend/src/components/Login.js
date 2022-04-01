import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";
const Login = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleUserInput = e => {
        setUsername(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const user = JSON.stringify({
            username,
            password
        })
        console.log(user)
        fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: user
        }).then(res => res.json()).then(results_json => {
                
                const token = results_json.token
                console.log(results_json);
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                window.localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                window.location.replace("/products")
                
            }).catch(error => {
                console.log(error[0]);
            })

}
return (
    <Grid
        textAlign="center"
        style={{ height: "700px" }}
        verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
                Log-in to your account
            </Header>
            <Form size='large' onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input
                        name="username"
                        fluid
                        value={username}
                        icon="user"
                        iconPosition="left"
                        placeholder="Username"
                        onChange={handleUserInput}
                    />
                    <Form.Input
                        onChange={handlePassword}
                        fluid
                        value={password}
                        name="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                    />
                    <Button
                        color="black"
                        size="large"
                    >
                        Login
                    </Button>
                </Segment>
            </Form>
            <Message>New to us? <NavLink to="/signup">Sign Up</NavLink></Message>
        </Grid.Column>

    </Grid>
);
}
export default Login;