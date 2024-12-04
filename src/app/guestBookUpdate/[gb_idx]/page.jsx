"use client";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../../store/authStore';

function Page({ params }) {
  const LOCAL_API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;
  const { isAuthenticated, token } = useAuthStore();
  const router = useRouter();
  const [originalData, setOriginalData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 상세 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { gb_idx } = params;
        const API_URL = `${LOCAL_API_BASE_URL}/guestbook/detail/${gb_idx}`;
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOriginalData(response.data.data);
          setEditData({ ...response.data.data }); // editData 초기화
        } else {
          setError('Failed to fetch product data.');
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to fetch product data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params, LOCAL_API_BASE_URL, token]);

  // 입력값 변경
  const changeItem = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 데이터 변경 체크
  const isChanged = () => {
    return (
      originalData &&
      (
        originalData.gb_name !== editData.gb_name ||
        originalData.gb_subject !== editData.gb_subject ||
        originalData.gb_content !== editData.gb_content ||
        originalData.gb_email !== editData.gb_email
      )
    );
  };

  // 수정 요청
  const handleUpdate = async () => {
    const { gb_idx } = params;
    const API_URL = `${LOCAL_API_BASE_URL}/guestbook/update/${gb_idx}`;
    try {
      const response = await axios.put(API_URL, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert(response.data.message);
        router.push(`/guestBookDetails/${gb_idx}`);
      } else {
        alert('Failed to update data.');
      }
    } catch (err) {
      console.error('Error updating data:', err);
      alert('An error occurred while updating.');
    }
  };

  // 로딩 중
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  // 에러 처리
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="title">GuestBookList</h2>
      <TableContainer component={Paper} className="table-container">
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell className="table-cell">name</TableCell>
              <TableCell className="table-cell">
                <TextField
                  name="gb_name"
                  value={editData.gb_name || ''}
                  onChange={changeItem}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-cell">subject</TableCell>
              <TableCell className="table-cell">
                <TextField
                  name="gb_subject"
                  value={editData.gb_subject || ''}
                  onChange={changeItem}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-cell">content</TableCell>
              <TableCell className="table-cell">
                <TextField
                  name="gb_content"
                  value={editData.gb_content || ''}
                  onChange={changeItem}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-cell">email</TableCell>
              <TableCell className="table-cell">
                <TextField
                  name="gb_email"
                  value={editData.gb_email || ''}
                  onChange={changeItem}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="table-cell">pw</TableCell>
              <TableCell className="table-cell">
                <TextField
                  type="text"
                  name="gb_pw"
                  value={editData.gb_pw || ''}
                  onChange={changeItem}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ margin: '20px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={!isAuthenticated || !isChanged()}
        >
          수정
        </Button>
      </div>
    </>
  );
}

export default Page;
