import React, { useState } from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from "semantic-ui-react";

const SearchBar = () => {
    const [searchValue,setSearchValue] = useState("");
    const handleUserInput = e =>{
       console.log(e.target.value)
       setSearchValue(e.target.value);
    }
    return (
  <div className='SearchBar'>
      <input className="searchInput" value={searchValue} onChange={handleUserInput} placeholder="Search Products"/>
  </div>
    )
}
export default SearchBar