# Tech Map D3
Biblioteca para visualizar a relação de tecnologias, práticas e projetos em uma mapa interativo usando d3.js

## Live Preview (Demo)

[Abrir Live Preview](https://agespucrs.github.io/tech-map-d3/)

## Uso

Basta chamar a função `renderMap` para renderizar o mapa.

## Mapa

![](docs/screenshot.png)

## Tipos

```ts
renderMap(projects: InputProject[], options: ProjectMapOptions);
```

InputProject:
```ts
{
    projectId: number;
    name: string;
    description: string;
    link: string;
    technologies: InputTechnology[];
    practices: InputPractice[];
}
```

InputPractice:
```ts
{
    practiceId: number;
    name: string;
    description: string;
    links: string;
    imageLink?: string;
}
```

InputTechnology:
```ts
{
    technologyId: number;
    name: string;
    description: string;
    links: string;
    imageLink?: string;
}
```

ProjectMapOptions (todos os campos possuem um valor default, o único campo obrigatório é o `elemId`):
```ts
{
	elemId: string; // Id do elemento onde o mapa será renderizado
	nodeSize?: number; // Tamanho dos nodos de tecnologia e prática
	startTechPractsRandomPosition?: boolean; // Iniciar tecnologias práticas em posições aleatórias
	maxZoomOutFactor?: number; // Máximo de zoom que o usuário pode executar para fora
	rainbowStrokes?: boolean; // Linhas aleatoriamente coloridas se baseando nos IDs

	linkStrokeWidth?: number; // Espessura das linhas que conectam os nodos

	projectStrokeWidth?: number; // Espessura do contorno do projeto
	projectStrokeColor?: string; // Cor do contorno do projeto
	projectBackgroundColor?: string; // Cor de fundo do projeto
	projectTextColor?: string; // Cor do texto do projeto
	projectEachOtherDistance?: number; // Distância entre um projeto e outro
    projectMinRadius?: number; // Tamanho mínimo de um projeto
	projectShowTechnologiesCount?: boolean; // Mostrar contagem de tecnologias ou não no projeto
	projectShowPracticesCount?: boolean; // Mostrar contagem de práticas ou não no projeto

	technologyStrokeWidth?: number; // Espessura do contorno da tecnologia
	technologyStrokeColor?: string; // Cor do contorno da tecnologia
	technologyBackgroundColor?: string; // Cor de fundo da tecnologia
	technologyNameColor?: string, // Cor do nome da tecnologia
	technologyCounterColor?: string, // Cor da contagem de projetos que a tecnologia está associada

	practiceStrokeWidth?: number, // Espessura do contorno da prática
	practiceStrokeColor?: string, // Cor do contorno da prática
	practiceBackgroundColor?: string, // Cor de fundo da prática
	practiceNameColor?: string, // Cor do nome da prática
	practiceCounterColor?: string, // Cor da contagem de projetos que a prática está associada
}
```
