/* NOTE docId, revisionNo는 1 이상의 정수입니다. 그 외의 값은 요청을 보내지 않고 NotFound로 처리하기 위해 null을 반환합니다. */
const parseWikiIdParam = (param: string | undefined) => {
  if (!param || !/^[1-9]\d*$/.test(param)) return null;

  const id = Number(param);

  return Number.isSafeInteger(id) ? id : null;
};

export { parseWikiIdParam };
