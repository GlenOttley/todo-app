import { writable, derived } from 'svelte/store';
import type { Todo, Filter } from '$lib/types';
import data from '$lib/data.json';

export const todos = writable<Todo[]>(data);

export const filter = writable<Filter>('all');

export const filteredTodos = derived([todos, filter], ([$todos, $filter]) => {
	return Object.values($todos).filter((todo: Todo) =>
		$filter === 'active' ? !todo.done : $filter === 'completed' ? todo.done : todo
	);
});
