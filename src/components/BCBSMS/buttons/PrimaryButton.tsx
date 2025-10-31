'use client';

import React from 'react';
import clsx from 'clsx';

interface PrimaryButtonProps {
  style?: 'orange' | 'blue' | 'cancel' | 'negative' | 'outline' | 'anchor' | 'close';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  style = '',
  disabled = false,
  onClick,
  children,
  className,
  id
}) => {
  if (style === 'close') {
    return (
      <div onClick={onClick} className="cursor-pointer">
        <span className="material-icons close-button clickable-element">close</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      id={id}
      className={clsx(
        'button-generic',
        style,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
