'use client';
import React, { useEffect } from 'react';

type AdBannerProps = {
	id: string;       // Ad unit path
	slot_id: string;  // Div ID
	size: any;
};

const AdBanner = ({ id, slot_id, size }: AdBannerProps) => {
	useEffect(() => {
		(window as any).googletag = (window as any).googletag || { cmd: [] };
		const googletag = (window as any).googletag;

		googletag.cmd.push(function () {
			const alreadyDefined = googletag
				.pubads()
				.getSlots()
				.some((slot: any) => slot.getSlotElementId() === slot_id);

			if (alreadyDefined) {
				const oldSlot = googletag
					.pubads()
					.getSlots()
					.find((slot: any) => slot.getSlotElementId() === slot_id);
				if (oldSlot) googletag.destroySlots([oldSlot]);
			}

			googletag.defineSlot(id, size, slot_id).addService(googletag.pubads());

			if (!googletag._servicesEnabled) {
				googletag.pubads().enableSingleRequest();
				googletag.enableServices();
				googletag._servicesEnabled = true;
			}

			googletag.display(slot_id);
		});
	}, [id, slot_id, size]);

	return (
		<div
			id={slot_id}
			className="max-w-[480px] max-h-[320px] mobile-width"
			style={{
				minWidth: '250px',
				minHeight: '250px',
				width: 'fit-content',
				display: 'flex',
				justifyContent: 'center',
			}}
		/>
	);
};

export default AdBanner;