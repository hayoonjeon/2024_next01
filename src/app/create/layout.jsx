import React from 'react';

function layout({children}) {
  return (
    <div>
      <h3>CREATE 부모 컴포넌트 시작</h3>
      {children}
      <h3>CREATE 부모 컴포넌트 끝</h3>
    </div>
  );
}

export default layout;