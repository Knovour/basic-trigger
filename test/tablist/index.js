import bindTablist from '../../tablist.js'

const $tablist = document.querySelector('[role=tablist]')
bindTablist($tablist)

$tablist.addEventListener('tab:selected', ({ detail }) => console.log(detail))
