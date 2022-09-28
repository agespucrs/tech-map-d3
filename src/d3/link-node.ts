import { PracticeNode } from "./practice-node"
import { ProjectNode } from "./project-node"
import { TecnologyNode } from "./technology-node"
import { randomColor } from "./util"

export default function appendLinkNodes(
  container: d3.Selection<any, any, any, any>, 
  links: {source: ProjectNode, target: TecnologyNode & PracticeNode}[],
  opts: {
    rainbowLinks: boolean,
    technologyStrokeColor: string,
    practiceStrokeColor: string,
  }
) {
  const link = container
  .selectAll('line')
  .data(links)
  .enter()
  .append('line')
    .attr('project', d => d.source.projectId)
    .attr('technology', d => d.target.technologyId)
    .attr('practice', d => d.target.practiceId)
    .style('stroke', d => opts.rainbowLinks ? randomColor(
      d.target.technologyId != null
      ? d.target.technologyId 
      : d.target.practiceId
    ) : opts.technologyStrokeColor)
  return {
    link,
  }
}