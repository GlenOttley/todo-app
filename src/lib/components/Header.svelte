<script>
	import logo from '$lib/assets/logo.svg';
	import iconMoon from '$lib/assets/icon-moon.svg';
</script>

<header class="bg-[url('/bg-mobile-light.jpg')] bg-cover bg-no-repeat h-[200px]">
	<div class="container flex justify-between pt-12">
		<a href="/">
			<img src={logo} alt="to-do" class="h-5" />
		</a>
		<img src={iconMoon} alt="dark mode" class="h-5" />
	</div>
</header>
