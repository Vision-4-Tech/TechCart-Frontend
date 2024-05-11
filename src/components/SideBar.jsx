import React from 'react'
import {useState,useEffect} from 'react'
import { Typography,Box,Stack } from '@mui/material'
import SideComponent from './SideComponent'
import ItemCard from './ItemCard'
import Account from './Account'
import Hero from './Hero'
import { useParams } from 'react-router-dom'
const SideBar = ({state}) => {
    const [selectedCategory,setSelectedCategory] = useState('Home');
    const params=useParams();
    
  return (
    <Stack sx={{flexDirection:{sx:"column",md:'row',background:'white'}}} className='border-t-2'>
       <Box sx={{height:{sx:'auto',md:'92vh'},borderRight:'1px solid #3d3d3d',px:{sx:0,md:2}}}>
        <SideComponent selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} state={state}/>
      
       
       </Box>
       <Box p={2} sx={{overflowY:'auto',height:'90vh',flex:2}}>
         <Typography style={{color:'#f31503'}} variant='h4' fontWeight="bold" mb={2} sx={{color:'black'}}>{params.text}</Typography>
       
        {params.text === 'Home' ? <Hero />:params.text==='Account'?<Account />:<ItemCard />}
       
          
       </Box>


       
    </Stack>
  )
}

export default SideBar