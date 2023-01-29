<script lang="ts">
	import { todos } from '$lib/stores';
	import type { Todo } from '$lib/types';
	import iconCross from '$lib/assets/icon-cross.svg';
	import iconCheck from '$lib/assets/icon-check.svg';
	import { createEventDispatcher } from 'svelte/internal';

	export let todo: Todo;
	export let liveRegion: HTMLElement;
	export let todosLabel: HTMLElement;

	const dispatch = createEventDispatcher();

	function deleteTodo(todo: Todo) {
		todos.set($todos.filter((current) => current.id !== todo.id));
		addFeedback(`${todo.name} has been removed`);
		todosLabel.focus();
	}

	function addFeedback(feedback: string) {
		liveRegion.textContent = feedback;
	}
</script>

<li
	class="flex items-center justify-between border-b border-very-light-grayish-blue dark:border-gray"
>
	<div class="relative flex items-center pl-5 group">
		<input
			type="checkbox"
			id={`todo-${todo.id}`}
			bind:checked={todo.done}
			on:change={() => dispatch('complete')}
			class="absolute w-0 h-0 opacity-0 cursor-pointer peer/done"
		/>

		<span
			class="absolute w-5 h-5 bg-white border rounded-full border-very-light-grayish-blue group-hover:border-bright-blue peer-checked/done:bg-gradient-to-br peer-checked/done:from-cyan peer-checked/done:to-purple peer-checked/done:border-none dark:bg-dark-gray dark:border-gray"
		/>
		<img src={iconCheck} alt="" class="absolute left-[25px]" hidden={!todo.done} />
		<label
			for={`todo-${todo.id}`}
			class="relative pl-8 pr-6 py-[17px] text-sm cursor-pointer text-very-dark-grayish-blue 
                peer-checked/done:line-through peer-checked/done:text-light-grayish-blue
                peer-focus-visible/done:ring-2 dark:peer-checked/done:text-very-dark-grayish-blue
                dark:text-very-light-gray">{todo.name}</label
		>
	</div>
	<button aria-label="Delete {todo.name}" on:click={() => deleteTodo(todo)} class="p-5">
		<img src={iconCross} alt="" class="h-3 " />
	</button>
</li>
