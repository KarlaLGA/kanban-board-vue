export type ID = string;

export interface Task {
    title: string;
    id: ID;
    createdAt: Date;
}

export interface Column {
    title: string;
    id: ID;
    tasks: Task[];
}

export type HandlerStyle = 'column' | 'task';