'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAudioData } from '@/context/AudioDataContext';
import { cn } from '@/lib/cn';

const NavigationBar = () => {
  const pathname = usePathname();
  const { setAudioData } = useAudioData();

  const menuItems = [
    {
      key: 'extract',
      title: 'Extract',
      path: '/extract',
    },
    {
      key: 'editor',
      title: 'Editor',
      path: '/editor',
    },
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <NavigationBarItem
          key={item.key}
          active={pathname.startsWith(item.path)}
          title={item.title}
          path={item.path}
          onClick={() => setAudioData(null)}
        />
      ))}
    </nav>
  );
};

interface NavigationBarItemProps {
  title: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
}

const NavigationBarItem = ({ title, path, active, onClick }: NavigationBarItemProps) => {
  return (
    <Link
      className={cn(
        `
        rounded-full px-3 py-1 text-sm text-foreground-muted transition-colors duration-100 hover:text-foreground
        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background
        `,
        active && 'bg-surface font-bold text-foreground',
      )}
      href={path}
      onClick={onClick}
    >
      {title}
    </Link>
  );
};

export default NavigationBar;
