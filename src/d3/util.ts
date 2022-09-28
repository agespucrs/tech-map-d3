import { Simulation } from "d3";

import * as d3 from 'd3';
import { Node } from "./types";
		
export function randomColor(seed: number) {
  return 'hsl(' + (1 + seedRand(seed.toString()) * (359)) + ',100%,40%)';
}

// xmur3
export function seedRand(str: string) {
  for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
      h = h << 13 | h >>> 19;
  }
  h = Math.imul(h ^ h >>> 16, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  return ((h ^= h >>> 16) >>> 0) / Math.pow(2, 32);
}

export function drag(simulation: Simulation<Node, undefined>) {
  function dragstarted(event: d3.D3DragEvent<any, any, any>) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event: d3.D3DragEvent<any, any, any>) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event: d3.D3DragEvent<any, any, any>) {
    if (!event.active) simulation.alphaTarget(0);
  }
  
  return d3
  .drag()
  .on('start', dragstarted)
  .on('drag', dragged)
  .on('end', dragended);
}

export function initials(name: string) {
  const first = name[0].toUpperCase();
  let i = 2;
  for (; i < name.length; i++) {
    if (name[i-1] === ' ') break;
  }
  const last = name[i];
  return first + (last ? last : '');
}
