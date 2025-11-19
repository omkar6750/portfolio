export type Project = {
	name: string;
	type: string;
	description: string;
	stack: string[];
	year: string;
	image: string;
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
