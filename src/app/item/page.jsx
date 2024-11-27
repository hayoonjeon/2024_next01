import { Button } from '@mui/material';
import React from 'react';

function Page({ item }) {
  const {
    id, name, price, image_link, description, category, product_type
  } = item;
  return (
    <>
      <div className='wrap'>
        <div className='img_itemimg'>
          <img src={image_link} alt={name} width={300} height={300} />
        </div>
        <div className='info_item'>
          <strong className='tit_item'>{name}</strong>
          <strong className='num_price'>${price}</strong>
          <span className='txt_info'>
            {category ? `${category}/` : ""}{product_type}
          </span>
          <Button variant='contained' color='success'>구매하기</Button>
          <Button variant='contained' color='error'>취소하기</Button>
        </div>
        <div className='disWrap'>
          <hr />
          <h1 style={{margin:"20px"}}>Description</h1>
          <div style={{paddingBottom:"20px",fontSize:"24px"}}>{description}</div>
        </div>
      </div>
    </>
  );
}

export default Page;