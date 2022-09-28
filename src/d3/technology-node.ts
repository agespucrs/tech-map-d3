import { Technology } from "../models/technology"
import appendIcon from "./icon"
import { Node, randomColor } from "./util"

export interface TecnologyNode extends Node, Technology {}

export default function appendTechnologyNodes(
  container: d3.Selection<any, any, any, any>, 
  technologyNodes: TecnologyNode[], 
  projectCountMap: { [technologyId: number]: number },
  onClick: (event: MouseEvent, d: TecnologyNode)=>void,
  opts: {
    circleSize: number,
    rainbowLinks: boolean,
    technologyStrokeColor: string,
    technologyStrokeWidth: number,
    technologyBackgroundColor: string,
    technologyNameColor: string,
    technologyCounterColor: string,
  }
) {
  const tNode = container
  .selectAll('image')
  .data(technologyNodes)
  .enter()
  .append('svg')
    .attr('width', opts.circleSize)
    .attr('height', opts.circleSize)
    .attr('technology', d => d.technologyId)
    .style('overflow', 'auto')

  tNode
  .append('circle')
    .attr('cx', opts.circleSize / 2)
    .attr('cy', opts.circleSize / 2)
    .attr('r', opts.circleSize / 2)
    .attr('fill', d => opts.rainbowLinks ? randomColor(d.id) : opts.technologyStrokeColor)
    .on('click', onClick)
  
  tNode
  .append('circle')
    .attr('cx', opts.circleSize / 2)
    .attr('cy', opts.circleSize / 2)
    .attr('r', opts.circleSize / 2 - opts.technologyStrokeWidth)
    .attr('fill', opts.technologyBackgroundColor)
    .style('pointer-events', 'none')
  
  appendIcon<TecnologyNode>(tNode, {
    size: opts.circleSize,
    rainbowColor: opts.rainbowLinks,
    color: opts.technologyStrokeColor,
    imageLink: d => d.imageLink,
    id: d => d.technologyId,
    name: d => d.name,
  });
  
  let nameNode = tNode
  .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('font-size', 10)
    .attr('x', opts.circleSize / 2)
    .attr('y', opts.circleSize+2)
    .style('fill', opts.technologyNameColor)
    .style('pointer-events', 'none')
    .text(d => d.name)
  
  tNode
  .append('text')
    .attr('text-anchor', 'hanging')
    .attr('dominant-baseline', 'hanging')
    .attr('font-size', 10)
    .attr('font-weight', 'bold')
    .attr('x', (_, i) => 4 + opts.circleSize / 2 + nameNode.nodes()[i].getComputedTextLength() / 2)
    .attr('y', opts.circleSize+2)
    .style('fill', opts.technologyCounterColor)
    .style('pointer-events', 'none')
    .text(d => '(' + projectCountMap[d.technologyId] + ')')
  
  return {
    tNode,
  }
}