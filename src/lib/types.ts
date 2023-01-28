export interface Todo {
	id: number;
	name: string;
	done: boolean;
}

export type Filter = 'all' | 'active' | 'completed';
