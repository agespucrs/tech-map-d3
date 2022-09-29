import React from "react";
import { ProjectMapOptions } from "../../d3/map";
import { InputPractice, InputProject, InputTechnology } from "../../d3/types";
import { Header } from "../Header";
import { Map } from "../Map";
import styles from "./index.module.css";

export function App() {
    const scrumPractice: InputPractice = {
        practiceId: 1,
        name: 'SCRUM',
        description: 'Scrum is a framework for project management that emphasizes teamwork, accountability and iterative progress toward a well-defined goal.',
        imageLink: 'https://www.kindpng.com/picc/m/53-539760_scrum-logo-hd-png-download.png',
        links: 'https://www.scrum.org/',
    };

    const typescriptTechnology: InputTechnology = {
        technologyId: 1,
        name: 'Typescript',
        description: 'Typescript',
        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
        links: 'https://www.typescriptlang.org/',
    };

    const postgresTechnology: InputTechnology = {
        technologyId: 2,
        name: 'Postgres SQL',
        description: 'PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley.',
        imageLink: 'https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png',
        links: 'https://www.postgresql.org/',
    };

    const projects: InputProject[] = [
        {
            projectId: 1,
            name: 'Example Project 1',
            description: 'This is an example project for tech-map-d3 demo, an open sounce ages library',
            link: 'https://www.ages.pucrs.br/',
            practices: [scrumPractice],
            technologies: [typescriptTechnology, postgresTechnology],
        },
        {
            projectId: 2,
            name: 'Example Project 1',
            description: 'This is an example project for tech-map-d3 demo, an open sounce ages library',
            link: 'https://www.ages.pucrs.br/',
            practices: [scrumPractice],
            technologies: [typescriptTechnology, postgresTechnology],
        },
        {
            projectId: 3,
            name: 'Example Project 3',
            description: 'This is an example project for tech-map-d3 demo, an open sounce ages library',
            link: 'https://www.ages.pucrs.br/',
            practices: [scrumPractice],
            technologies: [postgresTechnology],
        },
    ];

    const options: Partial<ProjectMapOptions> = {
        // Custom options here
    };

    return <div className={styles.container}>
        <Header />
        <Map projects={projects} options={options} />
    </div>
}
