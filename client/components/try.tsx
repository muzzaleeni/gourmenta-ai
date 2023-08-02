import Link from "next/link";

export default function Try() {
	return (
		<div
			className="try-box box-border w-full md:max-w-[1270px] mx-auto px-4 md:p-8 py-10 md:py-20 flex flex-col items-center bg-black text-white"
			id="demo-section">
			<div className="try-text text-3xl md:text-5xl font-semibold leading-[1.2] text-center">
				<h2>Let’s Begin</h2>
			</div>
			<div className="try-content max-w-[600px] text-base md:text-lg leading-relaxed text-center mt-4 md:mt-8">
				<h3>
					Don’t miss out on finger-lickin’ good meals at Almaty’s top-notch
					spots. Let Gourmenta guide you on a gastronomic adventure!
				</h3>
			</div>
			<div className="try-button mt-6">
				<Link href="/demo">
					<div className="w-full md:w-auto h-10 flex justify-center items-center bg-white text-[#383843] rounded-[8px] px-4 md:px-6 max-w-[200px] text-sm font-bold">
						Try it out!
					</div>
				</Link>
			</div>
		</div>
	);
}
