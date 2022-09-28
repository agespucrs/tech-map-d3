import { Practice } from "../models/practice"
import appendIcon from "./icon"
import { Node, randomColor } from "./util"

export interface PracticeNode extends Node, Practice {}

export default function appendPracticeNodes(
  container: d3.Selection<any, any, any, any>, 
  practiceNodes: PracticeNode[], 
  projectCountMap: { [practiceId: number]: number },
  onClick: (event: MouseEvent, d: PracticeNode)=>void,
  opts: {
    circleSize: number,
    rainbowLinks: boolean,
    practiceStrokeColor: string,
    practiceStrokeWidth: number,
    practiceBackgroundColor: string,
    practiceNameColor: string,
    practiceCounterColor: string,
  }
) {
  const prNode = container
  .selectAll('image')
  .data(practiceNodes)
  .enter()
  .append('svg')
    .attr('width', opts.circleSize)
    .attr('height', opts.circleSize)
    .attr('practice', d => d.practiceId)
    .style('overflow', 'auto')

  prNode
  .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', opts.circleSize)
    .attr('height', opts.circleSize)
    .attr('fill', d => opts.rainbowLinks ? randomColor(d.practiceId) : opts.practiceStrokeColor)
    .on('click', onClick)
  
  prNode
  .append('rect')
    .attr('x', opts.practiceStrokeWidth)
    .attr('y', opts.practiceStrokeWidth)
    .attr('width', opts.circleSize - opts.practiceStrokeWidth * 2)
    .attr('height', opts.circleSize - opts.practiceStrokeWidth * 2)
    .attr('fill', opts.practiceBackgroundColor)
    .style('pointer-events', 'none')
  
  appendIcon<PracticeNode>(prNode, {
    size: opts.circleSize,
    rainbowColor: opts.rainbowLinks,
    color: opts.practiceStrokeColor,
    imageLink: d => d.imageLink,
    id: d => d.practiceId,
    name: d => d.name,
  });
  
  let nameNode = prNode
  .append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('font-size', 10)
    .attr('x', opts.circleSize / 2)
    .attr('y', opts.circleSize+2)
    .style('fill', opts.practiceNameColor)
    .style('pointer-events', 'none')
    .text(d => d.name)
  
  prNode
  .append('text')
    .attr('text-anchor', 'hanging')
    .attr('dominant-baseline', 'hanging')
    .attr('font-size', 10)
    .attr('font-weight', 'bold')
    .attr('x', (_, i) => 4 + opts.circleSize / 2 + nameNode.nodes()[i].getComputedTextLength() / 2)
    .attr('y', opts.circleSize+2)
    .style('fill', opts.practiceCounterColor)
    .style('pointer-events', 'none')
    .text(d => '(' + projectCountMap[d.practiceId] + ')')
  
  return {
    prNode,
  }
}