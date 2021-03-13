import React from 'react';
import './index.scss';

function WinTip({ prize }) {
  return (
    <div className="win-prize flex flex-col items-center justify-center">
      <h3 className="text-lg">恭喜您获得 <span className="text-primary">“{prize.title}”</span></h3>
      <p className="">

      </p>
    </div>
  );
}

export default WinTip;
