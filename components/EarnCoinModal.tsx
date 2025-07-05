'use client';
import { showRewardAd } from '@/lib/showReward';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const EarnCoinModal = ({modalManageFunction, quizId}: {modalManageFunction: (value: boolean) => void; quizId: string}) => {
  const router = useRouter();
  const pathname = usePathname();
  const manageWatchBtn = () => {
    showRewardAd(100, (result: any) => {
      if(pathname.includes('/en')){
        router.push('/en/quiz-play/' + quizId);
      }
      else{
        router.push('/quiz-play/' + quizId);
      }
    });
  };
  return (
    <div className="fixed modal z-50 inset-0 flex items-center justify-center w-[100%]">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative flex bg-[#111827] border-2 border-white text-white flex-col justify-center items-center mx-4 p-8 rounded-[1.5rem] lg:w-[40%] w-full">
        <button className="absolute top-0 right-0 m-4 text-white-500 hover:text-gray-700 focus:outline-none" onClick={() => modalManageFunction(false)}>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <img src="/adpic.png" alt="reward logo" loading="lazy" />
        <h2 className="text-4xl text-[#D8E91E] md:text-[1.5rem] mb-4">oops!</h2>
        <p className="mb-6 text-[#8E8F98]">Not enough coins to play</p>
        <button className="bg-[#D8E91E] md:w-[100%] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2" onClick={manageWatchBtn} style={{ boxShadow: "rgba(216, 233, 30, 0.9) 0px 10px 50px -20px, rgba(0, 0, 0, 0.9) 0px 20px 60px -30px" }}>Watch Ad</button>
      </div>
    </div>
  )
}

export default EarnCoinModal;