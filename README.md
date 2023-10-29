### app-loader custom web component 


![app-loader](https://github.com/t-var-s/app-loader/assets/6660327/45e32d2f-8f09-417e-a79f-4566ac78aff0)

A loading overlay that waits for key resources to load before displaying your app.

Include
```html
<script src="https://cdn.jsdelivr.net/gh/t-var-s/app-loader/app-loader.js"></script>
```
in the `<head>` of your page to use the `<app-loader>` tag.

In the demo.html file, you can see most of the available attributes that can be used.

The `requests` attribute is a comma separated list URLs to request. The app-loader will disappear when all requests succeed or just one of them fails. These should be files critical to how your app appears initially, namely CSS, fonts or images.

The `wait` attribute can be used to define a minimum amount of miliseconds before the app-loader disappears.

The `message` attribute is available to display any text centered under the loading animation.

The `background` and `z` attributes are CSS properties that can be used to style the app-loader. Background can have any value as the CSS property with the same name, including linear or radial gradients. Z is only necessary if you need to adjust the z-index of this custom element.

For example:
```html
<app-loader background="linear-gradient(90deg, #17c60a, #0078d8)" z="10" 
    requests="style.css, app.js, img/hero.jpg, fonts/Ubuntu-Regular.ttf">
</app-loader>
```




