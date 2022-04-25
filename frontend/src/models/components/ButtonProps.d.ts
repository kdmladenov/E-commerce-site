import React from 'react';

interface ButtonProps {
  classes: string;
  disabled?: boolean | (() => boolean);
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: React.ReactNode;
}

export default ButtonProps;
