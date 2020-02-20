import { Component, OnInit } from '@angular/core';
import { PointService } from '../services/point.service';
import { Router } from '@angular/router';
import { Punto } from '../models/punto';
import * as d3 from 'd3';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']
})
export class BarrasComponent implements OnInit {

  constructor(
    private service: PointService,
    private router: Router
  ) { }

  points: Punto[];
  lista = {};

  ngOnInit(): void {
    console.log('Entra');
    this.service.getPoints().subscribe(res => {
      this.points = res;
      for (let i = 0; i < this.points.length; i++) {
        this.lista[res[i].letter] = res[i].frequency;
      }
      this.showup();

      console.log(this.lista);
    }, err => {
      console.log(err);
    });
  }

  showup() {
    const margin = 100;
    const width = 1000 - 2 * margin;
    const height = 600 - 2 * margin;
    
    const svg = d3.select('svg');
    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);
    const barGroups = chart.selectAll()
    .data(this.points)
    .enter()
    .append('g')
    const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, .5]);

    chart.append('g')
    .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
    .range([0, width])
    .domain(this.points.map((s) => s.letter))
    .padding(0.2)

    chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
    chart.selectAll()
    .data(this.points)
    .enter()
    .append('rect')
    
    .attr('class', 'bar')
    .style('fill', '#80cbc4')
    .attr('x', (s) => xScale(s.letter))
    .attr('y', (s) => yScale(s.frequency))
    .attr('height', (s) => height - yScale(s.frequency))
    .attr('width', xScale.bandwidth())
    .attr('x', (actual, index, array) =>
    xScale(actual.letter))
    .on('mouseenter', function (actual, i) {
      d3.selectAll('.value')
        .attr('opacity', 0)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
        .attr('x', (a:Punto) => xScale(a.letter) - 5)
        .attr('width', xScale.bandwidth() + 10)

      const y = yScale(actual.frequency)

      var line = chart.append('line')
        .attr('stroke','#FED966')
        .attr('stroke-width','3')
        .attr('stroke-dasharray','3 6')
        .attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y)
        .attr('x2', width)
        .attr('y2', y)
      
      barGroups.append('text')
        .attr('class', 'divergence')
        .attr('x', (a,idx) => xScale(a.letter) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.frequency) + 30)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text((a, idx) => {
          const divergence = (a.frequency - actual.frequency).toFixed(2)
          
          let text = ''
          if ((a.frequency - actual.frequency) > 0) text += '+'
          text += `${divergence}%`

          return idx !== i ? text : '';
        })
        

    })
    .on('mouseleave', function () {
      d3.selectAll('.value')
        .attr('opacity', 1)
        
      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (a:Punto) => xScale(a.letter))
        .attr('width', xScale.bandwidth())

      chart.selectAll('#limit').remove()
      chart.selectAll('.divergence').remove()
    })
    barGroups 
      .append('text')
      .attr('class', 'value')
      .attr('color','white')
      .attr('x', (a) => xScale(a.letter) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.frequency) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.frequency}%`)

    chart.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(yScale)
        .scale(yScale)
        .tickSize(-width)
        .tickFormat(x=>''))

        svg.append('text')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Frecuencia')
    
    svg.append('text')
        .attr('x', width / 2 + margin)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text('Letras')

    

   
        
  }

}
