[![logo](http://cdn.remixicon.com/logo-github.svg)](https://remixicon.com)

[![npm](https://img.shields.io/npm/v/remixicon.svg?labelColor=4A4A4A&color=006AFF&style=flat-square)](https://www.npmjs.com/package/remixicon-ligatures)
[![downloads](https://img.shields.io/npm/dt/remixicon.svg?labelColor=4A4A4A&color=23AF5F&style=flat-square)](https://www.npmjs.com/package/remixicon-ligatures)
[![](https://data.jsdelivr.com/v1/package/npm/remixicon-ligatures/badge)](https://www.jsdelivr.com/package/npm/remixicon-ligatures)

Remix Icon is a set of open-source neutral-style system symbols for designers and developers. Unlike a patchwork icon library, 2200+ icons are all elaborately crafted so that they are born with the gene of readability, consistency and perfect pixels. Each icon was designed in "Outlined" and "Filled" styles based on a 24x24 grid. Of course, all the icons are free for both personal and commercial use.

> This repository only creates a version of the Remix Icon font with ligatures supported.

[![icon demo](http://cdn.remixicon.com/preview.svg)](https://remixicon.com)
View the full set of Remix Icons at [remixicon.com](https://remixicon.com).

## Usage

### Webfont Usage

> **Note:** You can import Remix Icon with Ligatures with npm install, cdn or download it manually.

#### Installation

> **Note:** If you'd like to use Remix Icon with a CDN, you can skip this installation step.

```
npm install remixicon-ligatures --save
```

```
import 'remixicon-ligatures/fonts/remixicon.css'
```

> import CSS to your main.js

#### CDN

Copy the following code and add it to the &lt;head&gt; tag of your html document.

```html
<link
  href="https://cdn.jsdelivr.net/npm/remixicon-ligature@2.5.0/fonts/remixicon.css"
  rel="stylesheet"
/>
```

> ==**Important Note:**== Remix Icons with ligatures was published starting at v2.5.0, so no version prior to this will be available.
>
> The `@2.5.0` in the CDN link can be changed to any future version we've published.

#### Download Manually

Download [`remixicon.css`](https://cdn.jsdelivr.net/npm/remixicon-ligatures@2.5.0/fonts/remixicon.css) file, add it to the &lt;head&gt; tag of your html document.

#### Use

Find the icons you want from [remixicon.com](https://remixicon.com), and then convert the name to snake_case ie `home-2` becomes `home_2`.

Then add it to your html with `i` tag and either the `ri-line` ro `ri-fill` calls for the Outlined or Filled variant respectively.

```html
<!-- Outlined Font -->
<i class="ri-line">home_2</i>
<!-- Filled Font -->
<i class="ri-fill">home_2</i>
```

## License

> This repository is just a re-distribution of Remix Icon and therefore uses the same licence:

Remix Icon is licensed under the [Apache License Version 2.0](https://github.com/Remix-Design/remixicon/blob/master/License). Feel free to use these icons in your products and distribute them. We would be very grateful if you mention "Remix Icon" in your product info, but it's not required. The only thing we ask is that these icons are not for sale.
