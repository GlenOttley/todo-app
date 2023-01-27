import { writable } from 'svelte/store';
import type { Todo } from '$lib/types';
import data from '$lib/data.json';

export const todos = writable<Todo[]>(data);
