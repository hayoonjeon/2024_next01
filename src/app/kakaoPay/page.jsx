"use client";

import React, { useState } from "react";
import axios from "axios";

const KakaoPay = () => {
  const [payUrl, setPayUrl] = useState("");

  // 결제 요청 함수
  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/kakaoPay", {
        cid: "TC0ONETIME",
        partner_order_id: "order123",
        partner_user_id: "user123",
        item_name: "상품명",
        quantity: 1,
        total_amount: 5500,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000/kakaoPay/success",
        cancel_url: "http://localhost:3000/kakaoPay/cancel",
        fail_url: "http://localhost:3000/kakaoPay/fail",
      });

      console.log(response.data);
      setPayUrl(response.data.next_redirect_pc_url); // 결제 URL 설정// 결제 URL 설정
    } catch (error) {
      console.error("결제 요청 에러:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>카카오페이 결제 테스트</h1>
      <button onClick={handlePayment} style={{ padding: "10px 20px", fontSize: "16px" }}>
        결제하기
      </button>
      {payUrl && (
        <div style={{ marginTop: "20px" }}>
          <a href={payUrl} target="_blank" rel="noopener noreferrer">
            결제 페이지로 이동
          </a>
        </div>
      )}
    </div>
  );
};

export default KakaoPay;
