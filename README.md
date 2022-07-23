# Basic Trigger

Some html toggle event implementation.

### Dialog
#### Basic structure
```html
<button aria-controls="dialog">open dialog</button>

<dialog id="dialog" data-active-class="optional" data-unactive-class="optional">
	<button data-dialog-event="close"></button> <!-- dialog default close event -->
	<button data-dialog-event="reset">reset</button> <!-- dialog:reset event -->
	<button data-dialog-event="confirm">confirm</button> <!-- dialog:confirm event -->
	<button data-dialog-event="custom-name">confirm</button> <!-- dialog:custom-name event -->
</dialog>
```

#### Custom Events
```js
const $dialog = document.querySelector('dialog')
$dialog.addEventListener('dialog:YOUR_DATA_DIALOG_EVENT', () => {})
```

### Tablist
Basic structure
```html
<!-- data classes will toogle in tab role -->
<ul role="tablist" data-active-class="optional" data-unactive-class="optional">
	<li role="tab" aria-controls="firstPanel" aria-selected="true">first tab</li>
	<li role="tab" aria-controls="secondPanel">second tab</li>
	<li role="tab" aria-controls="thirdPanel">third tab</li>
</ul>

<div id="firstPanel" role="tabpanel">first panel</div>
<div id="secondPanel" role="tabpanel" hidden>second panel</div>
<div id="thirdPanel" role="tabpanel" hidden>third panel</div>
```

#### Custom Events
```js
const $tablist = document.querySelector('[role=tablist]')
$tablist.addEventListener('tab:selected', ({ detail }) => {
	const { $tab, $panel } = detail
})
```

### Press Button
Basic structure
```html
<button aria-pressed="false" data-active-class="optional" data-unactive-class="optional">button</button>
```

#### Custom Events
```js
const $btn = document.querySelector('button')
$btn.addEventListener('btn:pressed', () => {})
$btn.addEventListener('btn:unpressed', () => {})
```

### Checklist
Basic structure
```html
<!-- This is custom role -->
<div role="checklist">
	<label for="checkbox1">
		<input type="checkbox" id="checkbox1" value="1">
		checkbox 1
	</label>
	<label for="checkbox2">
		<input type="checkbox" id="checkbox2" value="2">
		checkbox 2
	</label>
	<label for="checkbox3">
		<input type="checkbox" id="checkbox3" value="3">
		checkbox 3
	</label>
	<label for="checkbox4">
		<input type="checkbox" id="checkbox4" value="4">
		checkbox 4
	</label>
	<label for="checkbox5">
		<input type="checkbox" id="checkbox5" value="5">
		checkbox 5
	</label>
</div>
```

#### Custom Events
```js
const $checklist = document.querySelector('[role=checklist]')
$checklist.addEventListener('checklist:change', ({ detail }) => {
	const { value, checked } = detail
})
```

