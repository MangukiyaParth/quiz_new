"use client";
import QuizItem from '@/app/ui/QuizItem';
import AdBanner from '@/components/AdBanner';
import BottomNavigation from '@/components/BottomNavigation';
import { category } from '@/lib/category';
import { quiz } from '@/lib/quiz';
import { use, useState } from 'react';

interface PageProps {
	params: Promise<{ id: string }>;
}

export const runtime = 'edge';
export default function Page({params} : PageProps) {
	const { id } = use(params);
	const selectedCategory = category.find((category) => encodeURI(category.name.replaceAll(" ", "_")) === id);
	
	const filteredQuizData = !selectedCategory?.id ? quiz : quiz.filter(q => q.cat_id === selectedCategory.id);
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[480px] max-h-[320px] mobile-width">
				<AdBanner slot_id="div-gpt-ad-123456789-2" size={[[300, 250]]} id="/23302694015/QD3" />
			</div>
			{filteredQuizData.map((quiz) => {
				const cat_data = category.find((cat) => cat.id === quiz.cat_id) || category[0];
				return (
					<QuizItem quizData={quiz} catData={cat_data} key={quiz.id} />
				)}
			)}
			<BottomNavigation activePage='category' />
		</div>
	);
}
