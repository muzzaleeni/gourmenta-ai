import Image from "next/image";

export default function Welcome() {
	return (
		<div
			className="welcome-box box-border max-w-[1270px] mx-auto py-8 md:py-24 flex flex-col md:flex-row justify-center items-center bg-black gap-8 px-4 md:p-0 rounded-md mt-20"
			id="about-section">
			<div className="left flex-shrink-0 w-20 h-20 md:w-40 md:h-40 bg-gray-300 rounded-full overflow-hidden">
				<Image
					src="/jeremy-perkins-UgNjyPkphtU-unsplash.jpg"
					alt="cosmos"
					width={160}
					height={160}
					className="object-cover w-full h-full"
				/>
			</div>
			<div className="right text-white text-center md:text-left max-w-[600px]">
				<h2 className="welcome text-2xl md:text-5xl font-thin mb-4">Welcome</h2>
				<h3 className="welcome-content text-base md:text-lg font-medium leading-relaxed">
					Ready to take your dining experience in Almaty to new heights? Say
					hello to Gourmenta - a powerful restaurant picker powered by AI. With
					Gourmenta, you can discover delightful eateries tailored to your
					preferences. It&apos;s time to tickle your taste buds!
				</h3>
			</div>
		</div>
	);
}
