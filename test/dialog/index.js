import bindDialog from '../../dialog.js'

const $dialog = document.getElementById('dialog')
bindDialog($dialog)

$dialog.addEventListener('dialog:show', () => console.log('show'))
$dialog.addEventListener('dialog:close', () => console.log('close'))
$dialog.addEventListener('dialog:confirm', ({ detail }) => {
	console.log('confirm')
	detail.dialog.close()
})

const $dialog2 = document.getElementById('dialog2')

bindDialog($dialog2, { locked: true })

$dialog2.addEventListener('dialog:show', () => console.log('show'))
$dialog2.addEventListener('dialog:close', () => console.log('close'))
$dialog2.addEventListener('dialog:confirm', ({ detail }) => {
	console.log('confirm')
	detail.dialog.close()
})
