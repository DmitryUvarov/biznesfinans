// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener('load', pageLoad)

function pageLoad() {
    const htmlTag = document.documentElement

    document.addEventListener('click', e => {
        const targetElement = e.target


        if (!targetElement.closest('.item-header__content.open') && document.querySelector('.item-header__content.open')) {
            document.querySelector('.item-header__content.open').classList.remove('open')
        }

        if (targetElement.closest('.item-header__content') && !targetElement.closest('.item-header__list')) {
            if (targetElement.closest('a')) {
                e.preventDefault()
            }

            targetElement.closest('.item-header__content').classList.toggle('open')

        }

        ////

        if (!targetElement.closest('.menu__item.open') && document.querySelector('.menu__item.open')) {
            document.querySelector('.menu__item.open').classList.remove('open')
        }

        if (targetElement.closest('.menu__item')) {
            targetElement.closest('.menu__item').classList.toggle('open')
        }

    })
}