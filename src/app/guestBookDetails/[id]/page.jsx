"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './guestBookDetails.css'

function Page({ params }) {
  const { id } = params; // URL에서 넘어온 id
  const [data, setData] = useState(null); // 초기값을 null로 설정
  const API_URL = `/guestbook/detail?gb_idx=${id}`;

  const getData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data); // 데이터를 직접 상태에 저장
    } catch (error) {
      console.error("API 요청 중 에러 발생: ", error);
    }
  };

  // 컴포넌트 마운트 시 한 번 실행
  useEffect(() => {
    getData();
  }, []);
  
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">GuestBookDetail</h2>
      <TableContainer component={Paper} className="table-container">
        <Table className="custom-table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">번호</TableCell>
              <TableCell className="table-header">이름</TableCell>
              <TableCell className="table-header">제목</TableCell>
              <TableCell className="table-header">내용</TableCell>
              <TableCell className="table-header">이메일</TableCell>
              <TableCell className="table-header">비밀번호</TableCell>
              <TableCell className="table-header">날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 단일 데이터 렌더링 */}
            <TableRow>
              <TableCell className="table-cell">{data.gb_idx}</TableCell>
              <TableCell className="table-cell">{data.gb_name}</TableCell>
              <TableCell className="table-cell">{data.gb_subject}</TableCell>
              <TableCell className="table-cell">{data.gb_content}</TableCell>
              <TableCell className="table-cell">{data.gb_email}</TableCell>
              <TableCell className="table-cell">{data.gb_pw}</TableCell>
              <TableCell className="table-cell">{data.gb_regdate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Page;
