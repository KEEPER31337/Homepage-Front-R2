import React from 'react';
const SeminarContent = () => {
  const [listColumns, setListColumns] = useState([
  ]);
  const [listRows, setListRows] = useState([
  ]);
  return (
    <div className="flex h-full flex-col space-y-[32px] bg-subBlack px-20 pt-[80px]">
      <p className="font-[28pt] text-pointBlue">세미나 관리(2023년 1학기)</p>
      <div className="flex h-fit w-full justify-between">
        <div className="m-10 grow">
          <StandardTable columns={listColumns} rows={listRows} />
          <div className="flex justify-end">
            <button type="button" className="m-1 bg-black text-white">
              추가
            </button>
            <button type="button" className="m-1 bg-black text-white">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeminarManage = () => {
  return <div>세미나 관리</div>;
  return (
    <div>
      <div>Keeper Title</div>
      <div className="flex h-[100vh] w-[100vw] bg-gray-300">
        <div className="h-[100vh] w-[320px] border border-black bg-white">사이드 바</div>
        <div className="flex w-full justify-center">
          <div className="h-full w-full max-w-[1080px] border border-black bg-white">
            세미나 페이지
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeminarManage;
