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

<li class="border-b border-very-light-grayish-blue flex justify-between items-center">
	<div class="pl-5 relative flex items-center group">
		<input
			type="checkbox"
			id={`todo-${todo.id}`}
			bind:checked={todo.done}
			on:change={() => dispatch('complete')}
			class="peer/done absolute opacity-0 cursor-pointer h-0 w-0"
		/>

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
