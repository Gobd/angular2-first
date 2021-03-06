import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {NamePipe} from './name.pipe';

@Component({
        styles:[`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .heroes {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .heroes li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .heroes li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .heroes li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .heroes .text {
        position: relative;
        top: -3px;
      }
      .heroes .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
    `],
    selector: 'my-app',
    template:`
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <button (click)="sortVal = !sortVal">{{sortVal ? 'Desc' : 'Asc'}}</button>
    <button (click)="sortBy = 'id'" [style.color]="sortBy === 'id' ? 'red' : '#888'">id</button>
    <button (click)="sortBy = 'name'" [style.color]="sortBy === 'name' ? 'red' : '#888'">name</button>
    <ul class="heroes">
      <li *ngFor="#hero of (heroes | namePipe : sortVal : sortBy)"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    <input type="text" placeholder="Add Hero" [(ngModel)]="heroToAdd">
    <button (click)="addHero(heroToAdd)">Add Hero</button>
  `,
    directives: [HeroDetailComponent],
    providers: [HeroService],
    pipes: [NamePipe]
})

export class AppComponent implements OnInit {
    sortVal = false;
    heroes;
    addHero(heroToAdd) {
        this._heroService.addHero(heroToAdd);
    }
    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes()
    }
    constructor(private _heroService: HeroService) { }
    title = 'Tour of Heroes';
    onSelect(hero: Hero) { this.selectedHero = hero; }
    selectedHero: Hero;
}