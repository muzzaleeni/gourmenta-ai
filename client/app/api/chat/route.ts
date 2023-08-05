import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
	const { bio } = await req.json();

	// Ask OpenAI for a streaming completion given the prompt
	const response = await openai.createChatCompletion({
		model: "gpt-4",
		stream: true,
		messages: [
			{
				role: "user",
				content: `You are provided with list of restaurant details - ${bio}
				If it's content-wise empty, return "Sorry, but there are no restaurants matching your criteria. Please try again."
				Otherwise, generate for each restaurant the reasoning for why it was recommended based on the user's preferences and the restaurant's attributes using the following template:`,
			},
		],
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
