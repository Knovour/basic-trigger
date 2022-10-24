import { bindOnload } from './utils'

import * as checklist from './checklist'
import * as dialog from './dialog'
import * as pressButton from './pressButton'
import * as tablist from './tablist'

const targets = {
	checklist: ['[role="checklist"]', checklist.bind],
	dialog: ['dialog', dialog.bind],
	pressButton: ['[aria-pressed]', pressButton.bind],
	tablist: ['[role="tablist"]', tablist.bind],
}

function bind(key) {
	if (!(key in targets)) return

	const [selector, bindElem] = targets[key]
	console.log(selector, bindElem)
	bindOnload(selector, bindElem)
}

function bindAll() {
	Object.keys(targets).forEach(bind)
}

export { bind, bindAll }
