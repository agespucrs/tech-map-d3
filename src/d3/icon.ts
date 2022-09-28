import { initials, randomColor } from "./util";

export default function appendIcon<T>(selection: d3.Selection<any, T, any, any>, opts: {
    size: number;
    rainbowColor: boolean;
    color: string;
    imageLink: (d: T)=>string|undefined;
    id: (d: T)=>number;
    name: (d: T)=>string;
}) {
    const stringExists = (str?: string) => str ? str.length > 0 : false;
    const fontSize = opts.size * 0.5;
    selection
    .filter(d => !stringExists(opts.imageLink(d)))
    .append('text')
        .attr('x', opts.size / 2)
        .attr('y', opts.size / 2 + fontSize / 3)
        .attr('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .style('font-size', fontSize + 'px')
        .style('font-weight', 'bold')
        .style('fill', d => opts.rainbowColor ? randomColor(opts.id(d)) : opts.color)
        .text(d => initials(opts.name(d)))

    selection
    .filter(d => stringExists(opts.imageLink(d)))
    .append('image')
        .attr('xlink:href', d => opts.imageLink(d)!)
        .attr('x', opts.size * 0.175)
        .attr('y', opts.size * 0.175)
        .attr('width', opts.size * 0.65)
        .attr('height', opts.size * 0.65)
        .style('pointer-events', 'none')
}
