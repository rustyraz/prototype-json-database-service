// this will have a generic class that will have the CRUD methods for an entity
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuid } from "uuid";
import { Entity } from './Entity';

export class Collection<T extends Entity> {
    private fileName: string;
    private entities: T[] = [];

    constructor(dir: string, private name: string){
        this.fileName = join(dir, this.name + '.json');
        this.loadFile();
    }

    create(obj: object): string{
        const entity = { id: uuid() ,...obj } as T;
        this.entities.push(entity);
        this.writeToFile()
        return entity.id;
    }

    get(id: string): T{
        return this.entities.find((item) => item.id === id);
    }

    list(): T[]{
        return this.entities;
    }

    update(entity: T): boolean{
        const index = this.findIndexById(entity.id);
        this.entities[index] = entity;
        this.writeToFile();
        return true;
    }

    delete(id: string){
        const index = this.findIndexById(id);
        this.entities.splice(index, 1);
        this.writeToFile();
    }

    private findIndexById(id: string): number{
        const index = this.entities.findIndex((entity) => entity.id === id );
        if(index === -1){
            throw new Error(`No ${this.name} found with id "${id}"`);
        }

        return index;
    }

    private loadFile(){
        if(existsSync(this.fileName)){
            this.entities = JSON.parse(readFileSync(this.fileName, {encoding: 'utf-8'}));
        }
    }

    private writeToFile(){
        writeFileSync(this.fileName, JSON.stringify(this.entities, null, 2), {encoding: 'utf-8'});
    }
}