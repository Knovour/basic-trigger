import bindDialog from '../../dialog.js'

document
	.querySelectorAll('[role="dialog"]')
	.forEach($dialog => {
		bindDialog($dialog)

		$dialog.addEventListener('show', () => console.log('show'))
		$dialog.addEventListener('hide', () => console.log('hide'))
		$dialog.addEventListener('close', () => console.log('close'))
		$dialog.addEventListener('cancel', ({ detail }) => {
			console.log('cancel')
			detail.hideDialog()
		})
		$dialog.addEventListener('confirm', ({ detail }) => {
			console.log('confirm')
			detail.hideDialog()
		})
	})
