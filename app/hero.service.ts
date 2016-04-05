import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import _ from 'lodash';

@Injectable()
export class HeroService {
    addHero(heroToAdd){
        let tempSort = _.sortBy(HEROES, 'id');
        let tempId = tempSort[tempSort.length-1].id + 1;
        HEROES.push({name: heroToAdd, id: tempId});
    }
    getHeroes() {
        return Promise.resolve(HEROES);
    }
    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve =>
            setTimeout(()=>resolve(HEROES), 3000)
        );
    }
}