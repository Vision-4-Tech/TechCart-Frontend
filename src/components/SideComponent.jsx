import React, {  useState } from 'react';
import { useParams, useSearchParams ,useNavigate} from 'react-router-dom';

import { Stack } from '@mui/material';
import { Categories } from './utils/constant';


const SideComponent = ({ selectedCategory, setSelectedCategory,state }) => {

  const navigate=useNavigate()
  const [searchParam, setSearchParam] = useSearchParams();
  const params=useParams();
  console.log(params)
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  
    // Get the current URL parameters
    const currentParams = Object.fromEntries(searchParam.entries());
    console.log("params",currentParams);
   
    navigate(`/${categoryName}` ,{state:state});
  
  };

  return (
    <Stack direction="row" sx={{ overflow: 'auto', height: { sx: 'auto', md: '95%' }, flexDirection: { sx: 'row', md: 'column' } }}>
      {Categories &&
        Categories.map((category) => (
          <button
            className='category-btn'
            style={{ background: category.name === params.text && '#fc1503', color: 'black' }}
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
          >
            <span style={{ color: category.name === selectedCategory ? 'black' : 'red', marginRight: '15px' }}></span>
            <span style={{ opacity: category.name === selectedCategory ? '1' : '0.8', color: category.name === selectedCategory ? 'white' : 'black' }}>
              {category.name}
            </span>
          </button>
        ))}
    </Stack>
  );
};

export default SideComponent;
