"use client";
import AdBanner from '@/components/AdBanner';
import { useEffect, useState } from 'react';

export default function Page() {
	const [coins, setCoins] = useState(0);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedCoinData = sessionStorage.getItem('localCoins');
			const coinData = storedCoinData ? JSON.parse(storedCoinData) : null;
			setCoins(coinData ? coinData.coins : 0);
		}
	}, []);
	const goTOHomePage = () => {
		window.location.href = '/home';
	};
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[360px] max-h-[320px] mobile-width">
				<AdBanner slot_id="div-gpt-ad-123456789-4" size={[[300, 250]]} id="/23302694015/QD5" />
			</div>
			<div className="flex flex-col gap-2 rounded-[30px] px-[20px] py-5 mx-[10px] font-bold text-xl successintro">
				<h3 className="text-purple-700">Not Bad!</h3>
				<div className="flex items-center gap-4 bg-gray-100 rounded-l-full">
					<div className="bg-yellow-200 text-black border-6 border-yellow-500 rounded-full text-center px-3 py-2 flex flex-col">
						<span className="text-md">{coins}</span><span className="text-[12px]">coins</span>
					</div>
					<div className="flex flex-col w-full text-gray-800">
						<span className="text-xl">Your <span className="text-yellow-400">{coins} coins</span></span><span className="text-lg">are now ready</span>
					</div>
				</div>
				<div className="relative z-9 -mr-5">
					<div className="loginbtn text-center cursor-pointer" onClick={goTOHomePage}>
						<span className="shimmer">Let's Start</span>
					</div>
				</div>
				<div className="text-xs text-black -mt-4 ps-4">Play more quizzes to test your knowledge and to continue earning more coins</div>
			</div>
			<ul className="list-disc flex flex-col gap-3 ps-5 text-sm text-text">
				<li>Over 20 million quiz enthusiasts have played with us</li>
				<li>We are India’s favorite Quiz destination</li>
				<li>We offer quizzes in over 25 categories like GK, sports, bollywood, geography, business, history, IPL & more</li>
				<li>Played & trusted by over 20 milion users</li>
			</ul>
		</div>
	);
}
