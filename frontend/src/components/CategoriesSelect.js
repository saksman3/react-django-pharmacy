import React from 'react';
import { Select } from 'semantic-ui-react';

const CategoriesSelect = ({categories, handleSelect}) => {
  /* console.log(categories); */
    const cats = categories.map(category =>{
        return {text:category.name, value:category.name, key:category.id}
    });
    
    const handleOnselect = (e) =>{
        const cat = categories.find(category=>{
          return category.name ===e.target.innerText
        })
      handleSelect(cat.id);
      /* console.log(e) */
    }
  return (
    <Select placeholder='Categories' options={cats} onChange={handleOnselect}/>
  )
}

export default CategoriesSelect