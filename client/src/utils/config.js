const getBaseURL = () => {
	const ec2IP = process.env.REACT_APP_EC2_PUBLIC_IP;

	if (ec2IP) {
		return `http://${ec2IP}/api`;
	} else {
		console.warn("EC2 public IP not set. Falling back to default URL.");
		return "http://localhost:8000/api"; // Replace with URL on the bottom left corner
	}
};

const config = {
	production: {
		baseURL: process.env.REACT_APP_API_URL,
	},
	development: {
		// baseURL: getBaseURL(),
		baseURL: "http://localhost:8000/api",
	},
};

export default process.env.NODE_ENV === "production"
	? config.production
	: config.development;
