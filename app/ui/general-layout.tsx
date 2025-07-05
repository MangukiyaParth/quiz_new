'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { showRewardAd } from '@/lib/showReward';

export default function GeneralLayout({ children, title }: { children: React.ReactNode, title: string }) {
	const router = useRouter();
	const pathname = usePathname();
	const [coins, setCoins] = useState(0);
	useEffect(() => {
		const handleStorageChange = () => {
			if (typeof window !== 'undefined') {
				const storedCoinData = sessionStorage.getItem('localCoins');
				const coinData = storedCoinData ? JSON.parse(storedCoinData) : null;
				setCoins(coinData ? coinData.coins : 0);

				const storedData = sessionStorage.getItem('_u');
				if(storedData == undefined && pathname != '/' && pathname != '/playquiz' && pathname != '/en' && pathname != '/en/playquiz') {
					if(pathname.includes('/en')){
						router.push('/en');
					}
					else{
						router.push('/');
					}
				}
				else if (storedData == 'true' && (pathname == '/' || pathname == '/en')) {
					if(pathname.includes('/en')){
						router.push('/en/home');
					}
					else{
						router.push('/home');
					}
				}
			}
		}

		handleStorageChange();
		window.addEventListener('session-change', handleStorageChange);
		return () => {
			window.removeEventListener('session-change', handleStorageChange);
		};
	}, [pathname, router]);

	const manageDailyRewardBtn = () => {
		showRewardAd(100, (result: any) => {});
	  };
	return (
		<div className="text-white h-screen flex justify-center overflow-hidden">
			<div className="min-w-full max-w-[360px] lgm:min-w-[360px] lgm:max-w-[360px] w-full md:w-auto md:min-w-[360px] max-h-screen flex flex-col gap-3 items-center overflow-y-auto scrollhide box-border intro-question-screen-bg">
				
				<div className="z-10 flex px-1 py-2 items-center justify-between fixed min-w-full max-w-[360px] lgm:min-w-[360px] w-full md:w-auto md:min-w-[360px] bg-linear-to-t from-blue-950/10 to-blue-950 shadow-xl shadow-[rgb(17,24,39)_0px_15px_15px]">
					<div className="flex items-center gap-2">
						<span className="px-3 cursor-pointer"><img src="/brainbliz-text.svg" alt="QuizTwiz" className="h-[30px]" /></span>
					</div>
					{
						pathname != '/' &&
						<div className="flex items-center text-[12px]">
							<div className="flex text-center gap-1 items-center rounded-full cursor-pointer" onClick={manageDailyRewardBtn}>
								<div className="flex item-center mb-2"><img className="w-[25px] object-contain" src="/reward.gif" alt="animation" /></div>
								<div className="flex items-center text-white">Daily Reward</div>
							</div>
							<div className="flex gap-1 items-center bg-[#1a2f77] px-3 py-1  mx-2 rounded-full">
								<img className="w-[15px] object-contain" src="/coin.svg" alt="Coins" />
								<div className="flex items-center gap-1 text-xs"><div className="font-bold text-[12px] text-white"> {coins} </div><div className="text-[10px] text-text">COINS</div></div>
							</div>
						</div>
					}
				</div>
				{children}

			</div>
		</div>
	);
}