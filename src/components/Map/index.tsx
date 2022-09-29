import React, { useEffect, useState } from "react";
import { ProjectMapOptions, renderMap } from "../../d3/map";
import { InputProject } from "../../d3/types";
import styles from "./index.module.css";

export interface MapProps {
    projects: InputProject[];
    options: Omit<ProjectMapOptions, 'elemId'>;
}


export function Map({projects, options}: MapProps) {
    const [id] = useState(`__map-id-${Math.floor(Math.random() * 1000000000)}`);

    useEffect(() => {
        renderMap(projects, { ...options, elemId: id });
    }, [projects]);

    return <div className={styles.container} id={id} />
}
