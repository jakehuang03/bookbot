const config = {
	production: {
		baseURL: process.env.REACT_APP_API_URL,
	},
	development: {
		// baseURL: "http://localhost:8000",
		baseURL: "http://3.19.244.129",
	},
};

export default process.env.NODE_ENV === "production"
	? config.production
	: config.development;
