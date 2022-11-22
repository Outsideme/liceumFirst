

	const secondSpoller = document.querySelector('.second-spoller')
function openMainMenu() {
	const menu = document.querySelectorAll('.menu-item');
	const information = document.querySelector('.information')
	if (menu) {
for(let i = 0; i < menu.length; i++) {
	let item = menu[i];
	item.addEventListener('mouseenter', e => {
		e.target.children[0].classList.toggle('showHide')
	}, false)
	item.addEventListener('mouseleave', e => {
		e.target.children[0].classList.toggle('showHide')
		secondSpoller.classList.remove('showHide')

	}, false)
	information.addEventListener('mouseenter', e => {
		secondSpoller.classList.toggle('showHide')
		e.target.children[1].style.transform = `translateX(10px)`

	}, false)

	secondSpoller.addEventListener('mouseleave', e => {
		secondSpoller.classList.toggle('showHide')

	}, false)


}}
}


openMainMenu()
//===============================/===============================/===============================/===============================/===============================


//===============================/===============================/===============================/===============================/===============================

//===============================/===============================/===============================/===============================/===============================



const burger = document.querySelector('[data-burger]')
const mobileNav = document.querySelector('[data-nav]')
const header = document.querySelector('.header')
const menuHidden = document.querySelector('.menu-hidden')



function headerResize () {
	const headerHeight = header.offsetHeight
	const widthMenuHidden = menuHidden.offsetWidth
	const heightMenuHidden = menuHidden.offsetHeight
	mobileNav.style.top = `${headerHeight - 1}px`
	secondSpoller.style.top = `${heightMenuHidden / 20}px`
	secondSpoller.style.left = `${widthMenuHidden}px`

}
function openCloseMenu () {
	burger.classList.toggle('burger-active')
	mobileNav.classList.toggle('open-mobile')
}
function closeMenu () {
	burger.classList.remove('burger-active')
	mobileNav.classList.remove('open-mobile')
}
window.addEventListener('resize', e => {
	if (document.documentElement.clientWidth > 992) {
		closeMenu();
	}
	headerResize();
})
window.addEventListener('load', e => {
	headerResize();
})

burger.addEventListener('click', e => {
	openCloseMenu()
})

const accors = document.querySelectorAll('.accor')
const content = document.querySelectorAll('.accor-content')
const btn = document.querySelectorAll('.accor-control')


accors.forEach(el => {
	el.addEventListener('click', e => {
		const accorIcons = document.querySelectorAll('.accor-icon')
		const self = e.currentTarget.children[1].classList
		const rotateArrow = e.currentTarget.children[0].children[1].children[0].classList
		accorIcons.forEach(icon => {
			icon.children[0].classList.remove('open-accor')
		})
		if (!e.currentTarget.children[1].classList.contains('open-accor')) {
			content.forEach(it => {

				return it.classList.remove('open-accor')
			})
			self.add('open-accor')
			rotateArrow.add('open-accor')
		 } else if (e.currentTarget.children[1].classList.contains('open-accor')) {
			rotateArrow.remove('open-accor')
			self.remove('open-accor')
		 }

	})
})
const container = document.querySelector('.header__container')
const search = document.querySelector('.search-btn')
const searchSVG = document.querySelector('#search')


const left = () => {
window.addEventListener('resize', function (e) {
	if (search.style.transform) {
	search.style.transform = `translateX(-${search.offsetLeft - 15}px)`
	}
	return container.offsetWidth
})
}
left()


const input = document.querySelector('#input-top')

function searchTranslate () {
search.addEventListener('click', e => {
	if (!search.style.transform) {
	search.style.transform = `translateX(-${search.offsetLeft - 15}px)`
	input.classList.add('inputActive')
	setTimeout ( () => {
		input.focus()}, 600)
} else {
	setTimeout ( () => {input.value = '', 0})

	search.style.removeProperty('transform')
	input.classList.remove('inputActive')


	}
})
}
window.addEventListener('click', e => {
	if (e.target !== searchSVG && e.target !== input) {
	search.style.removeProperty('transform')
	input.classList.remove('inputActive')
	setTimeout ( () => {input.value = '', 600})
	}
})
window.addEventListener('keydown', e => {
	if (e.key === `Escape`) {
	search.style.removeProperty('transform')
	input.classList.remove('inputActive')
	setTimeout ( () => {input.value = '', 600})
	}

})

searchTranslate()

// const searchBtn = document.querySelector('.search-btn')


const h4Last = document.querySelector('#h4-last')
const propertOne = document.querySelector('.propert-1')
const propertTwo = document.querySelector('.propert-2')
const listenerWidthGrid = () => {
	window.addEventListener('resize', e => {
	if (h4Last) {
	let h4Width = h4Last.offsetWidth
	propertOne.style.minWidth = `${h4Width}px`
	propertTwo.style.minWidth = `${h4Width}px`
}
})
}
listenerWidthGrid()


const h4StartWidth = () => {
	if (h4Last) {
	propertOne.style.minWidth = h4Last.offsetWidth + "px"
	propertTwo.style.minWidth = h4Last.offsetWidth + "px"
}}
h4StartWidth()


const lessonMode = document.querySelector('.lesson-mode')
const mediaLessonMode = () => {
	if (lessonMode) {
window.addEventListener('resize', e => {
	let widthWindow = document.documentElement.offsetWidth

	if (widthWindow < 1024 && widthWindow > 767) {
		lessonMode.style.gridColumn = '1/9'
	}
	if (widthWindow < 767 && widthWindow > 567) {
		lessonMode.style.gridColumn = '1/13'
	}
	if (widthWindow > 1024) {

			lessonMode.style.gridColumn = '1/8'
	}

})}}
mediaLessonMode()


const widthProgResize = () => {
	if (educationH3) {
		window.addEventListener('resize', e => {
			return educationH3.offsetWidth + `px`
		})}}

		const widthEducationTable = () => {
			const educationH3 = document.querySelector('#educationH3')
			const periodEducation = document.querySelectorAll('.ourWidth-education')
			if (educationH3 && periodEducation) {
				for (let i = 0; i < periodEducation.length; i++) {
					const element = periodEducation[i];
					element.style.width = widthProgResize()
				}}

			}
			widthEducationTable()



			const btnAccorEducation = document.querySelectorAll('.btn-education-accor').forEach(e=> {e.addEventListener('click', btnAccorEducationOpen, false)})
function btnAccorEducationOpen () {
const accor = this.nextElementSibling
const content = this.nextElementSibling.children[0]
if (!accor.classList.contains('education-accor-active')) {
	accor.classList.add('education-accor-active')
	content.classList.add('educationContentAccor')
	this.classList.add('btn-education-radio')
	this.children[0].children[1].style.transform = `rotate(-180deg)`

} else {
	accor.classList.remove('education-accor-active')
	content.classList.remove('educationContentAccor')
	this.children[0].children[1].style.transform = `rotate(0deg)`

	setTimeout(() => {
		this.classList.remove('btn-education-radio')

	}, 310);
}
}


function lastTdWidth () {
	const lastTdsClock = document.querySelectorAll('.education-clock')
	const lastTd = document.querySelector('.ourWidth-education-last-width-clock').offsetWidth


	lastTdsClock.forEach(e => {
		e.style.width = `${lastTd }px`

	})

	const lastTdTemplate = document.querySelector('.last-td-template').offsetWidth
	const lastTdTemplateMove = document.querySelectorAll('.last-td-template-move')
	lastTdTemplateMove.forEach(e => {
		e.style.width = lastTdTemplate + `px`
		console.log(e)

	})

}
lastTdWidth()


/*
(i) Код попадает в итоговый файл,
только когда вызвана функция,
например flsFunctions.spollers();
Или когда импортирован весь файл,
например import "files/script.js";
Неиспользуемый (не вызванный)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его расскоментировать
*/

// Включить/выключить FLS (Full Logging System) (в работе)
window['FLS'] = true;

// Подключение основного файла стилей
import "../scss/style.scss";

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
flsFunctions.isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
// flsFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
// flsFunctions.addLoadedClass();
/* Модуль для работы с меню (Бургер) */
// flsFunctions.menuInit();
/* Учет плавающей панели на мобильных устройствах при 100vh */
// flsFunctions.fullVHfix();

/*
Модуль работы со спойлерами
Документация: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
// flsFunctions.spollers();

/*
Модуль работы с табами
Документация: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
// flsFunctions.tabs();

/*
Модуль "показать еще"
Документация: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
// flsFunctions.showMore();

/*
Попапы
Документация: https://template.fls.guru/template-docs/funkcional-popup.html
Сниппет (HTML): pl
*/
// import './libs/popup.js'

/*
Модуль параллакса мышью
Документация:
Сниппет (HTML):
*/
// import './libs/parallax-mouse.js'

// ========================================================================================================================================================================================================================================================
// Работа с формами ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as flsForms from "./files/forms/forms.js";

/* Работа с полями формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formFieldsInit({ viewPass: false });

/* Oтправка формы */
/* Документация: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formSubmit();

/* Модуль формы "колличество" */
// flsForms.formQuantity();

/* Модуль звездного рейтинга */
// flsForms.formRating();

/* Модуль работы с select. */
// import './libs/select.js'

/* (В работе) Модуль работы с масками.*/
/*
Подключение и настройка выполняется в файле js/files/forms/inputmask.js
Документация по работе в шаблоне:
Документация плагина: https://github.com/RobinHerbots/inputmask
Сниппет(HTML):
*/
// import "./files/forms/inputmask.js";

/* Модуль работы с ползунком */
/*
Подключение и настройка выполняется в файле js/files/forms/range.js
Документация по работе в шаблоне:
Документация плагина: https://refreshless.com/nouislider/
Сниппет (HTML): range
*/
// import "./files/forms/range.js";

/* Модуль работы с подсказками (tippy) */
/*
Подключение плагина Tippy.js и настройка выполняется в файле js/files/tippy.js
Документация по работе в шаблоне:
Документация плагина: https://atomiks.github.io/tippyjs/
Сниппет (HTML): tip (добавляет атрибут с подсказкой для html тега)
*/
// import "./files/tippy.js";

// ========================================================================================================================================================================================================================================================
// Работа со слайдером (Swiper) ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Настройка подключения плагина слайдера Swiper и новых слайдеров выполняется в файле js/files/sliders.js
Документация по работе в шаблоне: https://template.fls.guru/template-docs/rabota-so-slajderom-swiper.html
Документация плагина: https://swiperjs.com/
Сниппет(HTML): swiper
*/
// import "./files/sliders.js";

// ========================================================================================================================================================================================================================================================
// Модули работы с прокруткой страницы ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/*
Изменение дизайна скроллбара
Документация по работе в шаблоне: В HTML добавляем к блоку атрибут data-simplebar
Документация плагина: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Сниппет(HTML):
*/
// import './files/scroll/simplebar.js';

// Ленивая (отложенная) загрузка картинок
// Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-lenivaya-podgruzka-lazy-loading.html
// Документация плагина: https://github.com/verlok/vanilla-lazyload
// Сниппет(HTML):
// import './files/scroll/lazyload.js';

// Наблюдатель за объектами c атрибутом data-watch
// Документация: https://template.fls.guru/template-docs/modul-nabljudatel-za-poyavleniem-elementa-pri-skrolle.html
// Сниппет(HTML):
// import './libs/watcher.js'

// Функции работы скроллом
import * as flsScroll from "./files/scroll/scroll.js";

// Плавная навигация по странице
// Документация: https://template.fls.guru/template-docs/modul-plavnoj-navigacii-po-stranice.html
// flsScroll.pageNavigation();

// Функционал добавления классов к хедеру при прокрутке
// Документация: https://template.fls.guru/template-docs/modul-dobavleniya-klassov-k-shapke-pri-prokrutke-stranicy.html
// flsScroll.headerScroll();

// Функционал липкого блока
// flsScroll.stickyBlock();

// ========================================================================================================================================================================================================================================================
// Галерея ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/*
Документация по работе в шаблоне:
Документация плагина: https://www.lightgalleryjs.com/docs/
Сниппет(HTML):
*/
// import "./files/gallery.js";

// ========================================================================================================================================================================================================================================================
// Прочие плагины ============================================================================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================

/* Динамический адаптив */
// Документация: https://template.fls.guru/template-docs/dinamicheskij-adaptiv.html
// import "./libs/dynamic_adapt.js";

/* Форматирование чисел */
// import './libs/wNumb.min.js';

// ========================================================================================================================================================================================================================================================
// Прочее ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
/* Подключаем файлы со своим кодом */
import "./files/script.js";
//============================================================================================================================================================================================================================================
