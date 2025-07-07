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
        <div className="w-full" key={quizData.id}>
            <div className="flex flex-col gap-2 w-full bg-white text-black border border-border rounded-lg p-4">
                <div className="flex gap-5 items-center justify-between">
                    <div className="flex flex-col gap-4">
                        <img className="object-cover w-18 rounded-lg" src={catData.img} alt="CategoryImage" />
                    </div>
                    <div className="flex flex-col w-full">
                        <span className='text-sm'>{catData.name}</span>
                        <div className="flex flex-col">
                            <div className="font-bold flex gap-2 text-md">
                                {quizData.name}
                                <div className="flex items-center gap-1"><img className="w-6 object-contain" src="/coin.png" alt="Coins" />10000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <div className="flex flex-wrap items-center gap-1 w-18">
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                        <span className="text-green-400 text-[11px]">Live</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap w-full">
                        <span className="flex gap-1 text-xs">Entry :<img className="w-6 object-contain" src="/coin.png" alt="Fee" />100</span>
                        <button className="text-[10px] border-1 border-purple-700 rounded-sm px-4 py-1 cursor-pointer" onClick={goToQuiz}>PLAY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    )
}