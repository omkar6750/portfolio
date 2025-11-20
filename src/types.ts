export type Project = {
	name: string;
	type: string;
	description: string;
	stack: string[];
	year: string;
	image: string;
	status?: "live" | "wip" | "offline";

	// --- New Fields for Overlay ---
	longDescription?: string; // A longer summary for the modal
	liveUrl?: string; // Link to live site
	repoUrl?: string; // Link to GitHub
	architectureImage?: string; // URL to a system diagram
	gallery?: string[]; // Array of screenshot URLs
	challenges?: string[]; // (Optional) List of technical hurdles
};

export type ProjectsMap = Record<string, Project[]>;

export type FlattenedProject = Project & {
	category: string;
	id: string;
};

export type ProjectCategory = "personal" | "freelance" | "academic";

export type ProjectsData = {
	[key: string]: Project[];
};
