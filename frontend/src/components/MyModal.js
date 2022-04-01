import React, { useState } from 'react';
import { Modal, Icon, Header, Button, Form, Segment, Image, Message } from 'semantic-ui-react';
import { useGlobalState } from '../state/provider';
import { localhost, updateProfileURL, header,ProfileImageUpdateURL,formDataHeader } from '../constants';

const MyModal = ({ handleOpenClose }) => {
    const [{ profile, error }, dispatch] = useGlobalState();
    const [open, setOpen] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [firstname, setFirstName] = useState(profile.user.first_name);
    const [LastName, setLastName] = useState(profile.user.last_name)
    const [Email, setEmail] = useState(profile.user.email)
    const [Username, setUsername] = useState(profile.user.username)
    const [ImageFile, setImageFile] = useState(null)
    


    const updateProfile = async () => {
        const frm = new FormData()
        console.log(frm);
        frm.set('iamge',"some dummy data")
        console.log(frm)
        const UpdatedUserData = JSON.stringify({
            "username": Username,
            "first_name": firstname,
            "last_name": LastName,
            "email": Email
            /* "image":ImageFile */

        });
        console.log(UpdatedUserData);
        await fetch(updateProfileURL, {
            method: 'POST',
            headers: header,
            body: UpdatedUserData
        })
            .then(response => response.json())
            .then(json_response => {
                console.log(json_response)
                dispatch({
                    type: "RELOAD_PAGE",
                    pageReload: json_response
                })
            })
            .catch(err => {
                console.log(err)
            })
        setEditOpen(false)
    }
    const handleClose = () => {
        setOpen(false);
        handleOpenClose(open)
    }
    const handleOpen = () => {
        setOpen(true)
        handleOpenClose(open)
    }
    const handleUpload = async()=>{
        // handle image upload.
        const form_data = new FormData()
        form_data.append("image",ImageFile) //add a new object to the form data object
        
        await fetch(ProfileImageUpdateURL,{
            method: 'POST',
            headers: formDataHeader, 
            body: form_data      
        }).then(resp=>resp.json()).then(json_data=>{
            console.log("Results", json_data.error)
            if (!json_data.error){
                dispatch({
                    type:"PAGE_RELOAD",
                    pageReload: json_data
    
                });
               }
        }).catch(err=>console.log(err))
    }
    return (
        <Modal
            onClose={handleClose}
            onOpen={handleOpen}
            dimmer="blurring"
            open={open}
            closeIcon
            size='tiny'
            closeOnDocumentClick={false}
            closeOnDimmerClick={false}
        >
            <Modal.Header>
                <p><Icon name="user"></Icon>{profile.user.username}</p>
            </Modal.Header>
            <Modal.Content image>
                <Image size='small' src={`${localhost}${profile.image}`} />
                <Modal.Description style={{ textItems: "left", paddingLeft: "2px", paddingTop: "20px", width: "100%", verticalAlign: "middle", heigh: "100%" }}>
                    <Header>
                        <p style={{ marginBottom: 0 }}> {firstname} {LastName}</p>
                        <p style={{ fontSize: "15px", margin: 0 }}><Icon name="mail">{Email}</Icon></p>

                    </Header>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={handleClose}>Close</Button>
                <Button onClick={() => setEditOpen(true)}><Icon name="edit"></Icon>Edit</Button>
            </Modal.Actions>
            <Modal
                onClose={() => setEditOpen(false)}
                open={editOpen}
                size='tiny'
                closeIcon
            >
                <Modal.Header>Editing Profile</Modal.Header>
                <Modal.Content>
                    {
                        error&&(
                            <Message
                            error
                            header="Error!"
                            content={error}
                        />
                        )
                    }
                    <Form>
                        <Segment>
                            <Form.Input
                                name="username"
                                fluid
                                value={Username}
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Input
                                name="FirstName"
                                fluid
                                value={firstname}
                                icon="user"
                                iconPosition="left"
                                placeholder="First Name"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setFirstName(e.target.value)
                                }}
                            />
                            <Form.Input
                                name="LastName"
                                fluid
                                value={LastName}
                                icon="user"
                                iconPosition="left"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <Form.Group>
                                <Form.Input
                                    onChange={(e) => setImageFile(e.target.files[0])}

                                    /* value={password} */
                                    name="file"
                                    icon="file"
                                    iconPosition="left"
                                    type="file"

                                />
                                {/* <Form.Field control={Button}  onClick={handleUpload}> */}
                                <Button size="small" className='uploadbutton' onClick={handleUpload} disabled={ImageFile?false:true}>Upload</Button>
                                {/* </Form.Field> */}
                                
                            </Form.Group>
                            <Form.Input
                                onChange={(e) => setEmail(e.target.value)}
                                fluid
                                value={Email}
                                name="mail"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                type="email"
                            />
                        </Segment>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        icon='delete'
                        content='Cancel'
                        onClick={() => setEditOpen(false)}
                        color="red"
                    />
                    <Button
                        icon='check'
                        content='Save'
                        onClick={updateProfile}
                        color="green"
                    />

                </Modal.Actions>
            </Modal>
        </Modal>
    )
}

export default MyModal

