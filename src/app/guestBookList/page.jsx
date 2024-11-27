"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './guestBookList.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';

function page(props) {
  const [list, setList] = useState([]);
  const API_URL = "http://localhost:8080/api/guestbook/list";
  const getData = () => {
    axios.get(
      API_URL
    )
      .then(res => {
        setList(res.data.slice(0,12));
        console.log(res.data);
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
    <>
     <h2 className="title">GuestBookList</h2>
            <TableContainer component={Paper} className="table-container">
                <Table className="custom-table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header">이름</TableCell>
                            <TableCell className="table-header">제목</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item) => (
                            <TableRow key={item.gb_idx}>
                                <TableCell className="table-cell">{item.gb_name}</TableCell>
                                <TableCell className="table-cell">
                                    <Link href={`/guestBookDetails/${item.gb_idx}`}>{item.gb_subject}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    </>
  );
}

export default page;