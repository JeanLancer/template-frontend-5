import React from 'react';

import config from '../../../config';

const Jivochat: React.FC = () => {
  return <script src={`//code.jivosite.com/widget/${config.JIVOCHAT}`} async />;
};

export default Jivochat;
