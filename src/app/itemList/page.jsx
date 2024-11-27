"use client"
import React, { useEffect, useState } from 'react';
import './itemList.css';
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

function Page(props) {
  const [list, setList] = useState([]);
  //const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
  const API_URL = "/makeup/v1/products.json?brand=maybelline"
  const getData = () => {
    axios.get(
      API_URL
    )
      .then(res => {
        console.log(res.data)
        setList(res.data.slice(0,12));
      })
      .catch(
        console.log("에러발생")
      )
  }
  //최초 1번만 실행
  useEffect(() => {
    getData();
  }, [])
  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <h2>베스트 상품</h2>
      <Divider />
      <Grid2 container spacing={2}>
        {list.map(k => {
          return (
            // size={xs: 3} => 전체 12의 3칸을 차지한다 (한줄에 4개)

            <Grid2 key={k.id} size={{xs:3}}>
              <Link href={"/view/"+k.id}><img src={k.image_link} alt="image" width={100} height={100}/>
                <strong>{k.name}</strong>
                <span className='txt_info'>{k.category} &nbsp; &nbsp;  {k.product_type}</span>
                <strong className='num_price'>{k.price}</strong></Link>
            </Grid2>
          )
        })}
      </Grid2>
    </div>
  );
}

export default Page;