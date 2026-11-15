import React from 'react';
import { Link } from 'react-router-dom';
import { useGetWikiDocListQuery } from '@api/wikiApi';

const RECENT_DOC_COUNT = 10;

/* NOTE 위아래 StandardViewer(toastui)의 본문과 같은 서체로 보이도록 toastui-editor-contents의 font-family를 그대로 씁니다. */
const TOASTUI_VIEWER_FONT_FAMILY =
  "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕', 'Nanum Barun Gothic', '맑은고딕', 'Malgun Gothic', sans-serif";

const WikiRecentDocSection = () => {
  const { data: docs, isError } = useGetWikiDocListQuery({ sort: 'latest', size: RECENT_DOC_COUNT });

  const renderContent = () => {
    if (!docs) {
      return isError ? <p className="text-[13px] text-white/70">최근 수정된 문서를 불러오지 못했습니다.</p> : null;
    }

    if (docs.content.length === 0) {
      return <p className="text-[13px] text-white/70">아직 작성된 문서가 없습니다.</p>;
    }

    return (
      <>
        <ul className="list-disc text-[13px] leading-relaxed marker:text-subGray sm:columns-2 sm:gap-x-10">
          {docs.content.map(({ docId, title }) => (
            <li key={docId} className="ml-6 break-inside-avoid py-1">
              <Link to={`/wiki/view/${docId}`} className="break-words text-pointBlue hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-end">
          <Link to="/wiki/list" className="text-[13px] text-white hover:text-pointBlue hover:underline">
            전체 보기 &rsaquo;
          </Link>
        </div>
      </>
    );
  };

  /* NOTE 제목 스타일은 StandardViewer(toastui 다크 테마)의 h2와 맞췄습니다. */
  return (
    <section className="my-6" style={{ fontFamily: TOASTUI_VIEWER_FONT_FAMILY }}>
      <h2 className="mb-[13px] border-b border-white pb-[7px] text-[22px] font-bold leading-[23px] text-white">
        최근 수정된 문서
      </h2>
      {renderContent()}
    </section>
  );
};

export default WikiRecentDocSection;
