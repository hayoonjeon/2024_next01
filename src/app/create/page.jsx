import Image from 'next/image';
import React from 'react';
function page(props) {
  return (
    <>
      <h2>자식페이지~~~Create!!</h2>
      <p><Image src={"/images/tree-1.jpg"} width={100} height={100}/></p>
    </>
  );
}

export default page;