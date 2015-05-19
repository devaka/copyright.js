# copyright.js

Adding short copyright text or link to the copied website content. Used with [jQuery] library.

## How to use

```javascript
.copyright({options})
```

**options** (optional parameter)  
Type: Object  
Additional options for coppied text

- **extratxt** — Additional text/link to copy with content. Default: **'Подробнее: %link%'**. You can use %link% and %source% tags here if needed. %link% will be replaced with <A> tag with URL in anchor text. %source% will be replaced with <A> tag with **sourcetxt** text.
- **sourcetxt** — Anchor text for %source% tag in **extratxt** content. Default: **'Источник'**.
- **length** — Minimum length of text allowed to copy without copyrights restrictions. Default: **150**.
- **hide** — Hide copyrights in HTML. Default: **true**.
- **allowcopy** — Is content allowed to copy? Default: **true**. If FALSE then big parts of content will be not copied. Otherwise copyright link added.
- **first** — Add copyrights in beggining of copied content or in the end if first=false. Default: **false**.
- **style** — Additional CSS-style for copyrights. Default: **''**.
- **className** — HTML class for element with copyrights. Default: **'copyright-span'**.

### Example #1

Protect content in `<article>` tag with link to your site.

```html
<script src="js/copyright.js"></script>
```
```html
<script>
$(document).ready(function(){
    $('article').copyright();
});
</script>
```

### Example #2

Protect text from copy in `DIV` with `.content` class and set custom copyright text "&copy; Sergey Koksharov" and make name linked to original site.

```javascript
$(document).ready(function(){
    $('div.content').copyright({
        extratxt: '&copy; %source%',
        sourcetxt: 'Sergey Koksharov',
        hide: false
    });
});
```

## Compatibility

Content protection script successfully tested on following browsers:

- Safari
- Mozilla Firefox
- Google Chrome
- Chromium
- Yandex Browser
- Opera and IE has some issues described below.

**Opera:** adding link in the beggining of content not working properly. With parameter "first: true" text in Opera Browser will not be copied.

**Internet Explorer:** has the same issue as Opera (using first: true disabled coping proccess). Also if user clicks `Ctrl+C` 2 or more times it gets 2 or more additional text/link in buffer. So using "first" parameter not recommended if you audience mainly use IE browser.

## License

copyright.js is available under the [MIT license].

[jQuery]:http://jquery.com
[MIT License]:http://opensource.org/licenses/MIT