import type { ProjectsMap } from "../types";

export const PROJECTS_DATA: ProjectsMap = {
	personal: [
		{
			name: "ScrapeFlow AI",
			type: "Personal",
			description:
				"AI-powered scraping tool reducing manual data collection by 70%. Orchestrates 10+ pipelines with automated insights.",
			stack: ["Next.js", "Puppeteer", "AI analysis", "React Flow"],
			year: "2025",
			image: "/images/scrape-flow1.png",
			status: "offline",
			longDescription:
				"ScrapeFlow is an intelligent data extraction platform designed to handle dynamic web content that defeats traditional scrapers. It uses a node-based visual editor (React Flow) to define scraping logic, which is then executed by a fleet of headless browsers managed by Puppeteer. The extracted data is cleaned using LLMs before being piped into your database.",
			liveUrl: undefined,
			repoUrl: "https://github.com/username/scrapeflow",
			architectureImage: "",
			gallery: [
				"/images/scrape-flow2.png",
				"/images/scrape-flow3.png",
				"/images/scrape-flow4.png",
			],
			challenges: [
				"Reliably scraping JS-heavy sites that use client-side rendering and anti-bot techniques.",
				"Designing a visual, node-based editor (React Flow) that compiles to robust scraping flows.",
				"Coordinating and scaling many headless browser instances while avoiding memory leaks.",
				"Normalizing and cleaning noisy data streams using LLMs without excessive API costs.",
			],
		},
		{
			name: "Circl. Chat App",
			type: "Personal",
			description:
				"High-performance real-time chat with <200ms latency. Custom auth and fault-tolerant event flow built from scratch.",
			stack: ["Socket.IO", "Node.js", "React", "Redis"],
			year: "2023",
			image: "/images/clout1.png",
			status: "offline",
			longDescription:
				"Circl is a proof-of-concept real-time messaging application built to test the limits of WebSocket scalability. It features a custom event bus that ensures message delivery even during network partitions. Redis is used for pub/sub across multiple Node.js instances, allowing the app to scale horizontally.",
			liveUrl: undefined,
			repoUrl: "https://github.com/omkar6750/Chat-app",
			architectureImage: "",
			gallery: [
				"/images/clout2.png",
				"/images/clout3.png",
				"/images/clout4.png",
			],
			challenges: [
				"Guaranteeing message delivery during partitions and reconnects (exactly-once / at-least-once semantics).",
				"Keeping end-to-end latency under 200ms under real load and network jitter.",
				"Designing a lightweight auth and presence system that scales horizontally.",
			],
		},
	],
	freelance: [
		{
			name: "NeoTribe Ecommerce",
			type: "Freelance",
			description:
				"Production-grade e-commerce platform built with Next.js App Router. Features serverless APIs, DB pooling, and zero-downtime migrations.",
			stack: ["Next.js", "Postgres", "Prisma", "Razorpay", "GSAP"],
			year: "2025",
			image: "/images/neo-tribe1.png",
			status: "live",
			longDescription:
				"NeoTribe is a bespoke e-commerce solution developed for a boutique fashion brand. It moves away from Shopify limitations, offering a completely custom checkout flow and inventory management system. It utilizes Next.js Server Actions for type-safe backend mutations and Prisma for complex relation handling.",
			liveUrl: "https://neo-tribe.vercel.app/",
			repoUrl: undefined,
			architectureImage: "",
			gallery: ["/images/neo-tribe2.png", "/images/neo-tribe3.png"],
			challenges: [
				"Implementing secure, PCI-compliant payment flows with Razorpay and webhook reliability.",
				"Designing DB pooling / connection management for serverless Postgres (Neon) to avoid exhausted connections.",
				"Zero-downtime schema migrations and preview environments for safe deploys.",
			],
		},
		{
			name: "The Hollows of Nethermoor",
			type: "Game",
			description:
				"Interactive web-based game featuring persistent game logic, Google OAuth, and optimized media assets for low latency.",
			stack: [
				"Next-Auth",
				"Tailwind",
				"Audio API",
				"Game Logic",
				"react.js",
			],
			year: "2024",
			image: "/images/hollow1.png",
			status: "live",
			longDescription:
				"A browser-based RPG that leverages the Web Audio API for immersive soundscapes. The game state is persisted in local storage and synced to the cloud upon login, allowing users to switch devices seamlessly. The UI is built entirely with Tailwind CSS, ensuring a lightweight footprint.",
			liveUrl: "https://hollow-pearl.vercel.app/",
			repoUrl: "https://github.com/omkar6750/Hollow",
			architectureImage: "",
			gallery: [
				"/images/hollow2.png",
				"/images/hollow3.png",
				"/images/hollow4.png",
			],
			challenges: [
				"Optimizing large media assets for fast load times and smooth gameplay transitions.",
				"Syncing local persisted state to the cloud reliably across different devices and sessions.",
				"Designing engaging UI & UX while keeping the client footprint small for lower-end devices.",
			],
		},
	],
	academic: [
		{
			name: "Autonomous UAV",
			type: "Research",
			description:
				"College-funded twin-boom UAV. Achieved 10km control link and ±1.5m waypoint accuracy with AI-driven perception.",
			stack: ["Ardupilot", "C++", "WebRTC", "IoT", "4g"],
			year: "2023",
			image: "/images/uav-1.jpg",

			status: "wip",
			longDescription:
				"Designed for border security surveillance, this fixed-wing UAV features a custom-tuned PID controller running on the ArduPilot stack. It integrates a Raspberry Pi companion computer that processes video feeds in real-time using OpenCV to detect and track moving targets from 500ft altitude.",
			repoUrl: undefined,
			architectureImage: "",
			gallery: ["/images/uav-3.jpg", "/uav-2.mp4"],
			challenges: [
				"Tuning PID and guidance loops for stable flight with asymmetric loading and payloads.",
				"Maintaining reliable long-range telemetry and redundant comms (WebRTC + MAVProxy).",
				"Real-time target detection on an edge device (Raspberry Pi) with strict latency & power constraints.",
			],
		},
		{
			name: "Sign Language AI",
			type: "Academic",
			description:
				"TensorFlow gesture recognition model (90%+ accuracy) running on Raspberry Pi for real-time sign-to-text translation.",
			stack: ["Python", "TensorFlow", "Raspberry Pi", "OpenCV"],
			year: "2023",
			image: "",
			status: "offline",
			longDescription:
				"This project bridges the communication gap for the mute community. Using a camera module connected to a Raspberry Pi, the system uses a quantized TensorFlow Lite model to classify hand gestures into text. The text is then displayed on an OLED screen and spoken aloud via a TTS engine.",
			repoUrl: "https://github.com/username/sign-language-pi",
			architectureImage: "/images/signlang/ml-pipeline.png",
			gallery: [],
			challenges: [
				"Quantizing the TensorFlow model while preserving accuracy for edge inference.",
				"Handling lighting and background variability in real-time camera input.",
				"Optimizing for <300ms per-frame inference on constrained hardware.",
			],
		},
	],
};
