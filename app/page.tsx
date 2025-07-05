'use client';

import AdBanner from '@/components/AdBanner';
import React, { useEffect, useState } from 'react';
import Questions from '@/app/ui/questions';
import GetRewardModal from '@/app/ui/GetRewardModal';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();

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
	const [showRewardPopup , setShowRewardPopup ] = useState(false);
	const [isCorrectAnswer , setIsCorrectAnswer ] = useState(true);
	const [currQuestionIndex , setCurrQuestionIndex ] = useState(1);

    const questions = [
        {
            question: "Who is Brazil's top scorer in the FIFA World Cup?",
            options: ["Pele", "Kaka", "Ronaldo Nazario", "Neymar"],
			answer: 2
        },
        {
            question: "Hitler party which came into power in 1933 is known as?",
            options: ["Labour Party", "Nazi Party", "Ku-Klux-Klan", "German Congress"],
			answer: 1
        },
    ];

	useEffect(() => {
		setCurrentQuestion(questions[currentIndex]);
	}, []);

    const handleAnswerClick = async (index: number) => {
		setSelectedAnswer(index);
		setCorrectAnswer(questions[currentIndex].answer);
		
		// Calculate the new value first
		const isCorrect = index === questions[currentIndex].answer;
		const newCorrectCount = isCorrect ? userCorrectAnswer + 1 : userCorrectAnswer;

		// Update state
		setCorrectUserAnswer(newCorrectCount);

		setTimeout(() => {
			if(currQuestionIndex == 1){
				setIsCorrectAnswer(isCorrect);
				setCurrQuestionIndex(2);
				setShowRewardPopup(true);
			}
			setSelectedAnswer(null);
			setCorrectAnswer(null);
			if(currentIndex === questions.length - 1) {
				if (typeof window !== 'undefined') {
					const coinData = { coins: newCorrectCount * 50 };
					sessionStorage.setItem('_u', 'true');
					sessionStorage.setItem('localCoins', JSON.stringify(coinData));
				}
				// setShowRewardPopup(true);
				if(pathname.includes('/en')){
					router.push('/en/playquiz');
				}
				else{
					router.push('/playquiz');
				}
				return;
			}
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
			setCurrentQuestion(questions[nextIndex]);
		}, 1000);
	};

	return (
		<div className="px-5 pt-[4rem] pb-2 flex flex-col items-center w-full gap-6">
			{ showRewardPopup && <GetRewardModal isCorrectAnswer={isCorrectAnswer} setShowRewardPopup={setShowRewardPopup} /> }
				<>
				<div className="max-w-[320px] max-h-[320px] mobile-width">
					<AdBanner slot_id="div-gpt-ad-123456789-0" size={[[300, 250]]} id="/23302694015/QD1" />
				</div>
				<div className="w-full text-left font-bold text-18">
					<div className="text-yellow-300 text-lg">Let's get started,</div>
					<div className="text-xs mt-1">answer 2 simple questions to get <span className="text-yellow-300">300 coins</span> now:</div>
				</div>
				<Questions isHomepage={true} currQuestionIndex={currQuestionIndex} currentQuestion={currentQuestion} handleAnswerClick={handleAnswerClick} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />
				<div className="w-full font-bold cursor-pointer text-xs text-right">Existing user? <span className="ms-1 underline text-yellow-300"> Login </span></div>
				<div className="w-full">
					<div className="w-full font-bold text-yellow-300">Test your knowledge instantly!</div>
					<ul className="text-[14px] list-disc my-3 px-4">
						<li className="mb-1"> Play quizzes in over 25 categories like GK, sports, bollywood, geography, business, history, IPL & more </li>
						<li className="mb-1"> Compete with thousands of other quiz enthusiasts </li>
						<li className="mb-1"> Collect Qureka Lite coins in every quiz </li>
						<li className="mb-1"> Played & trusted by over 20 milion users </li>
					</ul>
				</div>
				</>
		</div>
	);
}
