<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import iconMoon from '$lib/assets/icon-moon.svg';
	import iconSun from '$lib/assets/icon-sun.svg';

	export let dark: boolean;
</script>

<header
	class="bg-cover bg-no-repeat h-[200px] md:h-[300px] bg-[url('/bg-mobile-light.jpg')] sm:bg-[url('/bg-desktop-light.jpg')] 
  dark:bg-[url('/bg-mobile-dark.jpg')] dark:sm:bg-[url('/bg-desktop-dark.jpg')] "
>
	<div class="container flex justify-between pt-12">
		<a href="/">
			<img src={logo} alt="to-do" class="h-5 md:h-10" />
		</a>
		<button aria-pressed={dark} on:click={() => (dark = !dark)}>
			<img src={dark ? iconSun : iconMoon} alt="dark mode" class="h-5 md:h-[26px]" />
		</button>
	</div>
</header>
