import React from 'react';

import NavigationBar from '@/components/NavigationBar';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <div className="mb-16 mt-14 flex w-full items-center justify-center">
      <NavigationBar />
    </div>
  );
};

export default Header;
