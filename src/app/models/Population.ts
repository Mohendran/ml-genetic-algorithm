import * as _ from 'lodash';
import { DNA } from './DNA';

export class Population {

    creatures: DNA[] = [];

    creaturesPossibility: DNA[] = [];

    generationNo: number = 0;

    finishedEvolving: boolean = false;
    
    bestGuess: DNA;

    constructor(private target: string[], private mutationRate: number, private populationMax: number) {
    }

    initializePopulation(): void {
        this.generationNo = 0;
        this.finishedEvolving = false;
        this.creatures = _.map(_.range(0, this.populationMax), (creatureIndex: number) => new DNA(this.target.length));
    }

    calculateFitness(): void {
        _.forEach(this.creatures, (creature: DNA) => {
            creature.checkFitness(this.target);
        });
    }

    selection(): void {
        this.creaturesPossibility = [];

        this.calculateFitness();

        const maxFitness: number = _.maxBy(this.creatures, 'fitness').fitness;

        _.forEach(this.creatures, (creature: DNA) => {
            let fitness: number = _.floor(creature.fitness / maxFitness * 100);
            fitness = fitness * fitness;
            _.forEach(_.range(fitness), () => {
                this.creaturesPossibility.push(creature);
            })
        });
    }

    reproduce(): void {

        const newPopulation = [];
        _.forEach(_.range(this.creatures.length), (i: number) => {
            let randomA: number = (_.random(this.creaturesPossibility.length) || 1)  - 1;
            const randomB: number = (_.random(this.creaturesPossibility.length) || 1) - 1;
            if (randomA === randomB) {
                randomA = (_.random(this.creaturesPossibility.length) || 1) - 1;
            }
            const parentA: DNA = this.creaturesPossibility[randomA];
            const parentB: DNA = this.creaturesPossibility[randomB];
    
            const child: DNA = parentA.crossOver(parentB);
            child.mutate(this.mutationRate);
            newPopulation.push(child);
        });
        this.creatures = newPopulation;
        this.calculateFitness();
        this.generationNo++;
    }

    evaluate(): DNA {
        let bestFitness: number = 0;
        _.forEach(this.creatures, (creature: DNA) => {
            if (bestFitness <= creature.fitness) {
                this.bestGuess = creature;
                bestFitness = creature.fitness;
            }
        });
        const value = _.find(this.creatures, (creature: DNA) => creature.genes.toString() === this.target.toString());
        this.finishedEvolving = !!value;

        return this.bestGuess;
    }

}