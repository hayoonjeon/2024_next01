"use client";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import './guestBookDetails.css';
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';


function Page({ params }) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const [item, setItem] = useState(null); // 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const { isAuthenticated, token } = useAuthStore();     //로그인 상태
  const router = useRouter();


  // 컴포넌트 마운트 시 한 번 실행
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 시작
        // params 언래핑: Promise로 감싸진 값을 꺼내는 과정
        // Promise.resolve(params)의 역할
        // Promise.resolve()는 전달된 값을 Promise 객체로 변환합니다.
        // 만약 params가 이미 Promise라면, 원래 Promise를 반환합니다.
        // 만약 params가 일반 객체라면, 이를 즉시 해결된(resolved) Promise로 감쌉니다.
        // Promise인지 아닌지 신경 쓰지 않고 항상 비동기적으로 다룰 수 있습니다.
        // const resolvedParams = await Promise.resolve(params); // params 언래핑
        // const { id } = resolvedParams; // id 추출
        const { id } = await Promise.resolve(params);
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${id}`;
        console.log("API URL:", API_URL); // 디버깅용

        // 데이터 가져오기
        const response = await axios.get(API_URL);
        const data = response.data;
        if (data.success) {
          setItem(data.data);
        } else {
          setError("Failed to fetch product data.");
        }
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [params, LOCAL_API_BASE_URL]);

  //update
  const handleUpdate = async () => {
    //수정페이지로 이동
    router.push(`/guestBookUpdate/${item.gb_idx}`)

  }
  //delete
  const handleDelete = async () => {
    //버튼을 항상 활성화 하면 
    // if (!isAuthenticated) {
    //   alert("로그인이 필요합니다")
    //   router.push("/login")
    // }

    //상세보기 성공했을 때 데이터를 item에 넣었다.

    const API_URL = `${LOCAL_API_BASE_URL}/guestbook/delete/${item.gb_idx}`;
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
        router.push("/guestBookList")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("delete error")
    }
  }
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
  //로딩 완료 후  
  return (
    <>
      <h2 className="title">GuestBookDetail</h2>
      <TableContainer component={Paper} className="table-container">
        <Table className="custom-table">
          <TableBody>
            {/* 단일 데이터 렌더링 */}
            <TableRow>
              <TableCell className="table-header">번호</TableCell>
              <TableCell className="table-cell">{item.gb_idx}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">이름</TableCell>
              <TableCell className="table-cell">{item.gb_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">제목</TableCell>
              <TableCell className="table-cell">{item.gb_subject}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">내용</TableCell>
              <TableCell className="table-cell">{item.gb_content}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">이메일</TableCell>
              <TableCell className="table-cell">{item.gb_email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">비밀번호</TableCell>
              <TableCell className="table-cell">{item.gb_pw}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-header">날짜</TableCell>
              <TableCell className="table-cell">{item.gb_regdate.substring(0, 10)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: "20px", textAlign: "center" }}>
        <Button variant='contained' color='primary' onClick={handleUpdate}
          disabled={!isAuthenticated}>수정</Button>
        <Button variant='contained' color='error' onClick={handleDelete} style={{ marginLeft: "10px" }}
          disabled={!isAuthenticated}
        >삭제</Button>
      </div>
    </>
  );
}

export default Page;
