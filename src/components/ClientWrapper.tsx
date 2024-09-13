'use client'

import { usePathname } from 'next/navigation';
import BottomBar from './BottomBar';

export default function ClientWrapper() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <BottomBar />;
}