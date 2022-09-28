import { Project } from "./project";

export interface Technology {
  technologyId: number;
  name: string;
  description: string;
  links: string;
  imageLink?: string;
  projects: Project[];
  project_technologies: {
    projectId: number;
  };
}
