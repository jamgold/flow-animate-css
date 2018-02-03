Small module that works with ostrio:flow-router-extra.

It overrides two methods on the client to wait for animation to finish before leaving a page.

This package suplies <a href="https://daneden.github.io/animate.css/">animate.css</a>

Example:
```
<template name="pageOne">
	<div class="animated fadeIn" data-animation-out="fadeOut">
		<h1>Page One</h1>
	</div>
</template>

<template name="pageTwo">
	<div class="animated lightSpeedIn" data-animation-out="lightSpeedOut">
		<h1>Page One</h1>
	</div>
</template>
```