import { existsSync, mkdirSync } from 'fs';
import { Collection } from './Collection';
import { Entity } from './Entity';

/**
 * We need to have a folder that we can put all out data files in
 * like data/
*/

export class DataStore {
    constructor(private dir: string){
        if(!existsSync(dir)){
            mkdirSync(dir);
        }
        this.dir = dir;
    }

    collection<T extends Entity> (name: string): Collection<T>{
        return new Collection<T>(this.dir, name);
    }


}
