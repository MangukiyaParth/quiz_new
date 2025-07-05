"use client";
import Questions from '@/app/ui/questions';
import AdBanner from '@/components/AdBanner';
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
	
	const { id } = use(params);
	const quizItem = id === '' ? { id: 0, name: "", cat_id: 0, questions: [] } : quiz.find(q => md5(q.id.toString()) === id);
	const questions = quizItem?.questions.sort(() => Math.random() - .5).slice(0, 15) || [];
	const [currentQuestion, setCurrentQuestion] = useState<{
		question: string,
		options: string[],
		answer: number
	}>({
		question: "",
		options: [],
		answer: 0
	});
	const [userCorrectAnswer , setCorrectUserAnswer ] = useState(0);
	const [currentIndex , setCurrentIndex ] = useState(0);
	const [selectedAnswer , setSelectedAnswer ] = useState<number | null>(null);
	const [correctAnswer , setCorrectAnswer ] = useState<number | null>(null);
	
	// const questions = [
    //     {
    //         question: "Who is Brazil's top scorer in the FIFA World Cup?",
    //         options: ["Pele", "Kaka", "Ronaldo Nazario", "Neymar"],
	// 		answer: 2
    //     },
    //     {
    //         question: "Hitler party which came into power in 1933 is known as?",
    //         options: ["Labour Party", "Nazi Party", "Ku-Klux-Klan", "German Congress"],
	// 		answer: 1
    //     },
    // ];

	useEffect(() => {
		setCurrentQuestion(questions[currentIndex]);
	}, []);

	const handleAnswerClick = async (index: number) => {
		setSelectedAnswer(index);
		setCorrectAnswer(questions[currentIndex].answer);

		// Calculate the new value first
		const isCorrect = index === questions[currentIndex].answer;
		const newCorrectCount = isCorrect ? userCorrectAnswer + 50 : userCorrectAnswer-25;
		
		// Update state
		setCorrectUserAnswer(newCorrectCount);

		setTimeout(() => {
			setSelectedAnswer(null);
			setCorrectAnswer(null);
			if(currentIndex === questions.length - 1) {
				if (typeof window !== 'undefined') {
					const storedCoinData = sessionStorage.getItem('localCoins');
					const oldCoinData = storedCoinData ? JSON.parse(storedCoinData) : null;
					const oldCoins = oldCoinData ? oldCoinData.coins : 0;
					
					const coinData = { coins: (newCorrectCount < 0 ? 50 : (Math.round(newCorrectCount * 6.6666))) + oldCoins };
					sessionStorage.setItem('localCoins', JSON.stringify(coinData));
					sessionStorage.setItem('_p', JSON.stringify({a:newCorrectCount}));
					window.dispatchEvent(new Event('session-change'));

					router.push('/result');
				}
				// setShowRewardPopup(true);
				return;
			}
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			setCurrentQuestion(questions[nextIndex]);
		}, 1000);
	};
	
	// Manage Progress Bar
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		const timer = setInterval(() => {
			setProgress(prev => (prev + 1));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if(progress >= 120) {
			if (typeof window !== 'undefined') {
				const storedCoinData = sessionStorage.getItem('localCoins');
				const oldCoinData = storedCoinData ? JSON.parse(storedCoinData) : null;
				const oldCoins = oldCoinData ? oldCoinData.coins : 0;

				const coinData = { coins: (userCorrectAnswer < 0 ? 50 : (Math.round(userCorrectAnswer * 6.6666))) + oldCoins };
				sessionStorage.setItem('localCoins', JSON.stringify(coinData));
				sessionStorage.setItem('_p', JSON.stringify({a:userCorrectAnswer}));
				window.dispatchEvent(new Event('session-change'));

				router.push('/result');
			}
			// router.push('/home');
		}
	}, [progress]);
	
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6"> 
			
			<div className="flex flex-col gap-6 md:gap-2 bg-bg rounded-[30px] py-5 w-full">
				<div className="flex gap-2 items-center w-full">
					<div><span className="text-[14px] bold">Question {currentIndex + 1}</span><span className="text-[13px]">/15</span></div>
					<div className={`w-60 ${progress <= 40 ? 'bg-green-200' : (progress <= 80 ? 'bg-orange-200' : 'bg-red-200')} rounded-full h-1`}>
						<div className={`${progress <= 40 ? 'bg-green-500' : (progress <= 80 ? 'bg-orange-500' : 'bg-red-500')} h-1 rounded-full transition-all duration-300 ease-out`} style={{ width: `${(progress * 100)/120}%` }}></div>
					</div>
					<div className="flex gap-1 items-center justify-center text-[10px] w-20 font-bold text-[text-[#008000]]"><span className="text-lg">{120 - progress}</span></div>
				</div>
				
				<Questions isHomepage={false} currentQuestion={currentQuestion} handleAnswerClick={handleAnswerClick} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
				<div className="flex justify-center items-center gap-1 text-lg font-bold">Your Score : <span className="text-amber-400"> {userCorrectAnswer} </span></div>
				
				<div className="max-w-[480px] max-h-[320px] mobile-width">
					<AdBanner slot_id="div-gpt-ad-123456789-7" size={[[300, 250]]} id="/23302694015/QD7" />
				</div>

				<div className="hidden mt-4 bg-bg_nav min-h-[70px] bottom-[-3rem] fixed left-0 min-w-[520px] max-w-[520px] lgm:min-w-[360px] md:w-full md:min-w-full">
					<div className="h-[1px] bg-border relative">
						<div className="border-border border-[1px] rounded-full left-[33%] px-3 py-2 flex gap-2 justify-center items-center absolute top-[-18px] bg-bg_nav text-sm cursor-pointer transition-all duration-500 min-w-[30%]">
							<svg className="MuiSvgIcon-root MuiSvgIcon-fontSize12px css-jpbqk9" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FavoriteIcon" style={{ color: "rgb(2, 121, 211)" }}>
								<path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
							</svg>
							<span> Tap to use Lifelines </span>
						</div>
					</div>
					<div className="flex mt-8 text-[12px] items-start justify-evenly transition-all duration-1000 h-[0] overflow-hidden" style={{ borderWidth: "0px" }}>
						<div className="w-full h-full absolute items-center justify-evenly text-base bg-bg_nav top-4 hidden">
							<div className="flex w-[50%] justify-evenly">
								<div className="flex flex-col justify-center items-center gap-1">A - 0 %</div>
								<div className="flex flex-col justify-center items-center gap-1">B - 0 %</div>
							</div>
							<div className="flex w-[50%] justify-evenly">
								<div className="flex flex-col justify-center items-center gap-1">C - 0 %</div>
								<div className="flex flex-col justify-center items-center gap-1">D - 0 %</div>
							</div>
						</div>
						<div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
							<div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">50:50</div>
							<div>50:50</div>
						</div>
						<div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
							<div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
								<img src="/audience.svg" alt="audience poll" />
							</div>
							<div>Audience poll</div>
						</div>
						<div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
							<div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
								<img src="/freez.svg" alt="Freeze" />
							</div>
							<div>Freeze Timer</div>
						</div>
						<div className="flex flex-col gap-1 justify-center items-center cursor-pointer">
							<div className="h-[60px] w-[60px] border-[1px] border-text_yellow text-text_yellow rounded-full flex justify-center items-center ">
								<img src="/flip.svg" alt="Flip" />
							</div>
							<div>Flip Question</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
