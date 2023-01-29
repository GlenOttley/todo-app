<script lang="ts">
	import { todos, filter, filteredTodos } from '$lib/stores';
	import type { Todo } from '$lib/types';
	import SortableList from 'svelte-sortable-list';
	import TodoItem from '$root/src/lib/components/TodoItem.svelte';
	import { onDestroy } from 'svelte/internal';
	import type { Filter } from '$lib/types';

	let todosLabel: HTMLElement;
	let liveRegion: HTMLElement;
	let todoText = '';
	let todosActiveCount = getActiveCount();
	let filterOptions = ['all', 'active', 'completed'];

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

	function setFilter(value: string) {
		filter.set(value as Filter);
	}
</script>

<main class="h-screen bg-very-light-gray-bg dark:bg-very-dark-gray">
	<div class="container relative bottom-[92px] md:bottom-[135px]">
		<div aria-labelledby="todos-label" class="mb-4">
			<form
				on:submit|preventDefault={addTodo}
				class="flex items-center mb-4 shadow dark:shadow-dark"
			>
				<span
					class="absolute w-5 h-5 ml-5 bg-white border rounded-full md:ml-6 md:h-6 md:w-6 border-very-light-grayish-blue dark:bg-dark-gray dark:border-gray"
				/>
				<span id="newTodoLabel" class="sr-only">Create a new to-do...</span>
				<input
					type="text"
					aria-labelledby="newTodoLabel"
					aria-invalid={todoText.length < 10}
					aria-label="Create a new to-do..."
					placeholder="Create a new to-do..."
					bind:value={todoText}
					class="placeholder:text-sm dark:bg-dark-gray dark:placeholder:text-light-gray 
          placeholder:text-dark-grayish-blue py-3 pl-[52px] md:pl-[72px] pr-5 rounded w-full md:py-5
            dark:text-very-light-gray "
				/>
				<input type="submit" hidden disabled={todoText.length < 10} />
			</form>
			<section class="bg-white rounded shadow dark:shadow-dark dark:bg-dark-gray">
				<h1 bind:this={todosLabel} id="todos-label" tabindex="-1" class="outline-none sr-only">
					My To-do List
				</h1>
				<div bind:this={liveRegion} role="status" aria-live="polite" class="sr-only">
					<!-- add content to hear it spoken -->
				</div>
				<SortableList list={$filteredTodos} key="id" on:sort={sortList} let:item>
					<TodoItem todo={item} {todosLabel} {liveRegion} on:complete={markComplete} />
				</SortableList>
			</section>
			<div class="grid md:shadow dark:shadow-dark">
				<div
					class="flex items-center w-full pl-5 bg-white shadow dark:shadow-dark dark:bg-dark-gray status md:pl-6 md:shadow-none"
				>
					<span
						role="status"
						class="py-4 text-sm md:!text-base text-dark-grayish-blue md:py-3 dark:text-very-dark-grayish-blue "
						>{todosActiveCount} items left</span
					>
				</div>
				<div
					class="flex items-center justify-center w-full mx-auto mt-4 bg-white rounded shadow dark:bg-dark-gray filters md:mt-0 md:rounded-none dark:shadow-dark md:shadow-none"
				>
					<fieldset class="flex justify-center px-[10px] dark:bg-dark-gray ">
						<legend class="sr-only">Filter by status</legend>
						{#each filterOptions as value}
							<label
								for={value}
								class="capitalize cursor-pointer px-[10px] py-4 text-base font-bold focus-within:ring-2 flex items-center
                    {$filter === value
									? 'text-bright-blue'
									: 'text-dark-grayish-blue dark:text-very-dark-grayish-blue'}"
							>
								<input
									type="radio"
									name="status"
									id={value}
									{value}
									on:change={() => setFilter(value)}
									class="appearance-none focus-within:outline-none"
								/>
								{value}
							</label>
						{/each}
					</fieldset>
				</div>

				<div
					class="flex justify-end w-full pr-5 bg-white shadow clear md:pr-6 whitespace-nowrap dark:bg-dark-gray dark:shadow-dark md:shadow-none"
				>
					<button
						on:click={clearCompleted}
						class="py-4 text-sm text-dark-grayish-blue md:py-3 md:!text-base dark:text-very-dark-grayish-blue"
					>
						Clear Completed
					</button>
				</div>
			</div>
			<p
				class="mt-10 text-base text-center text-dark-grayish-blue dark:text-very-dark-grayish-blue md:mt-12"
			>
				Drag and drop to reorder list
			</p>
		</div>
	</div>
</main>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 50%);
		grid-template-rows: repeat(2, auto);
		grid-template-areas:
			'status clear'
			'filters filters';
	}
	@media screen and (min-width: 588px) {
		.grid {
			display: flex;
		}
	}
	.status {
		grid-area: status;
	}
	.clear {
		grid-area: clear;
	}
	.filters {
		grid-area: filters;
	}
</style>
