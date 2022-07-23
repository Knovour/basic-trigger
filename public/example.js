import '/src/pressButton'
import '/src/dialog'
import '/src/tablist'
import '/src/checklist'

// Dialog
const $dialog = document.querySelector('dialog')
const $output = document.querySelector('.dialog-event')

$dialog.addEventListener('dialog:reset', () => ($output.innerHTML = 'dialog:reset'))
$dialog.addEventListener('dialog:confirm', () => ($output.innerHTML = 'dialog:confirm'))

// Press Button
const $toggleBtn = document.querySelector('[aria-pressed]')

$toggleBtn.addEventListener('btn:pressed', ({ target }) => (target.innerHTML = 'button pressed'))
$toggleBtn.addEventListener('btn:unpressed', ({ target }) => (target.innerHTML = 'button'))

// Checklist
const checked = new Set()
const $checklistOutput = document.querySelector('.checklist-output')

document.querySelector('[role=checklist]').addEventListener('checklist:change', ({ detail }) => {
	detail.checked ? checked.add(detail.value) : checked.delete(detail.value)
	$checklistOutput.value = [...checked]
})
