import React, { useState } from 'react';
import OutlinedButton from '@components/Button/OutlinedButton';

import OverdueBookModal from '../Modal/OverdueBookModal';

const BorrowingStatusTab = () => {
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  return (
    <>
      <OutlinedButton onClick={() => setAddBookModalOpen(true)}>연체 도서</OutlinedButton>
      {addBookModalOpen && <OverdueBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />}
    </>
  );
};

export default BorrowingStatusTab;
