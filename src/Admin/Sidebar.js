import React from 'react'
import {Stack} from '@mui/material'
import Content from './Content'
import { useParams, useSearchParams ,useNavigate} from 'react-router-dom';
import History from './History'
import Customer from './Customer'
import Inventory from './Inventory';
const Sidebar = ({selectedCategory,setSelectedCategory}) => {
  const navigate=useNavigate()
  const [searchParam, setSearchParam] = useSearchParams();
  const params=useParams();
  console.log(params)
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  
    // Get the current URL parameters
    const currentParams = Object.fromEntries(searchParam.entries());
    console.log("params",currentParams);
   
    navigate(`/Admin/${categoryName}`);
  
  };
    const items=[
        {name:"Dashboard"},
        {name:"Inventory"},
        {name:"Customers"},
        {name:'History'}
    ]
  return (
    <div className="flex md:flex-row flex-col h-full">
    <Stack  direction="row" sx={{ overflow: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection:{sx:'row',md:'column'} }} >
      {items && items.map(category => (
        
        <button className='category-btn' style={{background:category.name===params.text && '#fc1503',color:'white'}} key={category.name}  onClick={() => handleCategoryClick(category.name)}>
        
          <span style={{color:category.name===selectedCategory ? 'black':'red',marginRight:'15px'}}></span>
          <span style={{opacity:category.name===selectedCategory?'1':'0.8',color:category.name===selectedCategory ? 'white':'Black' }}>{category.name}</span>
        </button>
      ))}
      
    </Stack>

         <div style={{width:'80%',marginRight:'22px'}}> { params.text==="Dashboard" ? <Content selectedCategory={params.text}/>:params.text==="Customers"?<Customer/>:params.text==="Inventory"?<Inventory/>:<History/>}</div>
    </div>
  )
}

export default Sidebar