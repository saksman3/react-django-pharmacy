import React, { useEffect, useState } from 'react';
import { Grid, Container, Form, Button, Checkbox, Segment, Header, Icon, Modal } from 'semantic-ui-react';
import { useGlobalState } from '../state/provider';

const Profile = () => {
  const [{ profile }, { }] = useGlobalState();
  const [email, setEmail] = useState(profile.user.email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  return (
    <Grid className='profile-container'
      textAlign="center"
      style={{ height: "700px" }}
      verticalAlign="middle"
    ><Grid.Column
      style={{ maxWidth: 550 }}
    >            <Header as="h2" color="black" textAlign="center">
          Edit Account <Icon name="edit" />
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              name="username"
              fluid
              value={email}
              type=""
              icon="mail"
              iconPosition="left"
              placeholder="email"
              onChange={handleEmailChange}

            />
            <Form.Input
              name="username"
              fluid

              icon="user"
              iconPosition="left"
              placeholder="Username"

            />
            <Button type='submit' color='black'>Submit</Button>
          </Segment>
        </Form>
        
      </Grid.Column>

    </Grid>
  )
}

export default Profile