import { Technology } from "./technology";
import { Practice } from "./practice";

export interface Project {
  projectId: number;
  name: string;
  description: string;
  link: string;
  technologies: Technology[];
  practices: Practice[];
}
