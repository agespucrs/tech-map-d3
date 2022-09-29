import * as d3 from 'd3';
import appendPracticeNodes, { PracticeNode } from "./practice-node";
import appendProjectNodes, { ProjectNode } from "./project-node";
import appendTechnologyNodes, { TechnologyNode } from "./technology-node";
import { appendTooltip } from "./tooltip";
import appendLinkNodes from "./link-node";
import { drag, seedRand } from "./util";
import { InputPractice, InputProject, InputTechnology, InternalPractice, InternalTechnology, Node } from "./types";

const defaultOptions = {
  nodeSize: 50,
  startTechPractsRandomPosition: true,
  maxZoomOutFactor: 1.3,
  rainbowStrokes: true,

  linkStrokeWidth: 1,
  
  projectStrokeWidth: 1,
  projectStrokeColor: '#fff',
  projectBackgroundColor: '#3C5DAA',
  projectTextColor: '#fff',
  projectEachOtherDistance: 10,
  projectMinRadius: 200,
  projectShowTechnologiesCount: true,
  projectShowPracticesCount: true,
  
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
};

export interface ProjectMapOptions {
	elemId: string;
	nodeSize?: number;
	startTechPractsRandomPosition?: boolean;
	maxZoomOutFactor?: number;
	rainbowStrokes?: boolean;

	linkStrokeWidth?: number;

	projectStrokeWidth?: number;
	projectStrokeColor?: string;
	projectBackgroundColor?: string;
	projectTextColor?: string;
	projectEachOtherDistance?: number;
  projectMinRadius?: number;
	projectShowTechnologiesCount?: boolean;
	projectShowPracticesCount?: boolean;

	technologyStrokeWidth?: number;
	technologyStrokeColor?: string;
	technologyBackgroundColor?: string;
	technologyNameColor?: string,
	technologyCounterColor?: string,
	practiceStrokeColor?: string,

	practiceStrokeWidth?: number,
	practiceBackgroundColor?: string,
	practiceNameColor?: string,
	practiceCounterColor?: string,
}

export function renderMap(projects: InputProject[], inOpts: ProjectMapOptions) {
  const opts = Object.assign({}, defaultOptions, inOpts)

  // Prepare data

  let id = 0;
  const projectIdMapper: {[project_id: number]: number} = {};
  const technologyIdMapper: {[technology_id: number]: number} = {};
  const practicesIdMapper: {[practice_id: number]: number} = {};

  const inputTechnologies = projects.reduce((a, p) => a.concat(p.technologies), [] as InputTechnology[]);
  const uniqueInputTechnologies: InputTechnology[] = Object.values(inputTechnologies.reduce((acc,cur)=>Object.assign(acc,{[cur.technologyId]:cur}),{}));
  const technologies: InternalTechnology[] = uniqueInputTechnologies.map(technology => ({
    ...technology,
    projects: projects.filter(project => project.technologies.find(t => t.technologyId === technology.technologyId))
  }));

  const inputPractices = projects.reduce((a, p) => a.concat(p.practices), [] as InputPractice[]);
  const uniqueInputPractices: InputPractice[] = Object.values(inputPractices.reduce((acc,cur)=>Object.assign(acc,{[cur.practiceId]:cur}),{}));
  const practices: InternalPractice[] = uniqueInputPractices.map(practice => ({
    ...practice,
    projects: projects.filter(project => project.practices.find(t => t.practiceId === practice.practiceId))
  }));

  const projectTechCountMap: {[id: number]: number} = {};
  projects.filter(p => p.technologies).forEach(p => p.technologies.forEach(t => {
    if (!projectTechCountMap[t.technologyId]) projectTechCountMap[t.technologyId] = 0;
    projectTechCountMap[t.technologyId]++;
  }))
  
  const projectPracticeCountMap: {[id: number]: number} = {};
  projects.filter(p => p.practices).forEach(p => p.practices.forEach(t => {
    if (!projectPracticeCountMap[t.practiceId]) projectPracticeCountMap[t.practiceId] = 0;
    projectPracticeCountMap[t.practiceId]++;
  }))

  const projectNodes: ProjectNode[] = projects.map(x => ({...x, id: id++}));
  const technologyNodes: TechnologyNode[] = technologies.map(x => ({...x, id: id++}));
  const practiceNodes: PracticeNode[] = practices.map(x => ({...x, id: id++}));
  projectNodes.map(x => projectIdMapper[x.projectId] = x.id);
  technologyNodes.map(x => technologyIdMapper[x.technologyId] = x.id);
  practiceNodes.map(x => practicesIdMapper[x.practiceId] = x.id);

  const projectRadius = Math.max(opts.projectMinRadius, opts.projectEachOtherDistance * projects.length / 2 * Math.PI);

  const nodes = 
    technologyNodes.map(n => Object.assign(n, {
      x: opts.startTechPractsRandomPosition ? seedRand(n.technologyId.toString()) * 100 : 0,
      y: opts.startTechPractsRandomPosition ? seedRand((-n.technologyId).toString()) * 100 : 0,
    }) as Node).concat(
    practiceNodes.map(n => Object.assign(n, {
      x: opts.startTechPractsRandomPosition ? seedRand(n.practiceId.toString()) * 100 : 0,
      y: opts.startTechPractsRandomPosition ? seedRand((-n.practiceId).toString()) * 100 : 0,
    }) as Node)).concat(
    projectNodes.map((n, i) => Object.assign(n, {
      fx: (projectNodes.length === 1 ? 0 : Math.cos((i / projectNodes.length) * 2 * Math.PI)) * projectRadius,
      fy: (projectNodes.length === 1 ? 0 : Math.sin((i / projectNodes.length) * 2 * Math.PI)) * projectRadius,
    }) as Node));
  
  const links = projects
  .reduce((a, p) => a.concat(
    p.technologies ? p.technologies.map(t => ({
      source: projectIdMapper[p.projectId],
      target: technologyIdMapper[t.technologyId],
    })) : []
  ).concat(
    p.practices ? p.practices.map(t => ({
      source: projectIdMapper[p.projectId],
      target: practicesIdMapper[t.practiceId],
    })) : []
  ), [] as {source: number, target: number}[]) as unknown as {source: ProjectNode, target: TechnologyNode & PracticeNode}[];

  const N = d3.map(nodes, d => d.id);

  const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(({index: i}) => N[i!]))
  .force('charge', d3.forceCollide(n => 'projectId' in n ? 50 : 35))
  .on('tick', () => {
    link
    .attr('x1', d => d.source.x!)
    .attr('y1', d => d.source.y!)
    .attr('x2', d => d.target.x!)
    .attr('y2', d => d.target.y!);

    pNode
    .attr('x', function (d) { return d.x! - this.width.baseVal.value/2 })
    .attr('y', function (d) { return d.y! - this.height.baseVal.value/2 });
    
    tNode
    .attr('x', function (d) { return d.x! - this.width.baseVal.value/2 })
    .attr('y', function (d) { return d.y! - this.height.baseVal.value/2 });
    
    prNode
    .attr('x', function (d) { return d.x! - this.width.baseVal.value/2 })
    .attr('y', function (d) { return d.y! - this.height.baseVal.value/2 });
  });

  const container = d3.select('#' + opts.elemId);

  container
  .selectChildren()
  .remove();

  const content = container
  .append('div')
    .style('position', 'relative')
    .style('overflow', 'hidden');

  const tooltip = appendTooltip(content);

  const maxZoomOut = projectRadius * 2 * opts.maxZoomOutFactor;
  const zoom = d3
  .zoom()
  .scaleExtent([0.5, 40])
  .translateExtent([
    [-maxZoomOut, -maxZoomOut],
    [maxZoomOut, maxZoomOut]
  ])
  .on('zoom', ({transform}) => g.attr('transform', transform));
  
  const svg = content
  .append('svg')
    .attr('viewBox', `0 0 ${maxZoomOut} ${maxZoomOut}`)
    .style('width', '100%')
    .style('height', '100%');

  const g = svg
  .append('g')
    .attr('cursor', 'grab')

  zoom.transform(svg as any, d3.zoomIdentity.translate(projectRadius * opts.maxZoomOutFactor, projectRadius * opts.maxZoomOutFactor));
  svg.call(zoom as any);

  const linksNode = g
  .append('g')
    .attr('class', 'links')
    .style('stroke-width', opts.linkStrokeWidth)
  
  const {link} = appendLinkNodes(
    linksNode, 
    links,
    opts,
  );

  const technologiesNode = g.append('g').attr('class', 'nodes');
  const practicesNode = g.append('g').attr('class', 'nodes');
  const projectsNode = g.append('g').attr('class', 'nodes');

  const {tNode} = appendTechnologyNodes(
    technologiesNode,
    technologyNodes,
    projectTechCountMap,
    (event, d) => {
      tooltip.show(event.clientX-10, event.clientY-10, s => {
        const titleElem = s
        .append('div')
          .style('display', 'flex');
        d.imageLink && titleElem
        .append('img')
          .attr('src', d.imageLink)
          .style('object-fit', 'cover')
          .attr('width', 20)
          .attr('height', 20)
        titleElem
        .append('p')
          .style('text-align', 'center')
          .style('font-weight', 'bold')
          .style('flex', '1')
          .text(d.name)
        s.append('p').style('text-align', 'justify').text(d.description)
        if (typeof d.links === 'string') {
          d.links.split(/[\n,]/).forEach(link => s
            .append('a').attr('href', link).attr('target', '_blank').style('display', 'block').text(link)
          )
        }
      })
    },
    opts,
  );
  tNode.call(drag(simulation) as any)

  const {prNode} = appendPracticeNodes(
    practicesNode,
    practiceNodes,
    projectPracticeCountMap,
    (event, d) => {
      tooltip.show(event.clientX-10, event.clientY-10, s => {
        const titleElem = s
        .append('div')
          .style('display', 'flex');
          d.imageLink && titleElem
        .append('img')
          .attr('src', d.imageLink)
          .style('object-fit', 'cover')
          .attr('width', 20)
          .attr('height', 20)
        titleElem
        .append('p')
          .style('text-align', 'center')
          .style('font-weight', 'bold')
          .style('flex', '1')
          .text(d.name)
        s.append('p').style('text-align', 'justify').text(d.description)
        if (typeof d.links === 'string') {
          d.links.split(/[\n,]/).forEach(link => s
            .append('a').attr('href', link).attr('target', '_blank').style('display', 'block').text(link)
          )
        }
      })
    },
    opts,
  );
  prNode.call(drag(simulation) as any)
  
  const {pNode} = appendProjectNodes(
    projectsNode,
    projectNodes, 
    function(event: MouseEvent, d: ProjectNode) {
      tooltip.show(event.clientX-10, event.clientY-10, s => {
        s
        .append('p')
          .style('text-align', 'center')
          .style('font-weight', 'bold')
          .text(d.name)
        s
        .append('p')
          .style('text-align', 'justify')
          .text(d.description)
        s
        .append('a')
          .attr('href', d.link)
          .attr('target', '_blank')
          .style('display', 'block')
          .text(d.link)
      })
    },
    (_, d) => unhighlighted(d, x => x.style('opacity', '0.05')),
    (_, d) => unhighlighted(d, x => x.style('opacity', '1')),
    opts,
  );
  
  function unhighlighted(d: InputProject, cb: (x: d3.Selection<any, any, any, any>) => void) {
    cb(linksNode.selectAll('line:not([project="' + d.projectId + '"])'));
    cb(projectsNode.selectAll('svg:not([project="' + d.projectId + '"])'));
    cb(technologiesNode.selectAll(d.technologies && d.technologies.length > 0 ?
      'svg:not(' + d.technologies.map(t => '[technology|="' + t.technologyId + '"]').join(',') + ')'
      : 'svg'
    ));
    cb(practicesNode.selectAll(d.practices && d.practices.length > 0 ?
      'svg:not(' + d.practices.map(t => '[practice|="' + t.practiceId + '"]').join(',') + ')'
      : 'svg'
    ));
  }
}
