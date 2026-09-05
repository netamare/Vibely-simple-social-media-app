import type { ReactNode } from 'react';
import { MobileNav, People, Sidebar } from '../components';

export function Layout({ children }: { children: ReactNode }) {
  return <div className="shell"><Sidebar/><main>{children}</main><aside className="rightbar"><div className="mini-brand">Your corner of the internet</div><People/><p className="footer">© 2026 Vibely · Made for good vibes</p></aside><MobileNav/></div>;
}
