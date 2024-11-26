import ReadOne from '@/app/page/ReadOne';
import ReadThree from '@/app/page/ReadThree';
import ReadTwo from '@/app/page/ReadTwo';

export default async function Page({ params }) {
  const { id } = await params;

  // id 값을 기준으로 매핑
  const selections = {
    '1': 'HTML 선택',
    '2': 'CSS 선택',
    '3': 'JavaScript 선택',
  };

  // 기본값 설정
  const str = selections[id] || '선택되지 않음';

  console.log("msg:", id);

  return (
    <>
      <h2>hi</h2>
      <h3>{str}</h3>
      <hr />
      <h3>{selections[id] || '선택되지 않음'}</h3>
      <h3>{id === '1' ? <ReadOne /> : id === '2' ? <ReadTwo />  : <ReadThree /> }</h3>
    </>
  );
}