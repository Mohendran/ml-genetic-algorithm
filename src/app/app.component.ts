import { Component, ChangeDetectorRef } from '@angular/core';
import { Population } from './models/Population';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  shakespeareText: string[];

  mutationRate: number = 0.01;

  populationMax: number = 100;

  population: Population;

  closestMatch: string;

  stop = false;

  constructor(private cdRef: ChangeDetectorRef) {
    this.shakespeareText = 'To be, Or not to be'.split('');
    this.population = new Population(this.shakespeareText, this.mutationRate, this.populationMax);
  }

  ngOnInit(): void {

    let value;

    // Initilialize Population
    this.population.initializePopulation();

    while(!this.population.finishedEvolving) {

      // if (!this.stop) {

        // Select the Fittest (Survival of the fittest)
        this.population.selection();

        // Reproduce
        this.population.reproduce();

        // Evaluate
        this.closestMatch = this.population.evaluate().genes.join('');
        // console.log(this.closestMatch);

        console.log(this.population.generationNo, this.closestMatch);

        this.cdRef.detectChanges();

      // }

    }

  }

  trigger(): void {
    this.ngOnInit();
  }

}
