"use client";

import { useRef, useState, useEffect } from "react";
import Github from "@/components/GitHub";
import Demo_Title from "@/components/demo_title";
import { useChat } from "ai/react";
import axios from "axios";
import { FormEvent } from "react";
import Head from "next/head";

interface LocationType {
	latitude: number;
	longitude: number;
}

export default function Demo() {
	const [bio, setBio] = useState("");
	const [isHovered, setIsHovered] = useState(false);
	const [isBlurred, setIsBlurred] = useState<boolean[]>([]); // Initialize as an empty array
	const [location, setLocation] = useState<LocationType | undefined>(undefined);
	const submitEventRef = useRef<FormEvent<HTMLFormElement> | null>(null); // Create a ref to store the event object
	const [apiData, setApiData] = useState<[string, string][]>([]);

	useEffect(() => {
		if ("geolocation" in navigator) {
			// Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
			navigator.geolocation.getCurrentPosition(({ coords }) => {
				const { latitude, longitude } = coords;
				setLocation({ latitude, longitude });
			});
		}
	}, []);

	const { input, handleInputChange, handleSubmit, isLoading, messages } =
		useChat({
			body: {
				bio,
			},
			onResponse() {
				setIsHovered(false);
			},
		});

	const fetchDataAndUpdateBio = async () => {
		try {
			const response = await axios.post("http://0.0.0.0:8000/recommend", {
				user_preference: input, // Use the current value of 'input' (which is the 'bio')
				user_latitude: location?.latitude, // Replace this with the actual user latitude
				user_longitude: location?.longitude, // Replace this with the actual user longitude
			});

			if (response.status !== 200) {
				throw new Error("Network response was not ok");
			}

			const data = response.data;
			setApiData(data);
			return data;
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault(); // Prevent the default form submission behavior
		try {
			const res = await fetchDataAndUpdateBio();
			setBio(res); // Update the state with the fetched data
			submitEventRef.current = e; // Store the event object in the ref
		} catch (error) {
			console.error("Error fetching data:", error);
			// Handle error if needed
		}
	};

	useEffect(() => {
		if (submitEventRef.current) {
			console.log(bio);
			handleSubmit(submitEventRef.current); // Call handleSubmit with the stored event object
			submitEventRef.current = null; // Reset the ref after calling handleSubmit
		}
	}, [bio]);

	const lastMessage = messages[messages.length - 1];
	const generatedBios =
		lastMessage?.role === "assistant" ? lastMessage.content : null;

	const handleMouseEnter = (index: number) => {
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
					href="https://github.com/muzzaleeni/gourmenta-ai"
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
							"e.g. I would like to eat Italian cuisine that is located near in 2 km radius from me and has rating above 4.0"
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
				<output className="space-y-10 my-10">
					{apiData && apiData.length > 0 && (
						<div className="flex-wrap justify-center max-w-xl mx-auto">
							{apiData.map(([name, url], index) => (
								<div
									className="shadow-md p-4 transition container rounded-[1em]"
									onClick={() => window.open(url, "_blank")}
									key={name}
									style={{
										position: "relative",
										width: "100%",
										marginBottom: "1rem",
									}}
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
											filter: `blur(${isBlurred[index] ? "10px" : "3px"})`,
											zIndex: -1,
											borderRadius: "1rem",
										}}
									/>
									<p className="text-white font-manrope">{name}</p>
								</div>
							))}
						</div>
					)}
				</output>
			</main>
		</div>
	);
}
