import Image from "next/image";
import img01 from "/public/images/tree-1.jpg"



//page.js는 필수이다. (생략불가)
//각 경로(/,/about,/content...)마다 페이지를 렌더링하려면 해당 경로의 page.js 파일이 반드시 필요하다.


//자식컴포넌트
import ItemList from './itemList/page'

export default function Home() {
  return (
    //해당 내용은 부모컴포넌트의 props=>{children}에 삽입됨
    <>
 
    {/* 이미지 자체를 import하지 않으면 너비와 높이 넣어줘야함 */}
    {/* <p><Image src="/images/coffee-blue.jpg" width={300} height={300} alt=""/></p>
    <p><Image src={img01}  width={300} height={300}  alt=""/></p> */}
    <ItemList/>
    </>
  );
}
