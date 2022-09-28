import { Project } from "./project";

export interface Practice {
  practiceId: number;
  name: string;
  description: string;
  links: string;
  imageLink?: string;
  projects: Project[];
  project_practices: {
    projectId: number;
  };
}
