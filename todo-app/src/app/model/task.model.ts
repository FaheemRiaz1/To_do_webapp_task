// export interface Task {
//     id?: number | null;
//     title: string;
//     description: string;
//     completed: boolean;
//     created_at: string;
//   }
  
export class Task {
    id: number | null = null;
    title: string = '';
    description: string = '';
    completed: boolean = false;
    created_at: string = new Date().toISOString();
    list_id: number | null = null;

    constructor(init?:Partial<Task>) {
        Object.assign(this, init);
    }
}
