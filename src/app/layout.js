
//layout.js는 선택이다. (RootLayout 제외)
//layout이 필요없는 간단한페이지에서 생략가능

import Link from "next/link";
import './globals.css'
//페이지 전체의 공통 구조를 렌더링할 때 사용

//부모 컴포넌트
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{textAlign:"center"}}>
        {/* <header style={{marginTop:"50px"}}>공통 헤더</header> */}
        {/* 자식컴포넌트가 렌더링된다.  */}
        {/* {children}
        <footer>공통 푸터</footer> */}
        <h1><Link href="/">WEB</Link></h1>
        <ol>
          <li><Link href={"/read/1"}>HTML</Link></li>
          <li><Link href={"/read/2"}>CSS</Link></li>
          <li><Link href={"/read/3"}>JS</Link></li>
          <li><Link href={"/gallery"}>IMAGE</Link></li>
          <li><Link href={"/itemList"}>ItemList(외부서버)</Link></li>
          <li>GuestBook(Spring 서버)</li>
        </ol>
        <hr/>
        {children}
        <hr/>
        <ul>
          {/* /create면 create 폴더를 찾는다.(page.jsx(필수)와 layout.jsx(선택)가 있음) */}
          <li><Link href="/create">Create</Link></li>
          <li>Update</li>
          <li><input type="button" value="delete"/></li>
        </ul>
      </body>
    </html>
  );
}
