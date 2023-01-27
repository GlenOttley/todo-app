<script lang="ts">
	import Header from '$components/Header.svelte';
	import iconCross from '$lib/assets/icon-cross.svg';
	import iconCheck from '$lib/assets/icon-check.svg';
	import { todos } from '$lib/stores';
	import { fly } from 'svelte/transition';
	import type { Todo } from '$lib/types';

	let todosLabel: HTMLElement;
	let liveRegion: HTMLElement;
	let todoText = '';
	$: todosNotCompletedCount = $todos.filter((todo) => !todo.done).length;

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

	function deleteTodo(todo: Todo) {
		todos.set($todos.filter((current) => current.id !== todo.id));
		addFeedback(`${todo.name} has been removed`);
		todosLabel.focus();
	}

	function clearCompleted() {
		todos.set($todos.filter((current) => !current.done));
		addFeedback("All completed to-do's have been cleared");
		todosLabel.focus();
	}

	function addFeedback(feedback: string) {
		liveRegion.textContent = feedback;
	}
</script>

<Header />
<main aria-labelledby="todos-label" class="container relative bottom-[92px]">
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
		<ul>
			{#each $todos as todo}
				<li
					transition:fly={{ x: 400, duration: 400 }}
					class="border-b border-very-light-grayish-blue flex justify-between items-center"
				>
					<div class="pl-5 relative flex items-center group">
						<input
							type="checkbox"
							id={`todo-${todo.id}`}
							bind:checked={todo.done}
							class="peer/done absolute opacity-0 cursor-pointer h-0 w-0"
						/>
						<!-- TODO fix border color on hover -->
						<span
							class="absolute h-5 w-5 bg-white rounded-full border border-very-light-grayish-blue
              group-hover:border-bright-blue peer-checked/done:bg-gradient-to-br peer-checked/done:from-cyan 
              peer-checked/done:to-purple peer-checked/done:border-none"
						/>
						<img src={iconCheck} alt="" class="absolute left-[25px]" />
						<label
							for={`todo-${todo.id}`}
							class="relative pl-8 pr-6 text-sm cursor-pointer text-very-dark-grayish-blue 
                peer-checked/done:line-through peer-checked/done:text-light-grayish-blue"
							>{todo.name}</label
						>
					</div>
					<button aria-label="Delete {todo.name}" on:click={() => deleteTodo(todo)} class="p-5">
						<img src={iconCross} alt="" class="h-3 " />
					</button>
				</li>
			{/each}
			<li class="flex justify-between py-4 px-5">
				<span role="status" class="text-sm text-dark-grayish-blue"
					>{todosNotCompletedCount} items left</span
				>
				<button class="text-sm text-dark-grayish-blue" on:click={clearCompleted}
					>Clear Completed</button
				>
			</li>
		</ul>
		<div class="empty-state">
			<p>Add your first to-do</p>
		</div>
	</section>
</main>

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
