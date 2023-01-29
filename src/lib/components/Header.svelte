<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import iconMoon from '$lib/assets/icon-moon.svg';
	import iconSun from '$lib/assets/icon-sun.svg';

	export let dark: boolean;
</script>

<header
	class="bg-[url('/bg-mobile-light.jpg')] dark:bg-[url('/bg-mobile-dark.jpg')] bg-cover bg-no-repeat h-[200px]"
>
	<div class="container flex justify-between pt-12">
		<a href="/">
			<img src={logo} alt="to-do" class="h-5" />
		</a>
		<button on:click={() => (dark = !dark)}>
			<img src={dark ? iconSun : iconMoon} alt="dark mode" class="h-5" />
		</button>
	</div>
</header>
