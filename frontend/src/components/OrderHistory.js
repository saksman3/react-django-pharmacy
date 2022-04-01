import React from 'react';
import { Grid, Table } from 'semantic-ui-react';
import { useGlobalState } from '../state/provider';

const OrderHistory = () => {
    const [{ completeOrder }, { }] = useGlobalState();
    console.log(completeOrder)
    return (
        <Grid celled="internally">
            <Grid.Row>
                <Grid.Column>
                    {
                        completeOrder === undefined ? (<p>No Previous Orders</p>) : (
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
                                    <Table.Row>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>
                                        <Table.Cell></Table.Cell>

                                    </Table.Row>
                                </Table.Body>
                            </Table>


                        )
                    }

                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default OrderHistory