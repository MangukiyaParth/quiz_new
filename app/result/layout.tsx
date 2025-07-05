import "@/app/globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Brainbliz | Home',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
