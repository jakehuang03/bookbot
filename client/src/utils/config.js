const config = {
	production: {
		baseURL: process.env.REACT_APP_API_URL,
	},
	development: {
		baseURL: "http://35.153.50.103/api",
		//baseURL: "localhost:8000/api",
		//baseURL: "http://3.19.244.129",
	},
};

export default process.env.NODE_ENV === "production"
	? config.production
	: config.development;
