import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ItemDetailURL, CategoryListURL } from '../constants';
import { Container, Image, Segment, Grid, Button, Icon, Card } from 'semantic-ui-react';
import RelatedItems from './RelatedItems';
import ProductItem from './ProductItem';

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState();
    const [matchedItems, setItems] = useState([]);
    
    useEffect(() => {
        const getData = async () => {
            await fetch(`${ItemDetailURL}${id}/`).then(res => res.json()).then(json_data => {
                setItem(json_data);
                
                console.log(json_data.category);
                getCategoryData(json_data.category);
                /*                const match = products.filter(product => {
                                    //returns all products falling in the same category as the currently viewed item.
                                   return product.category.id === json_data.category.id && product.title !==json_data.title
                               }); */
                /* setItems(match); */
            }).catch(err => {

                setError(err);
            })
        }
        getData();

    }, [id]);
    const getCategoryData = async (id) => {
        await fetch(`${CategoryListURL}${id}`)
            .then(response => response.json())
            .then(json_response => {
                setItems(json_response[0].category_items);
            })
            .catch(err => {
                setError(err)
            });
    }

    return (
        <Container textAlign='left' className='itemDetailsContainer'>
            <Grid columns={2} stackable>
                <Grid.Column>
                    <Image src={item.image} size='large' />
                </Grid.Column>
                <Grid.Column>
                    <h1>{item.title}</h1>
                    <hr />
                    <p className='desc'>{item.description}</p>
                    <hr />
                    <p className='price'><del>R{item.price}</del> R{item.price}</p>
                    <div className='actionButtons'>
                        <Button size='medium' basic className='cart'>
                            <Icon name="cart plus" />
                        </Button>
                        <Button size='medium' className='heart' basic>
                            <Icon name="heart" />
                        </Button>
                        <Button size='medium' basic className='share'>
                            <Icon name="share alternate" />
                        </Button>

                    </div>

                </Grid.Column>
            </Grid>
            <hr />
            {'\u00A0'}
            <Grid className='RelatedItems'>
                <Grid.Row>
                    <h1>Related Items</h1>
                </Grid.Row>
                <Card.Group>
                    { 
                        matchedItems !== null && matchedItems?.map((product, i) => {
                            return <ProductItem product={product} key={i} />
                        })
                
                    }
                    </Card.Group>
               
            </Grid>
        </Container>

    )
}

export default ItemDetails;

{/* <div className='ItemDetails'>
<h1>{item.title}</h1>
<Image src={item.image} size='large'  />
<p>{item.description}</p>
<button>Add To Cart</button>
</div> 


         /* (<Grid.Row>
                    <Grid.Column>
                        <RelatedItems related={matchedItems} />
                    </Grid.Column>
                </Grid.Row>) 
*/}