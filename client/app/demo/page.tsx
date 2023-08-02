"use client";

import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Github from "@/components/GitHub";
import Demo_Title from "@/components/demo_title";
import { useChat } from "ai/react";

export default function Demo() {
	const [bio, setBio] = useState("");
	const bioRef = useRef<null | HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [isBlurred, setIsBlurred] = useState<boolean[]>([]); // Initialize as an empty array

	const scrollToBios = () => {
		if (bioRef.current !== null) {
			bioRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const { input, handleInputChange, handleSubmit, isLoading, messages } =
		useChat({
			body: {
				bio,
			},
			onResponse() {
				scrollToBios();
				setIsHovered(false);
			},
		});

	const onSubmit = (e: any) => {
		setBio(input);
		handleSubmit(e);
	};

	const lastMessage = messages[messages.length - 1];
	const generatedBios =
		lastMessage?.role === "assistant" ? lastMessage.content : null;

	const handleMouseEnter = (index: number) => {
		// Update the corresponding index in the isBlurred array to true
		setIsBlurred((prevState) => {
			const newState = [...prevState];
			newState[index] = true;
			return newState;
		});
	};

	const handleMouseLeave = (index: number) => {
		// Update the corresponding index in the isBlurred array to false
		setIsBlurred((prevState) => {
			const newState = [...prevState];
			newState[index] = false;
			return newState;
		});
	};

	return (
		<div>
			<Demo_Title />
			<main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
				<a
					className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-200 mb-5"
					href="https://github.com/muzzaleeni/gourmenta.ai"
					target="_blank"
					rel="noopener noreferrer">
					<Github />
					<p>Star on GitHub</p>
				</a>
				<h3 className="sm:text-6xl text-4xl h-auto max-w-[500px] font-bold text-slate-100">
					Ask Gourmenta to pick a place for you
				</h3>
				<form className="max-w-xl w-full" onSubmit={onSubmit}>
					<div className="flex mt-10 items-center space-x-3">
						<h3 className="text-left font-medium">
							Give detailed preferences{" "}
							<span className="text-slate-400">
								(or look up below to see the example query)
							</span>
							.
						</h3>
					</div>
					<textarea
						value={input}
						onChange={handleInputChange}
						rows={4}
						className="w-full rounded-md my-5 font-manrope"
						placeholder={
							"e.g. I would like to eat at a restaurant that serves Italian cuisine that is located near to me"
						}
						style={{
							color: "white",
							padding: "0.5rem",
							background: "black",
							borderWidth: "1px",
						}}
					/>

					{!isLoading && (
						<button
							className="rounded-xl  text-white font-extrabold font-manrope px-4 py-2 sm:mt-10 mt-8 w-full"
							type="submit"
							style={{
								background: isHovered
									? "linear-gradient(to right, red, rgb(51, 139, 147))"
									: "linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))",
								transition: "background 0.3s ease",
							}}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							Find a place &rarr;
						</button>
					)}
					{isLoading && (
						<button
							className="rounded-xl text-black font-medium font-manrope px-4 py-2 sm:mt-10 mt-8 hover:bg-gray-200 w-full"
							disabled
							style={{
								background: "linear-gradient(to right, red, rgb(51, 139, 147))",
							}}>
							<span className="loading">
								<span style={{ backgroundColor: "white" }} />
								<span style={{ backgroundColor: "white" }} />
								<span style={{ backgroundColor: "white" }} />
							</span>
						</button>
					)}
				</form>
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{ duration: 2000 }}
				/>
				<hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
				<output className="space-y-10 my-10">
					{generatedBios && (
						<>
							<div className="flex flex-wrap justify-center max-w-xl mx-auto">
								{generatedBios
									.substring(generatedBios.indexOf("1") + 3)
									.split("2.")
									.map((generatedBio, index) => {
										return (
											<div
												className="shadow-md p-4 transition cursor-copy container rounded-[1em]"
												onClick={() => {
													navigator.clipboard.writeText(generatedBio);
													toast("Bio copied to clipboard", {
														icon: "✂️",
													});
												}}
												key={generatedBio}
												style={{ position: "relative" }}
												onMouseEnter={(event) => handleMouseEnter(index)}
												onMouseLeave={(event) => handleMouseLeave(index)}>
												<div
													style={{
														position: "absolute",
														top: 0,
														left: 0,
														width: "100%",
														height: "100%",
														backgroundImage:
															"url('/ivan-torres-MQUqbmszGGM-unsplash.jpg')",
														backgroundSize: "cover",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat",
														filter: `blur(${
															isBlurred[index] ? "10px" : "0px"
														})`,
														zIndex: -1,
														borderRadius: "1rem",
													}}
												/>
												<p className="text-white font-manrope">
													{generatedBio}
												</p>
											</div>
										);
									})}
							</div>
						</>
					)}
				</output>
			</main>
		</div>
	);
}
