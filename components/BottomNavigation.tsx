'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type NavigationProps = {
  activePage: string
}

const BottomNavigation = ({activePage}: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const goToPage = (page: string) => {
    if(pathname.includes('/en')){
      router.push('/en/'+page);
    }
    else {
      router.push('/'+page);
    }
  }
  return (
    <div className="bg-bg flex px-1 pb-2 items-center justify-evenly fixed min-w-100 max-w-full lgm:min-w-[360px] w-full md:w-auto md:min-w-[360px] bottom-0 text-xs" style={{ boxShadow: "rgb(17, 24, 39) 0px -15px 15px"}}>
      <div className={`flex flex-col px-5 py-2 rounded-full items-center ${activePage == 'category' ? 'bg-blue-950' : ''} w-[100px]`} onClick={() => goToPage('category')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        <p className="mt-1">Category</p>
      </div>
      <div className={`flex flex-col px-5 py-2 rounded-full items-center ${activePage == 'home' ? 'bg-blue-950' : ''} w-[100px]`} onClick={() => goToPage('home')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        <p className="mt-1">Home</p>
      </div>
      <div className={`flex flex-col px-5 py-2 rounded-full items-center ${activePage == 'profile' ? 'bg-blue-950' : ''} w-[100px]`} onClick={() => goToPage('profile')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <p className="mt-1">Profile</p>
      </div>
    </div>
  )
}

export default BottomNavigation;