import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface QuizItemProps {
    quizData: { id: number; name: string; cat_id: number };
    catData: { img: string; name: string };
}

export default function QuizItem({quizData, catData}: QuizItemProps) {
    const router = useRouter();
    const pathname = usePathname();
    const goToQuiz = ()=>{
        if(pathname.includes('/en')){
            router.push('/en/quiz/'+encodeURI(quizData.name.replaceAll(" ","_")))
        }
        else{
            router.push('/quiz/'+encodeURI(quizData.name.replaceAll(" ","_")))
        }
    }
    return (
        <div className="w-full" key={quizData.id} onClick={goToQuiz} >
            <div className="flex flex-col gap-2 w-full bg-primary border border-border rounded-full py-2 cursor-pointer">
                <div className="flex gap-2 items-center px-2 justify-between">
                    <div className="flex flex-col"><img className="object-cover w-24 rounded-full" src={catData.img} alt="CategoryImage" /></div>
                    <div className="flex flex-col w-full justify-start">
                        <div className="flex text-[8px] text-text_hd font-black sm:text-[10px] flex-col items-end">
                            <div className="text-[#64d2ff] max-h-[20px] py-[2px]">
                                <div className="flex sm:justify-center">{catData.name} &nbsp;| &nbsp;{quizData.name}</div>
                            </div>
                        </div>
                        <div className="flex items-end flex-col mt-[5px]">
                            <div className="text-[10px] sm:text-[14px] font-black flex">Play &amp; Win&nbsp;&nbsp;<img className="w-[20px] object-contain" src="/coin.svg" alt="Coins" />&nbsp;10000</div>
                        </div>
                        <div className="flex items-end flex-col mt-[5px]">
                            <span className="text-[8px] flex gap-1 sm:text-[10px] bg-[#30d158]/20 text-[#30d158] px-2 rounded-full">Entry Fee &nbsp;<img className="w-[14px] object-contain" src="https://playerstorage.b-cdn.net/quiztwiz/assets/coin.svg" alt="Fee" />&nbsp;100</span>
                        </div>
                    </div>
                    <div className="flex flex-col"><img src="/play.svg" alt="Play" className="rounded-full object-cover w-24" /></div>
                </div>
            </div>
        </div>
    )
}