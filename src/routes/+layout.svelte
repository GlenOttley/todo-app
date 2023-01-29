<script>
	import '../app.css';
	import Header from '$components/Header.svelte';

	let dark = false;
</script>

<div class:dark>
	<Header bind:dark />
	<slot />
</div>
