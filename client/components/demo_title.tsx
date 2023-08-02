import Image from "next/image";

export default function Demo_Title() {
	return (
		<div className="container mx-auto px-6 md:px-10 py-4 flex justify-between items-center bg-black">
			<div className="flex items-center space-x-2">
				<Image src="/favicon.ico" height={20} width={20} alt="" />
				<h1 className="header-title text-white text-base font-thin tracking-[1px] leading-loose text-center">
					Gourmenta.ai
				</h1>
			</div>
		</div>
	);
}
