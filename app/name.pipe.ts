import {Pipe, PipeTransform} from 'angular2/core';
//noinspection TypeScriptCheckImport
import _ from 'lodash';

@Pipe({name: 'namePipe', pure: false})
export class NamePipe implements PipeTransform {
    transform(value:any[], args:any[]){
        if(args[0]) {
            //noinspection TypeScriptUnresolvedFunction
            return _.sortBy(value, [args[1]]);
        } else {
            //noinspection TypeScriptUnresolvedFunction
            return _.sortBy(value, [args[1]]).reverse();
        }
    }
}