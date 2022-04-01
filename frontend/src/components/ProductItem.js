import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
/* import {localhost}  from '../constants' */

const ProductItem = ({ product }) => (
  <Card className='Card-style'>
    <a href={`/item_detail/${product.id}`}><Image src={product.image} wrapped ui={false} /></a>
    <Card.Content>
      <Card.Header>{product.title}</Card.Header>
      <Card.Meta>
      <Card.Description>{(product.description).substring(0,30)}...<a href={`/item_detail/${product.id}`}>more</a></Card.Description>
      </Card.Meta>
      <Card.Description>
      R{product.price}
      </Card.Description>
      <div className='ui two buttons'>
        <Button basic basic size='mini' color='red'>
          View
        </Button>
        <Button size='mini' animated='vertical' basic color='red'>
          <Button.Content hidden>Add To Cart</Button.Content>
          <Button.Content visible>
            <Icon name='cart plus' />
          </Button.Content>
        </Button>
      </div>
 {/*      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description> */}
    </Card.Content>
    {/*<Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='green' size='mini'>
          View
        </Button>
        <Button size='mini' animated='vertical'>
          <Button.Content hidden>Add To Cart</Button.Content>
          <Button.Content visible>
            <Icon name='cart plus' />
          </Button.Content>
        </Button>
      </div>

    </Card.Content>*/}

  </Card>
)

export default ProductItem;

{/* <Image src={`${localhost}${product.image}`} */}