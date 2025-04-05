export class List {
    list_id: number | null = null;
    title: string = '';
   
    constructor(init?:Partial<List>) {
        Object.assign(this, init);
    }
}
