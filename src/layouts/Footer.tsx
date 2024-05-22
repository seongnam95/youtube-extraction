import { IconButton } from '@/components/ui/IconButton';

const Footer = () => {
  return (
    <footer className="flex h-14 items-center justify-center gap-2 border-t bg-surface">
      <IconButton size="sm" variant="secondary"></IconButton>
      <IconButton size="sm" variant="secondary"></IconButton>
    </footer>
  );
};

export default Footer;
