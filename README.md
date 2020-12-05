Small module that works with ostrio:flow-router-extra or kadira:flow-router.

It overrides two methods on the client to wait for animation to finish before leaving a page.

This package suplies <a href="https://daneden.github.io/animate.css/">animate.css</a>

The default for this package is to look for FlowRouter.animationElement = 'div.animated'
Examples:
```
{{! by specifying the animation in CSS}}
<template name="pageOne">
	{{! this needs to match FlowRouter.animationElement }}
	<div class="animated fadeIn" data-animation-out="fadeOut">
		<h1>Page One</h1>
	</div>
</template>
{{! by using a helper based on the animation defined in the route}}
<template name="pageTwo">
	{{#animatedRoute}}
		<h1>Page Two</h1>
	{{/animatedRoute}}
</template>
{{! by specifing the animation when calling the helper}}
<template name="pageThree">
	{{#animatedRoute animationIn="fadeIn" animationOut="fadeOut"}}
		<h1>Page Three</h1>
	{{/animatedRoute}}
</template>
```