import Image from 'next/image';
import React from 'react';
import './gallery.css'
function Page(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><Image src={"/images/tree-2.jpg"} width={100} height={100} /></td>
            <td><Image src={"/images/tree-2.jpg"} width={100} height={100} /></td>
            <td><Image src={"/images/tree-2.jpg"} width={100} height={100} /></td>
          </tr>
          <tr>
            <td><Image src={"/images/tree-3.jpg"} width={100} height={100} /></td>
            <td><Image src={"/images/tree-3.jpg"} width={100} height={100} /></td>
            <td><Image src={"/images/tree-3.jpg"} width={100} height={100} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Page;