import React, { useState, useEffect,createRef } from 'react'
import { Button,Grid, Card, Container, Icon, Image, Item, Label, Message, Dimmer, Segment, Loader } from 'semantic-ui-react';
import { ProductListURL,CategoryListURL } from '../constants';
import ProductItem from './ProductItem';
import Categories from './Categories';
import Pagination from './Pagination';
import CategoriesSelect from './CategoriesSelect';
import SearchBar from "./SearchBar";;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");
    const [totalOnPage, setTotalOnPage] = useState(0);
    const [categories,setCategories] = useState([]);
    const node = createRef();
    useEffect(() => {

        setLoading(true);
        // fetch products
        fetch(ProductListURL, {
            method: "GET",

        }).then(res => res.json()).then(json_d => {
            setLoading(false)
            /* console.log(json_d) */
            setProducts(json_d.results);
            localStorage.setItem("products",JSON.stringify(json_d.results));
            setTotalOnPage(json_d.count);
            if (json_d.next) {
                setNextPage(json_d.next);
            }
            if (json_d.previous) {
                setPrevPage(json_d.previous);
            }

        }).catch(err => {
            setLoading(false);
            setError(err);
        });

        fetch(CategoryListURL,{}).then(res=>res.json()).then(jsonData=>{
            setCategories(jsonData);
        }).catch(err=>{
            setLoading(false);
            setError(err);
        });
    }, []);
    const handleSelect = (select)=>{
        console.log(select)
        console.log(products)
        const selected = products.filter(product=>{
            
            return product.category === select;
        });
        console.log(selected);
    }
    const handlePrevPage = ()=>{
        console.log("Previous");
        fetch(prevPage).then(response=>response.json()).then(json_response=>{
            setLoading(false);
            setProducts(json_response.results);
            setNextPage("");
            setPrevPage("");
            if (json_response.next) {
                setNextPage(json_response.next);
            }
            if (json_response.previous) {
                setPrevPage(json_response.previous);
            }
        }).catch(err=>{
            setError(err);
        });

    }
    const handleNextPage = ()=>{
        console.log("Next");
        
        setLoading(true);
        fetch(nextPage).then(response=>response.json()).then(json_response=>{
            setLoading(false);
            setProducts(json_response.results);
            setNextPage("");
            setPrevPage("");
            if (json_response.next) {
                setNextPage(json_response.next);
            }
            if (json_response.previous) {
                setPrevPage(json_response.previous);
            }
        }).catch(err=>{
            setError(err);
        });
    }
    
    return (
        <Grid celled="internally"> 
            {error && (
                <Message
                    error
                    header="Error!"
                    content={error}
                />
            )}
            {
                loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>
                    </Segment>
                )
            }
            <Grid.Row>
                
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
            {
                
                    <div className='product_list_actions'>
                        <button name="prevPage" disabled={prevPage.length===0} className='navbutton' onClick={handlePrevPage}><Icon name="arrow left"/></button>
                        <button name="nextPage" disabled={nextPage.length===0} className='navbutton' onClick={handleNextPage}><Icon name="arrow right"/></button>
                        
                        {/* <Pagination className="pagination" total={totalOnPage/9} /> */}
                        <CategoriesSelect categories={categories} handleSelect={handleSelect}/>
                    </div >

                
            }
            <Card.Group >
                {
                    products.map((product, i) => {
                        return (<ProductItem product={product} key={i} />)
                    })
                }

            </Card.Group>
            </Grid.Column>
            <Grid.Column width={3}><Categories/> </Grid.Column>
            </Grid.Row>
        </Grid>

    )
}

export default ProductList