type UniqId = number;

interface ITask {
    id: UniqId;
    title: string;
    description: string;
    dateCreated: Date;
    dateEdited: Date | null;
    isCompleted: boolean;
    update: (payload: ITaskUpdated | ITaskUpdatedWithConfirm) => void;
    complete: () => void;
}

interface ITaskUpdated {
    title: ITask['title'];
    description: ITask['description'];
}

interface ITaskUpdatedWithConfirm extends ITaskUpdated {
    confirm: boolean;
}

interface ITodoList {
    create: (title: string, description: string) => ITask;
    remove: (id: UniqId) => ITask | null;
    update: (id: UniqId, payload: ITaskUpdated | ITaskUpdatedWithConfirm) => ITask;
    getTaskById: (id: UniqId) => ITask | null;
    getTasks: () => ITask[];
    complete: (id: UniqId) => void;
    search: (query: string) => ITask[];
    sort: (by: 'status' | 'created') => ITask[];
    allCount: number;
    incompletedCount: number;
}

abstract class BaseTask implements ITask {
    readonly id: UniqId = Math.random() * (100 - 1) + 1;
    readonly dateCreated: Date = new Date();
    public dateEdited: Date | null = null;
    public isCompleted: boolean = false;

    constructor(public title: string, public description: string) {}

    public complete(): void {
        this.isCompleted = true;
    }

    public abstract update(payload: ITaskUpdated | ITaskUpdatedWithConfirm): void;
}

class Task extends BaseTask {
    public override update({ title, description }: ITaskUpdated): void {
        if (title?.trim()) {
            this.title = title;
        }
        if (description?.trim()) {
            this.description = description;
        }
        this.dateEdited = new Date();
    }
}

class ConfirmedTask extends BaseTask {
    public override update({ title, description, confirm }: ITaskUpdatedWithConfirm): void {
        if (title?.trim()) {
            this.title = title;
        }
        if (description?.trim()) {
            this.description = description;
        }
        if (confirm) {
            this.dateEdited = new Date();
        }
    }
}

class TodoList implements ITodoList {
    private tasks: ITask[] = [];

    get allCount(): number {
        return this.tasks.length;
    }

    get incompletedCount(): number {
        return this.tasks.filter((x) => !x.isCompleted).length;
    }

    public create(title: string, description: string): ITask {
        if (!title.trim() || !description.trim()) {
            throw new Error('Не може бути пустим');
        }
        const task = new Task(title, description); // Default task type
        this.tasks.push(task);
        return { ...task } as ITask;
    }

    public remove(id: UniqId): ITask | null {
        const indexTask = this.findByIndex(id);
        return this.tasks.splice(indexTask, 1)[0] || null;
    }

    public update(id: UniqId, payload: ITaskUpdated | ITaskUpdatedWithConfirm): ITask {
        const indexTask = this.findByIndex(id);
        const task = this.tasks[indexTask];
        const oldTask = { ...task };
        task.update(payload);
        return oldTask;
    }

    public getTaskById(id: UniqId): ITask | null {
        const task = this.tasks[this.findByIndex(id)];
        if (!task) {
            throw new Error('Не знайдено');
        }
        return task;
    }

    public getTasks(): ITask[] {
        return this.tasks;
    }

    public complete(id: UniqId): void {
        const taskId = this.findByIndex(id);
        const task = this.tasks[taskId];
        task.complete();
    }

    public search(query: string): ITask[] {
        return this.tasks.filter((task) =>
            task.title.toLowerCase().includes(query.toLowerCase()) || task.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    public sort(by: 'status' | 'created'): ITask[] {
        if (by === 'status') {
            return this.tasks.sort((a, b) => Number(b.isCompleted) - Number(a.isCompleted));
        } else if (by === 'created') {
            return this.tasks.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());
        }
        return this.tasks;
    }

    private findByIndex(id: UniqId): number {
        const taskId = this.tasks.findIndex((x) => x.id === id);
        if (taskId === -1) {
            throw new Error('Не знайдено');
        }
        return taskId;
    }
}


// ===========================================================

const todoList = new TodoList();

const task1 = todoList.create("Task 1", "Description 1");
const task2 = todoList.create("Task 2", "Description 2");

todoList.update(task1.id, { title: "Update task 1", description: "Update description" });
todoList.update(task2.id, { title: "Update task 2", description: "Update description", confirm: true });


const searchResult = todoList.search("Task");

const sortedByStatus = todoList.sort('status');
const sortedByCreated = todoList.sort('created');

todoList.complete(task1.id);

console.log(todoList.allCount);
console.log(todoList.incompletedCount);
