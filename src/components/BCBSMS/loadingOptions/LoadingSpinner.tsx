'use client';

import React from 'react';

interface LoadingSpinnerProps {
  children?: React.ReactNode;
  showOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  children = 'Loading',
  showOverlay = false
}) => {
  if (!showOverlay) return null;

  return (
    <div className="message-overlay">
      <div className="spinner-background">
        <div className="loading-spinner">
          <div id="floatingCirclesG">
            <div className="f_circleG" id="frotateG_01"></div>
            <div className="f_circleG" id="frotateG_02"></div>
            <div className="f_circleG" id="frotateG_03"></div>
            <div className="f_circleG" id="frotateG_04"></div>
            <div className="f_circleG" id="frotateG_05"></div>
            <div className="f_circleG" id="frotateG_06"></div>
            <div className="f_circleG" id="frotateG_07"></div>
            <div className="f_circleG" id="frotateG_08"></div>
          </div>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
