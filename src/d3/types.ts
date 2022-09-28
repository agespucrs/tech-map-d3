import { SimulationNodeDatum } from "d3";

export interface Node extends SimulationNodeDatum {id: number}

// Input

export interface InputTechnology {
    technologyId: number;
    name: string;
    description: string;
    links: string;
    imageLink?: string;
}

export interface InputPractice {
    practiceId: number;
    name: string;
    description: string;
    links: string;
    imageLink?: string;
}

export interface InputProject {
    projectId: number;
    name: string;
    description: string;
    link: string;
    technologies: InputTechnology[];
    practices: InputPractice[];
}

// Internal

export interface InternalTechnology extends InputTechnology {
    projects: InputProject[];
}

export interface InternalPractice extends InputPractice {
    projects: InputProject[];
}
