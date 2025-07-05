import "@/app/globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Play Quiz',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
