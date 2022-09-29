import { Node, InputProject } from "./types";

export interface ProjectNode extends Node, InputProject {}

export default function appendProjectNodes(
  container: d3.Selection<any, any, any, any>, 
  projectNodes: ProjectNode[], 
  onClick: (event: MouseEvent, d: ProjectNode)=>void,
  onMouseOver: (event: MouseEvent, d: ProjectNode)=>void,
  onMouseOut: (event: MouseEvent, d: ProjectNode)=>void,
  opts: {
    projectStrokeWidth: number,
    projectTextColor: string,
    projectStrokeColor: string,
    projectBackgroundColor: string,
    projectShowTechnologiesCount: boolean,
    projectShowPracticesCount: boolean,
  }
) {
  let height = 16;
  if (opts.projectShowTechnologiesCount) height += 16;
  if (opts.projectShowPracticesCount) height += 16;

  const pNode = container
    .selectAll('image')
    .data(projectNodes)
    .enter()
    .append('svg')
      .attr('width', 100)
      .attr('height', height)
      .attr('project', d => d.projectId)
      .style('overflow', 'auto')
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut)
  
  const pNodeRect1 = pNode
  .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .on('click', onClick)
  
  const pNodeRect2 = pNode
  .append('rect')
    .attr('x', opts.projectStrokeWidth)
    .attr('y', opts.projectStrokeWidth)
    .style('pointer-events', 'none')

  pNode
  .append('text')
    .attr('text-anchor', 'hanging')
    .attr('dominant-baseline', 'hanging')
    .attr('font-size', 12)
    .attr('x', 3)
    .attr('y', 3)
    .style('fill', opts.projectTextColor)
    .style('pointer-events', 'none')
    .text(d => d.name);

  let curY = 20;
  if (opts.projectShowTechnologiesCount) {
    pNode
    .append('text')
      .attr('text-anchor', 'hanging')
      .attr('dominant-baseline', 'hanging')
      .attr('font-size', 10)
      .attr('x', 3)
      .attr('y', curY)
      .style('fill', opts.projectTextColor)
      .style('pointer-events', 'none')
      .text(d => (d.technologies ? d.technologies.length : '-') + ' Tecnologias');
    curY += 16;
  }
  
  if (opts.projectShowPracticesCount) {
    pNode
    .append('text')
      .attr('text-anchor', 'hanging')
      .attr('dominant-baseline', 'hanging')
      .attr('font-size', 10)
      .attr('x', 3)
      .attr('y', curY)
      .style('fill', opts.projectTextColor)
      .style('pointer-events', 'none')
      .text(d => (d.practices ? d.practices.length : '-') + ' Práticas');
    curY += 16;
  }

  pNode.attr('width', function () {
    return 6 + Math.max(...Array.from(this.querySelectorAll('text')).map(x => x.getComputedTextLength()))
  });
  
  // Esses sets de estilo precisam estar depois do attr width do pNode

  pNodeRect1
    .style('width', '100%')
    .style('height', '100%')
    .style('fill', opts.projectStrokeColor)
  
  pNodeRect2
    .style('width', `calc(100% - ${opts.projectStrokeWidth*2}px)`)
    .style('height', `calc(100% - ${opts.projectStrokeWidth*2}px)`)
    .style('fill', opts.projectBackgroundColor)
  
  return {
    pNode,
    pNodeRect1,
    pNodeRect2,
  }
}