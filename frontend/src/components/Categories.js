
import React, { useState,useEffect } from 'react';
import { Grid, Button, Message } from 'semantic-ui-react';
import { CategoryListURL } from '../constants';
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {

        const getCategories = async () => {
            await fetch(CategoryListURL, {})
                .then(resp => resp.json())
                .then(json_data => {
                    setCategories(json_data);
                })
                .catch(err => (
                    setError(error)
                ))
        }
        getCategories();
    }, [])

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h2>All Categories</h2>
                    {
                        error && <Message
                            error
                            header="Error!"
                            content={error}
                        />

                    }
                    {
                        categories !== null && categories.map((category, i) => {
                            return <div className='category-list' key={i}><a href="#">{category.name}</a></div>
                        })
                    }
                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}

export default Categories