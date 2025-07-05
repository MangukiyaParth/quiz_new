import AdBanner from '@/components/AdBanner';
import { usePathname } from 'next/navigation';
import React from 'react';
export default function DisplayAdModal({setPopup}: {setPopup: any}) {
	const pathname = usePathname();
	let adId = "div-gpt-ad-1234567890-0";
	if(pathname.includes('/en')){
		adId = "div-gpt-ad-1234567890-en0";
	}
	return (
		<div className="fixed modal z-50 inset-0 flex items-center justify-center w-[100%]">
			<div className="fixed inset-0 bg-gray-800 opacity-90"></div>
			<div className="relative flex bg-[#111827] border-2 border-white text-white flex-col justify-center items-center mx-4 p-8 rounded-[1.5rem] lg:w-[40%] w-full">
				<button className="absolute top-0 right-0 m-4 text-white-500 hover:text-gray-700 focus:outline-none" onClick={()=>setPopup(false)}>
					<svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
				<div className="max-w-[480px] max-h-[320px] mobile-width">
					<AdBanner slot_id={adId} size={[[300, 250]]} id="/23302694015/QD9" />
				</div>
			</div>
		</div>
	)
}