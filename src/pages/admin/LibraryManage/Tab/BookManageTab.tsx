import React, { useState } from 'react';
import { BookListInfo } from '@api/dto';
import StandardTable from '@components/Table/StandardTable';
import OutlinedButton from '@components/Button/OutlinedButton';
import { ChildComponent } from '@components/Table/StandardTable.interface';
import { columns, rows } from '@mocks/LibraryManageApi';
import SearchSection from '@components/Section/SearchSection';
import AddBookModal from '../Modal/AddBookModal';

const BookManageTab = () => {
  const selectorList = [
    { id: 'all', content: '도서명 + 저자' },
    { id: 'title', content: '도서명' },
    { id: 'author', content: '저자' },
  ];
  const [inputValue, setInputValue] = useState('');
  const [selectorValue, setSelectorValue] = useState('all');

  const handleSearchButtonClick = () => {
    // console.log(selectorValue, inputValue, '검색 api 호출');
  };

  const childComponent = ({ key, value }: ChildComponent<BookListInfo>) => {
    switch (key) {
      case 'enable':
        return value ? <div className="text-pointBlue">대출가능</div> : <div className="text-subGray">대출불가</div>;
      default:
        return value;
    }
  };
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between space-x-2">
        <SearchSection
          options={selectorList}
          selectorValue={selectorValue}
          setSelectorValue={setSelectorValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearchButtonClick={handleSearchButtonClick}
        />
        <OutlinedButton onClick={() => setAddBookModalOpen(true)}>도서 추가</OutlinedButton>
        <AddBookModal open={addBookModalOpen} onClose={() => setAddBookModalOpen(false)} />
      </div>

      <StandardTable<BookListInfo> columns={columns} rows={rows} childComponent={childComponent} />
    </>
  );
};

export default BookManageTab;
