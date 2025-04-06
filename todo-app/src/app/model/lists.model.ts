import { TaskStats } from "./stats.model";

export class List {
    list_id: number | null = null;
    title: string = '';
    stats?: TaskStats;
   
    constructor(init?:Partial<List>) {
        Object.assign(this, init);
    }
}
