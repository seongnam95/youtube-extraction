import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <div>{children}</div>;
};

export default Header;
