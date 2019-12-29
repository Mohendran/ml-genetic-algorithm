import * as _ from 'lodash';

export class DNA {

    genes: string[];

    fitness: number;

    constructor(lengthOfTarget: number) {
        this.genes = _.map(_.range(lengthOfTarget), () => this.getChar());
    }

    getChar(): string {
        const ascii: number = _.random(32, 122);
        return String.fromCharCode(ascii);
    }

    checkFitness(target: string[]): void {
        this.fitness = _.reduce(target, (sum: number, char: string, index: number) => {
            return sum + (char === this.genes[index] ? 1 : 0);
        }, 0);
    }

    crossOver(mate: DNA): DNA {
        const child: DNA = new DNA(mate.genes.length);

        const midPoint: number = _.random(mate.genes.length);

        child.genes = [..._.slice(this.genes, 0, midPoint), ..._.slice(mate.genes, midPoint, mate.genes.length)];

        // child.genes = [this.genes[0], this.genes[1], this.genes[2], this.genes[3]];

        return child;
    } 

    mutate(mutationRate: number): void {
        const genePosition: number = _.random(this.genes.length);
        _.forEach(this.genes, (char: string, i: number) => {
            const randomRate = _.random(100) / 100;
            if (randomRate < mutationRate) {
                this.genes[i] = this.getChar();
            }
        });
    }

}