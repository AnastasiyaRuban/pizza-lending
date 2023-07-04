const burger = document.querySelector('.burger')
const menu = document.querySelector('.menu')
const menuItem = document.querySelectorAll('.menu__link')

burger.addEventListener('click', toggleOpenMenu);
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu') || e.target.classList.value.includes('burger')) {
        return
    } else {
        const openMenu = document.querySelector('.menu.active')
        if (openMenu) {
            closeMenu()
        }
    }
})

menuItem.forEach(item => {
    item.addEventListener('click', closeMenu)
})

function toggleOpenMenu() {
    menu.classList.toggle('active')
    burger.classList.toggle('active')
    document.body.classList.toggle('lock')
}

function closeMenu() {
    menu.classList.remove('active')
    burger.classList.remove('active')
    document.body.classList.remove('lock')
}
