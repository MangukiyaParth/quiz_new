"use client";
import AdBanner from '@/components/AdBanner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
	const router = useRouter();
	
	const [points, setPoints] = useState(0);
	const [resultCoin, setResultCoins] = useState(0);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedPointData = sessionStorage.getItem('_p');
			const PointData = storedPointData ? JSON.parse(storedPointData) : null;
			if(PointData){
				const points = PointData ? (PointData.a < 0 ? 50 : PointData.a) : 0;
				setPoints(points);
				const RewardCoin = points < 0 ? 50 : (Math.round(points * 6.6666));
				setResultCoins(RewardCoin);
				sessionStorage.removeItem("_p");
			}
		}
	}, []);

	const doubleCoin = () => {
		const storedCoinData = sessionStorage.getItem('localCoins');
		const oldCoinData = storedCoinData ? JSON.parse(storedCoinData) : null;
		const oldCoins = oldCoinData ? oldCoinData.coins : 0;

		const coinData = { coins: resultCoin + oldCoins };
		sessionStorage.setItem('localCoins', JSON.stringify(coinData));
		window.dispatchEvent(new Event('session-change'));
	};
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[360px] max-h-[320px] mobile-width">
				<AdBanner slot_id="div-gpt-ad-123456789-8" size={[[300, 250]]} id="/23302694015/QD8" />
			</div>
			<div className="flex justify-center items-center" style={{ position: "relative", width: "200px" }}>
				<img src="/animation.gif" alt="logo" style={{ height: "200px", position: "absolute", top: "-10px" }} />
				<h1 className="text-white text-4xl">Well Played</h1>
			</div>
			<div className="flex justify-evenly mt-20 gap-2 w-full">
				<div className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer w-48" style={{ background: "rgb(14, 19, 68)" }}>
					<div className="text-white text-center flex flex-col">
						<span>{points}</span>
						<span> Your Score</span>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer w-48" style={{ background: "rgb(14, 19, 68)" }}>
					<div className="text-white text-center flex flex-col ">
						<span>{resultCoin}</span>
						<span> Coins Earned</span>
					</div>
				</div>
			</div>
			<div className="mt-2 cursor-pointer">
				<button className=" flex gap-2 rounded-full px-7 py-2 border-2 border-[#1a2f77]" onClick={doubleCoin}>
					Double Your winnings<img src="/coin.png" alt="coin" />
				</button>
			</div>
			<div style={{ display: "block", height: "1px", borderWidth: "1px 0px 0px", borderTopStyle: "solid", borderRightStyle: "initial", borderBottomStyle: "initial", borderLeftStyle: "initial", borderTopColor: "rgb(26, 47, 119)", borderRightColor: "initial", borderBottomColor: "initial", borderLeftColor: "initial", borderImage: "initial", margin: "1em 0px", padding: "0px", width: "100%" }}></div>
			<div className="flex flex-col justify-between h-[90px]"><button className="rounded-full px-7 py-2" style={{ background: "rgb(26, 47, 119)" }} onClick={()=>router.push('/home')}>Home</button></div>
		</div>
	);
}
