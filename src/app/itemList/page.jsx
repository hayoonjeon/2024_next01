"use client"
import React, { useEffect, useState } from 'react';
import './itemList.css';
import { Divider, Grid2 } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

function Page({params}) {
  const MAKEUP_API_BASE_URL = process.env.NEXT_PUBLIC_MAKEUP_API_BASE_URL;
  const [list, setList] = useState([]);//상품목록
  const [loading,setLoading] = useState(true);
  const [error,setError]=useState(null);
  //const API_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";
  const API_URL = `${MAKEUP_API_BASE_URL}/v1/products.json?brand=maybelline`;


  //데이터 가져오기
  const getData = async() => {
    try {
      setLoading(true);
      const response=await axios.get(API_URL);
      setList(response.data.slice(0,12));
    } catch (err) {
      console.error("Error Fetching data:",err)
      setError(err.message);
    }finally{
      setLoading(false);  //로딩종료
    }

  }
  useEffect(() => {
      getData();
  },[]);

  // 로딩 중
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  // 에러 발생 시
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

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