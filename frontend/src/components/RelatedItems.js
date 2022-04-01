import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import {localhost}  from '../constants'
const RelatedItems = ({ related }) => {
    return (
        <Card.Group>
             {
                         related.map(item=>{
                             console.log(item.image)
                             return (
                                <Card>
                                <Card.Content>
                                    <Image
                                        floated='right'
                                        size='small'
                                        src={`${localhost}${item.image}`}
                                    />
                                    <Card.Header>{item.title}</Card.Header>
                                    <Card.Meta>Price: {item.price}</Card.Meta>
                                    <Card.Description>
                                        {(item.description).substring(0,50)}...<a href={`/item_detail/${item.id}`}>more</a>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div className='ui two buttons'>
                                        <Button basic color='green'>
                                            Details
                                        </Button>
                                        <Button basic color='red'>
                                            <Icon name="cart plus"/>
                                        </Button>
                                    </div>
                                </Card.Content>
                            </Card>
                             )
                        })
             }
        </Card.Group>

    )

}

export default RelatedItems