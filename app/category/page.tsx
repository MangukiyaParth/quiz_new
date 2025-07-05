"use client";
import AdBanner from '@/components/AdBanner';
import BottomNavigation from '@/components/BottomNavigation';
import { category } from '@/lib/category';
import { useState } from 'react';

export default function Page() {
	const [categories, setCategories] = useState(category);
	const [search, setSearch] = useState('');
	const manageSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		const value = e.target.value.toLowerCase();
		const filteredCategories = category.filter((category) => category.name.toLowerCase().includes(value));
		setCategories(filteredCategories);
	};
	return (
		<div className="px-5 pt-[4rem] pb-20 flex flex-col items-center w-full gap-6">
			<div className="max-w-[480px] max-h-[320px] mobile-width">
				<AdBanner slot_id="div-gpt-ad-123456789-1" size={[[300, 250]]} id="/23302694015/QD2" />
			</div>
			<div className="text-lg font-bold text-center"> Select the Quiz category that you want to play </div>
			<div className="border-2 border-white rounded-full px-4 py-3 flex gap-2 w-full">
				<img src="/Search.svg" alt="search" />
				<input className="bg-transparent text-lg outline-none w-full" type="text" placeholder="Search Quiz Category" onChange={(e) => manageSearchInput(e)} value={search} />
			</div>
			<div className="grid grid-cols-2 gap-3 w-full">
				{categories.map((category) => (
					<div onClick={() => window.location.href = '/category/' + encodeURI(category.name.replaceAll(" ", "_"))} key={category.id}>
						<div className="flex gap-1 items-center border-[1px] border-white rounded-full p-2 cursor-pointer">
							<img className="w-[46px] rounded-full" src={category.img} alt="category" />
							<span className="w-full text-center text-sm"> {category.name} </span>
						</div>
					</div>
				))}
			</div>
			<BottomNavigation activePage='category' />
		</div>
	);
}
