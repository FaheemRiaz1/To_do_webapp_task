
// Add this in your TypeScript file where you manage the state
export class TaskStats {
    totalTasks: number | null =null;
    completedTasks: number  | null =null;
    constructor(init?:Partial<TaskStats>) {
        Object.assign(this, init);
    }
  }
  
