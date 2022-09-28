import React, { useEffect } from "react";
import { renderMap } from "../../d3/map";
import { Project } from "../../models/project";

export function Map() {
    useEffect(() => {
        const projects: Project[] = [
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
                        project_practices: { projectId: 1 },
                        projects: [],
                    }
                ],
                technologies: [
                    {
                        technologyId: 1,
                        name: 'Tecnologia 1',
                        description: 'Tecnologia 1 description',
                        imageLink: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
                        links: 'https://www.typescriptlang.org/',
                        project_technologies: { projectId: 1 },
                        projects: [],
                    }
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

    return <div id="div-project-map-graph" />
}
