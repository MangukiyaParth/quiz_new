import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { showRewardAd } from '@/lib/showReward';

export default function GetRewardModal({isCorrectAnswer, setShowRewardPopup}: {isCorrectAnswer: boolean, setShowRewardPopup: any}) {
	const router = useRouter();
	const pathname = usePathname();
	const moveToNextPage = () => {
		setShowRewardPopup(false);
		// router.push('/playquiz');
		// if(pathname.includes('/en')){
		// 	router.push('/en/home');
		// }
		// else{
		// 	router.push('/home');
		// }
	};
	const claimCoin = async () => {
		showRewardAd(100, (result: any) => {
			// moveToNextPage();
		});
	};
	return (
		<div className="fixed modal z-50 inset-0 flex items-center justify-center w-[100%]">
			<div className="fixed inset-0 bg-gray-950 opacity-70"></div>
			<div className="relative flex bg-[#111827] border-2 border-white text-white flex-col justify-center items-center mx-4 px-8 py-2 rounded-[40px] max-w-[360px] w-full">
				<img src="/getreward.gif" alt="reward logo" loading="lazy" />
				<h2 className="text-4xl mb-1 text-yellow-300 font-extrabold">{ isCorrectAnswer ? 'Hurray!!' : 'Oops!!'}</h2>
				<div className="mb-4 text-center text-lg">
					<p className="font-bold text-yellow-300">{ isCorrectAnswer ? 'Correct answer' : 'Wrong answer'} </p>
					{ isCorrectAnswer ? <></> : <p>You still have a chance to win coins.</p>}
				</div>
				{ isCorrectAnswer ? <></> : <p className="text-2xl font-bold">Just watch an ad & earn</p>}
				{ isCorrectAnswer ? <></> : <p className="mb-6 text-2xl text-yellow-300 font-bold">100 coins</p>}


				{ isCorrectAnswer ? <p className="mb-3 text-2xl font-bold">You won <span className="text-yellow-300">100 coins</span></p> : <></>}
				{ isCorrectAnswer ? <p className="mb-6 text-center">You have a chance to double your coins by watching an ad.</p> : <></>}
				
				<button className="pt-4 mr-2 cursor-pointer" onClick={claimCoin}>
					<img src="/claim-button-opt.png" alt=""></img>
				</button>
				<button className="m-4 text-white-500 hover:text-gray-700 focus:outline-none underline cursor-pointer" onClick={moveToNextPage}>
					Close
				</button>
			</div>
		</div>
	)
}