"use client";
import AdBanner from '@/components/AdBanner';
import EarnCoinModal from '@/components/EarnCoinModal';
import { category } from '@/lib/category';
import { quiz } from '@/lib/quiz';
import md5 from 'md5';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface PageProps {
	params: Promise<{ id: string }>;
}

export const runtime = 'edge';
export default function Page({params} : PageProps) {

	const router = useRouter();
	const [showEarnModal, setShowEarnModal] = useState(false);
	
	const { id } = use(params);
	const filteredQuizData = id === '' ? { id: 0, name: "", cat_id: 0 } : quiz.find(q => encodeURI(q.name.replaceAll(" ","_")) === id);
	const cat_data = category.find((cat) => cat.id === filteredQuizData?.cat_id) || category[0];
	

	const playQuiz = () => {
		const storedCoinData = sessionStorage.getItem('localCoins');
		const coinData = storedCoinData ? JSON.parse(storedCoinData) : null;
		const coins = coinData ? coinData.coins : 0;
		
		if (coins >= 100) {
			const quizId = md5((filteredQuizData?.id ?? 0).toString());
			router.push('/quiz-play/' + quizId);
		} else {
			setShowEarnModal(true);
		}
	};
	
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			{ showEarnModal && <EarnCoinModal modalManageFunction={setShowEarnModal} quizId={md5((filteredQuizData?.id ?? 0).toString())} /> }
			{ !showEarnModal && 
				<>
				<div className="max-w-[480px] max-h-[320px] mobile-width">
					<AdBanner slot_id="div-gpt-ad-123456789-6" size={[[300, 250]]} id="/23302694015/QD6" />
				</div>
				<div className="flex flex-col gap-6 md:gap-2 bg-bg border-2 border-border rounded-[30px] px-[10px] py-5">
					<div className="flex gap-2 items-center px-5 ">
						<img className="w-[60px] object-cover sm:w-[58px] rounded-full" src={cat_data.img} alt="category" />
						<div>
							<div className="text-[10px] text-[#64d2ff] font-black sm:text-[8px]"> {filteredQuizData?.name} </div>
							<div className="flex gap-1 text-[18px] font-black sm:text-[14px]">
								Play &amp; Win 
								<img className="w-[20px] object-contain" src="/coin.svg" alt="Coin" /> 10000
							</div>
						</div>
					</div>
					<button className="self-center border-text bg-[#1F01FF] border-[1px] w-full md:w-auto text-text text-center rounded-full font-bold text-sm py-3 md:px-10 px-4 cursor-pointer" onClick={() => playQuiz()}>PLAY QUIZ</button>
					<ul className="list-disc flex flex-col gap-3 px-9 text-sm text-text">
						<li>You've got 90 - 150 seconds to answer all questions</li>
						<li>Answer as many questions as you can</li>
						<li>For Every Correct answer you will get +50 points and will loose -25 points on every Incorrect answer</li>
						<li>You can take help by using the lifelines present in the contest.</li>
						<li>Lifelines can be used for free or by using a given amount of coins for each lifeline.</li>
					</ul>
				</div>
				</>
			}
		</div>
	);
}
