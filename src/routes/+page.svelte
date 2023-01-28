<script lang="ts">
	import Header from '$components/Header.svelte';
	import { todos, filter, filteredTodos } from '$lib/stores';
	import type { Todo } from '$lib/types';
	import SortableList from 'svelte-sortable-list';
	import TodoItem from '$root/src/lib/components/TodoItem.svelte';
	import { onDestroy } from 'svelte/internal';

	let todosLabel: HTMLElement;
	let liveRegion: HTMLElement;
	let todoText = '';
	let todosActiveCount = getActiveCount();

	const unsubscribe = todos.subscribe(() => {
		todosActiveCount = getActiveCount();
	});

	onDestroy(unsubscribe);

	function addTodo() {
		const newTodo = {
			id: $todos.length + 1,
			name: todoText,
			done: false
		};
		todos.set([...$todos, newTodo]);
		todoText = '';
		addFeedback(`${newTodo.name} has been added`);
		todosLabel.focus();
	}

	function getActiveCount() {
		return $todos.filter((todo) => !todo.done).length;
	}

	function clearCompleted() {
		todos.set($todos.filter((current) => !current.done));
		addFeedback("All completed to-do's have been cleared");
		todosLabel.focus();
	}

	function addFeedback(feedback: string) {
		liveRegion.textContent = feedback;
	}

	function sortList(ev: { detail: Todo[] }) {
		todos.set(ev.detail);
	}

	function markComplete() {
		todosActiveCount = getActiveCount();
	}
</script>

<Header />
<div class="container relative bottom-[92px]">
	<main aria-labelledby="todos-label" class="mb-4">
		<form on:submit|preventDefault={addTodo} class="mb-4 flex items-center">
			<span
				class="absolute h-5 w-5 ml-5 bg-white rounded-full border border-very-light-grayish-blue"
			/>
			<input
				type="text"
				aria-invalid={todoText.length < 10}
				aria-label="Create a new to-do..."
				placeholder="Create a new to-do..."
				bind:value={todoText}
				class="placeholder:text-sm placeholder:text-dark-grayish-blue py-3 pl-[52px] pr-5 rounded w-full"
			/>
			<input type="submit" hidden disabled={todoText.length < 10} />
		</form>
		<section class="rounded bg-white shadow">
			<h1 bind:this={todosLabel} id="todos-label" tabindex="-1" class="sr-only">My To-do List</h1>
			<div bind:this={liveRegion} role="status" aria-live="polite" class="sr-only">
				<!-- add content to hear it spoken -->
			</div>
			<SortableList list={$filteredTodos} key="id" on:sort={sortList} let:item>
				<TodoItem todo={item} {todosLabel} {liveRegion} on:complete={markComplete} />
			</SortableList>
			<li class="flex justify-between py-4 px-5">
				<span role="status" class="text-sm text-dark-grayish-blue"
					>{todosActiveCount} items left</span
				>
				<button class="text-sm text-dark-grayish-blue" on:click={clearCompleted}
					>Clear Completed</button
				>
			</li>
			<div class="empty-state">
				<p>Add your first to-do</p>
			</div>
		</section>
	</main>

	<div aria-label="Filter by status" class="rounded bg-white shadow flex justify-center px-[10px]">
		<button
			aria-label="Show all"
			on:click={() => ($filter = 'all')}
			class="px-[10px] py-4 text-base font-bold 
        {$filter === 'all' ? 'text-bright-blue' : 'text-dark-grayish-blue'}">All</button
		>
		<button
			aria-label="Show active"
			on:click={() => ($filter = 'active')}
			class="px-[10px] py-4 text-base font-bold 
        {$filter === 'active' ? 'text-bright-blue' : 'text-dark-grayish-blue'}">Active</button
		>
		<button
			aria-label="Show completed"
			on:click={() => ($filter = 'completed')}
			class="px-[10px] py-4 text-base font-bold 
        {$filter === 'completed' ? 'text-bright-blue' : 'text-dark-grayish-blue'}">Completed</button
		>
	</div>
</div>

<style>
	.empty-state,
	ul:empty {
		display: none;
	}

	ul:empty + .empty-state {
		display: block;
	}

	[tabindex='-1'] {
		outline: none;
	}
</style>
