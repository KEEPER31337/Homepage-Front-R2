import React from 'react';
import { useParams } from 'react-router-dom';

import Vote from './Vote';

function VotePageContainer() {
  const { voteId } = useParams();

  return <Vote key={voteId} />;
}

export default VotePageContainer;
