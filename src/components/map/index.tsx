import React, { useEffect } from "react";
import { renderMap } from "../../d3/map";
import { InputProject } from "../../d3/types";
import styles from "./index.module.css";

export function Map() {
    useEffect(() => {
        const projects: InputProject[] = [
            {
                projectId: 1,
                name: 'P1',
                description: 'PD1',
                link: 'P1',
                practices: [
                    {
                        practiceId: 1,
                        name: 'Practice 1',
                        description: 'Practice 1 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                    },
                ],
                technologies: [
                    {
                        technologyId: 1,
                        name: 'Tecnologia 1',
                        description: 'Tecnologia 1 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                    },
                    {
                        technologyId: 2,
                        name: 'Tecnologia 2',
                        description: 'Tecnologia 2 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                    },
                ],
            },
            {
                projectId: 2,
                name: 'P2',
                description: 'PD2',
                link: 'P2',
                practices: [
                    {
                        practiceId: 1,
                        name: 'Practice 1',
                        description: 'Practice 1 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                    },
                ],
                technologies: [
                    {
                        technologyId: 2,
                        name: 'Tecnologia 2',
                        description: 'Tecnologia 2 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                    },
                ],
            },
        ];
        renderMap(projects, {
            elemId: 'div-project-map-graph',
            circleSize: 50,
            linkStrokeWidth: 1,
            rainbowLinks: true,
            projectStrokeWidth: 1,
            projectStrokeColor: '#fff',
            projectBackgroundColor: '#3C5DAA',
            projectTextColor: '#fff',
            technologyStrokeWidth: 1,
            technologyStrokeColor: '#888',
            technologyBackgroundColor: '#fff',
            technologyNameColor: '#000',
            technologyCounterColor: '#EB8023',
            practiceStrokeWidth: 1,
            practiceStrokeColor: '#888',
            practiceBackgroundColor: '#fff',
            practiceNameColor: '#000',
            practiceCounterColor: '#EB8023',
            projectsPosRadius: Math.max(200, 50 + 20 * projects.length),
            showTechnologiesCount: true,
            showPracticesCount: true,
            maxZoomOutFactor: 1.3,
            startTechPractsRandomPosition: true,
        });
    }, []);

    return <div className={styles.container} id="div-project-map-graph" />
}
