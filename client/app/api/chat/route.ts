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
		model: "gpt-3.5-turbo",
		stream: true,
		messages: [
			{
				role: "user",
				content: `Below, you can find the website links for several restaurants. I will need you to just return me the same links but in labeled manner. 1., 2., ...;.
				Links: ${bio}`,
			},
		],
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response);
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
