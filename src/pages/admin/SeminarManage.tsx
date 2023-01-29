import React from 'react';
import ActionModal from '@components/modal/ActionModal';

const SeminarManage = () => {
  return (
    <div>
      세미나 관리
      <div>
        <div>모달 테스트</div>
        <ActionModal title="제목" contents="내용" actionName="확인" />
      </div>
    </div>
  );
};

export default SeminarManage;
