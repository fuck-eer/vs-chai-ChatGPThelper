import axios from "axios";
// "error": {
//     "message": "That model does not exist",
//     "type": "invalid_request_error",
//     "param": null,
//     "code": null
//   }
type ErrorResponse = {
	error: {
		message: string;
		type: string;
		param: string;
		code: string;
	};
};
//get modals
export const getModalsFromOpenAI = async (token: string) => {
	try {
		const { data } = await axios.get("https://api.openai.com/v1/models", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const allModals = data.data.map((modal: { id: string }) => ({
			modalName: modal.id,
			modalId: modal.id,
		}));
		return allModals;
	} catch (error) {
		return (error as ErrorResponse).error.message;
	}
};
//get completions
export const getCompletionsFromOpenAI = async (
	token: string,
	options: {
		model: string;
		prompt: string | string[];
		max_tokens?: number;
		temperature?: number;
		top_p?: number;
	}
) => {
	try {
		const { data } = await axios.post(
			"https://api.openai.com/v1/completions",
			{ ...options },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data.choices[0].text;
	} catch (error) {
		return (error as ErrorResponse).error.message;
	}
};
