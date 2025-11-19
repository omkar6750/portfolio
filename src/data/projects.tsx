import type { ProjectsMap } from "../types";

export const PROJECTS_DATA: ProjectsMap = {
	personal: [
		{
			name: "ScrapeFlow AI",
			type: "Personal",
			description:
				"AI-powered scraping tool reducing manual data collection by 70%. Orchestrates 10+ pipelines with automated insights.",
			stack: ["Next.js", "Puppeteer", "AI Models", "React Flow"],
			year: "2024",
			image: "https://via.placeholder.com/400x250/aa3333/ffffff?text=ScrapeFlow",
		},
		{
			name: "Circl. Chat App",
			type: "Personal",
			description:
				"High-performance real-time chat with <200ms latency. Custom auth and fault-tolerant event flow built from scratch.",
			stack: ["Socket.IO", "Node.js", "React", "Redis"],
			year: "2023",
			image: "https://via.placeholder.com/400x250/33aa55/ffffff?text=Circl.",
		},
	],
	freelance: [
		{
			name: "NeoTribe Ecommerce",
			type: "Freelance",
			description:
				"Production-grade e-commerce platform built with Next.js App Router. Features serverless APIs, DB pooling, and zero-downtime migrations.",
			stack: ["Next.js", "Postgres", "Prisma", "Razorpay"],
			year: "2024",
			image: "https://via.placeholder.com/400x250/554488/ffffff?text=NeoTribe",
		},
		{
			name: "The Hollows of Nethermoor",
			type: "Game",
			description:
				"Interactive web-based game featuring persistent game logic, Google OAuth, and optimized media assets for low latency.",
			stack: ["Next-Auth", "Tailwind", "Audio API", "Game Logic"],
			year: "2024",
			image: "https://via.placeholder.com/400x250/885522/ffffff?text=The+Hollows",
		},
	],
	academic: [
		{
			name: "Autonomous UAV",
			type: "Research",
			description:
				"College-funded twin-boom UAV. Achieved 10km control link and ±1.5m waypoint accuracy with AI-driven perception.",
			stack: ["Ardupilot", "C++", "WebRTC", "IoT"],
			year: "2023",
			image: "https://via.placeholder.com/400x250/777777/ffffff?text=UAV+Drone",
		},
		{
			name: "Sign Language AI",
			type: "Academic",
			description:
				"TensorFlow gesture recognition model (90%+ accuracy) running on Raspberry Pi for real-time sign-to-text translation.",
			stack: ["Python", "TensorFlow", "Raspberry Pi", "OpenCV"],
			year: "2023",
			image: "https://via.placeholder.com/400x250/3333aa/ffffff?text=SignLang",
		},
	],
};
