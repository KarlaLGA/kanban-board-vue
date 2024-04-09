export type ID = string;

export interface Item {
    title: string,
    id: ID,
    type: string
}

export interface Task extends Item {
    createdAt: Date;
}

export interface Column extends Item {
    tasks: Task[];
}

export interface SelectedItem {
    column: Column | undefined,
    task: Task | undefined
}

export type HandlerStyle = 'column' | 'task';

export interface Actions {
    label: string,
    action: string
}