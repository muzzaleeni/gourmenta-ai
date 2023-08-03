"use client";

import ScrollLink from "./scrollLink";
import Image from "next/image";

export default function Header() {
	return (
		<div className="container mx-auto px-6 md:px-10 py-4 flex justify-between items-center bg-black">
			<div className="flex items-center space-x-2">
				<Image src="/favicon.ico" height={20} width={20} alt="" />
				<h1 className="header-title text-white text-base font-thin tracking-[1px] leading-loose text-center">
					Gourmenta.ai
				</h1>
			</div>
			<div className="flex space-x-4">
				<ScrollLink className="btn" href="#about-section">
					<h3 className="text-white text-base font-thin leading-normal hover:text-gray-200">
						About
					</h3>
				</ScrollLink>
				<ScrollLink className="btn" href="#how-it-works-section">
					<h3 className="text-white text-base font-thin leading-normal hover:text-gray-200">
						How it works?
					</h3>
				</ScrollLink>
				<ScrollLink className="btn" href="#demo-section">
					<h3 className="text-white text-base font-thin leading-normal hover:text-gray-200">
						Demo
					</h3>
				</ScrollLink>
				<ScrollLink className="btn" href="#why-us-section">
					<h3 className="text-white text-base font-thin leading-normal hover:text-gray-200">
						Why us?
					</h3>
				</ScrollLink>
			</div>
		</div>
	);
}
