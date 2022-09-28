import { BaseType } from "d3";

export function appendTooltip(container: d3.Selection<any, any, any, any>) {
	const tooltipOverlay = container
	.append('div')
		.attr('id', 'div-project-map-tooltip-overlay')
		.style('width', '100%')
		.style('height', '100%')
		.style('position', 'absolute')
		.style('pointer-events', 'none')

	const tooltip = container
	.append('div')
		.attr('id', 'div-project-map-tooltip')
		.attr('class', 'tooltip')
		.style('opacity', 0.9)
		.style('display', 'none')
		.style('position', 'fixed')
		.style('background-color', 'white')
		.style('max-width', '250px')
		.style('max-height', '300px')
		.style('overflow-x', 'hidden')
		.style('overflow-y', 'auto')
		.style('height', 'auto')
		.style('padding', '10px')
		.style('border-style', 'solid')
		.style('border-radius', '4px')
		.style('border-width', '1px')
		.style('box-shadow', '3px 3px 10px rgba(0, 0, 0, .5)')
	
	tooltipOverlay.on('mousemove', () => {
		tooltipOverlay.style('pointer-events', 'none')
		tooltip.style('display', 'none')
	});

	return {
		show(x: number, y: number, onMount: (selection: d3.Selection<any, any, any, any>)=>void) {
			tooltip.selectChildren().remove()
			tooltip
			.style('display', 'block')
			.style('left', x + 'px')
			.style('top', y + 'px')
			onMount(tooltip)
			tooltip.node()!.scrollTo(0, 0);
			tooltipOverlay.style('pointer-events', 'visible')
		}
	};
}