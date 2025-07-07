import React from 'react';

interface Question {
    question: string;
    options: string[];
}

export default function Questions({isHomepage, currQuestionIndex, currentQuestion, handleAnswerClick, selectedAnswer, correctAnswer}: {isHomepage: boolean, currQuestionIndex: number, currentQuestion: Question, handleAnswerClick: (index: number) => void, selectedAnswer: number | null, correctAnswer:  number | null}) {

    return (
        <>
            <div className={`text-md font-bold ${isHomepage ? 'text-left text-white text-lg' : ''} text-center`}>
                { isHomepage && <><span className="me-2">{currQuestionIndex}/2</span>-</> }<span className="ms-2">{currentQuestion.question}</span>
            </div>
            <div className={`grid gap-3 min-w-full mt-2`}>
                {currentQuestion.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        className={`flex justify-between text-[18px] min-h-[32px] font-semibold ${
                            correctAnswer !== null && selectedAnswer !== null && index === correctAnswer
                                ? 'bg-green-500 border-green-700'
                                : correctAnswer !== null && selectedAnswer !== null && index === selectedAnswer
                                ? 'bg-red-500 border-red-700'
                                : isHomepage ? '' : 'bg-white text-black border-[#404380]'
                        } p-3 border-1 rounded-md cursor-pointer`}
                    >
                        {option}
                        {
                            correctAnswer !== null && selectedAnswer !== null && index === correctAnswer
                                ? <img src="/smile.png" className="h-[25px]" alt="smile" />
                                : correctAnswer !== null && selectedAnswer !== null && index === selectedAnswer
                                ? <img src="/sad.png" className="h-[25px]" alt="sad" />
                                : <></>
                        }
                    </div>
                ))}
            </div>
        </>
    )
}