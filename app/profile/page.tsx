"use client";
import AdBanner from '@/components/AdBanner';
import BottomNavigation from '@/components/BottomNavigation';
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
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[480px] max-h-[320px] mobile-width">
				<AdBanner slot_id="div-gpt-ad-123456789-5" size={[[300, 250]]} id="/23302694015/QD5" />
			</div>
			<div className="flex justify-around items-center gap-10">
				<div className="w-[150px] py-2 px-4 rounded-full flex justify-between items-center bg-orange-500 border-2">
					<div className="text-sm">Coins</div>
					<div className="text-lg">{coins}</div>
				</div>
			</div>
			<BottomNavigation activePage='profile' />
		</div>
	);
}
