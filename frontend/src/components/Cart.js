import React from 'react'
import { Grid, Divider, Table, Icon, Button, Link } from 'semantic-ui-react'
import { useGlobalState } from '../state/provider'

const Cart = () => {
    const [{ incompleteOrders }, { }] = useGlobalState();
    let cart_length = 0
    if (incompleteOrders !== null) {
        cart_length = incompleteOrders?.order_items.length
    }
    else {
        cart_length = 0
    }
    return (
        <Grid celled="internally" >
            <Grid.Row>
                <Grid.Column >
                    <h1>Cart</h1>
                    {
                        cart_length !== 0 ? (
                            <>
                                <Table striped>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>SN</Table.HeaderCell>
                                            <Table.HeaderCell>Product</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
                                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                                            <Table.HeaderCell>Subtotal</Table.HeaderCell>
                                            <Table.HeaderCell>Action</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {
                                            incompleteOrders.order_items.map((order_item, i) => {
                                                //console.log(item)
                                                return (
                                                    <Table.Row key={i}>
                                                        <Table.Cell>{i+1}</Table.Cell>
                                                        <Table.Cell>{order_item.item.title}</Table.Cell>
                                                        <Table.Cell>{order_item.item.price}</Table.Cell>
                                                        <Table.Cell>{order_item.quantity}</Table.Cell>
                                                        <Table.Cell>{order_item.subtotal}</Table.Cell>
                                                        <Table.Cell  >
                                                            <Button primary icon="plus"></Button>
                                                            <Button secondary icon="minus"></Button>
                                                            <Button color='red' icon="trash alternate"></Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            })

                                        }
                                    </Table.Body>
                                    
                                    <Table.Footer fullWidth>
                                        <Table.Row>
                                            <Table.HeaderCell className='' colSpan='4'>Total: </Table.HeaderCell>
                                            <Table.HeaderCell>{incompleteOrders?.total}</Table.HeaderCell>
                                            <Table.HeaderCell>
                                                <Button as="a" color="linkedin" href="#">Order Now</Button>
                                            </Table.HeaderCell>

                                        </Table.Row>
                                    </Table.Footer>
                                </Table>
                            </>
                        ) : (
                            <>
                                <div> No Items In Cart</div>
                            </>
                        )
                    }


                </Grid.Column>
            </Grid.Row>
            {/* <Divider /> */}
            <Grid.Row>
                 <Grid.Column>
                     <Button color='green' as="a" href="/order_history">Completed Orders</Button>
                 </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Cart