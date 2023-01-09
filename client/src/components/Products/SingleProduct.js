import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import allPrd from '../../API/allproducts.json'
import { useParams } from 'react-router-dom';

export default function SingleProduct() {
  const param = useParams()
  console.log(param,"idd")

  return (
    <div>
    {allPrd.filter((itm=>itm.id === parseInt(param.id))).map((u)=>
      <Card key={u.id} sx={{ display: 'flex', justifyContent:'center',padding:"25px 0px", alignItems:'center' ,maxWidth:600, margin:'auto', width:'100%' }}>
      
        <CardMedia
          component="img"
          sx={{ width: '100%' }}
          image={u.img}
          alt=""
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto', padding:0, paddingBottom:'0px !important' }}>
              <h2 style={{margin : 0 ,paddingBottom:25}}>{u.prdName}</h2>

              <p style={{margin:0}}>{u.desc}</p>
          </CardContent>
        </Box>
      </Card>
    )}
    </div>
  );
}