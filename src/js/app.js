
const burger = document.querySelector('[data-burger]')
const mobileNav = document.querySelector('[data-nav]')
const header = document.querySelector('.header')




const menuObj = {
	openCloseMainMenu: function () {
		this.children[0].classList.toggle('showHide')

	},
	burgerClose: function () {
		burger.classList.remove('burger-active')
		mobileNav.classList.remove('open-mobile')
	},
	burgerOpen: function () {
		burger.classList.toggle('burger-active')
	    mobileNav.classList.toggle('open-mobile')
	},
	headerResize: function () {
		const headerHeight = header.offsetHeight
		mobileNav.style.top = `${headerHeight - 1}px`
	},
	resizeHideMobile: function () {
		if (document.documentElement.clientWidth > 768) {
			menuObj.burgerClose()
		}
		menuObj.headerResize();
	},
	openMainMenu: function () {
		const menu = document.querySelectorAll('.menu-item');
		if (menu) {
	for(let i = 0; i < menu.length; i++) {
		let item = menu[i];
		item.addEventListener('mouseenter', menuObj.openCloseMainMenu ,false)
		item.addEventListener('mouseleave', menuObj.openCloseMainMenu , false)
	}}
	}

}

menuObj.openMainMenu()

//===============================/===============================/===============================/===============================/===============================


//===============================/===============================/===============================/===============================/===============================




window.addEventListener('resize', menuObj.resizeHideMobile, false)
window.addEventListener('load', menuObj.resizeHideMobile, false)
burger.addEventListener('click', menuObj.burgerOpen, false)



function mobileAccor () {
const accors = document.querySelectorAll('.accor')
const content = document.querySelectorAll('.accor-content')
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
}
mobileAccor()


//===============================/===============================/===============================/===============================/===============================//===============================/===============================/===============================/===============================/===============================
//===============================/===============================/===============================/===============================/===============================//===============================/===============================/===============================/===============================/===============================


const container = document.querySelector('.header__container')
const search = document.querySelector('.search-btn')


const topLineObj = {
	searchTranslate: function () {
		if (search.style.transform) {
			search.style.transform = `translateX(-${search.offsetLeft - 15}px)`
			}
			return container.offsetWidth
	},
	showTopInput: function () {
		search.style.transform = `translateX(-${search.offsetLeft - 15}px)`
			input.classList.add('inputActive')
			setTimeout ( () => {
				input.focus()}, 500)
	},
	hideTopInput: function () {
		setTimeout ( () => {input.value = '', 0})
			search.style.removeProperty('transform')
			input.classList.remove('inputActive')
	},
	closeSearch: function () {
		search.style.removeProperty('transform')
	input.classList.remove('inputActive')
	setTimeout ( () => {input.value = '', 300})
	}
	}





const left = () => {
window.addEventListener('resize', topLineObj.searchTranslate, false)
}
left()

const input = document.querySelector('#input-top')
function searchTranslate () {
	search.addEventListener('click', e => {
		if (!search.style.transform) {
			topLineObj.showTopInput()
		} else {
			topLineObj.hideTopInput()


	}
})
}

window.addEventListener('click', e => {
	if (!e.target.closest('.search-btn') && e.target !== input) {
		topLineObj.closeSearch()
}})


window.addEventListener('keydown', e => {
	if (e.key === "Escape") {
		topLineObj.closeSearch()

	}

})

searchTranslate()




const widthProgResize = () => {
	if (educationH3) {
		window.addEventListener('resize', e => {
			return educationH3.offsetWidth + "px"
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
if (content) {
if (!accor.classList.contains('education-accor-active')) {
	accor.classList.add('education-accor-active')
	content.classList.add('educationContentAccor')
	this.classList.add('btn-education-radio')
	this.children[0].children[1].style.transform = "rotate(-180deg)"

} else {
	accor.classList.remove('education-accor-active')
	content.classList.remove('educationContentAccor')

	setTimeout(() => {
		this.children[0].children[1].style.transform = "rotate(0deg)"


	}, 210);
	setTimeout(() => {
		this.classList.remove('btn-education-radio')

	}, 310);
}
}
}






window.addEventListener('load', e => {
	heightHours()
})
window.addEventListener('resize', e => {
	heightHours()
})

const heightHours = () => {
	const tableList1 = document.querySelector('.prof-table-list-1').offsetHeight
	const tableList2 = document.querySelector('.prof-table-list-2').offsetHeight
	const tableList3 = document.querySelector('.prof-table-list-3').offsetHeight
	const tableList4 = document.querySelector('.prof-table-list-4').offsetHeight
	const tableList5 = document.querySelector('.prof-table-list-5').offsetHeight
	const tableList6 = document.querySelector('.prof-table-list-6').offsetHeight
	const tableList7 = document.querySelector('.prof-table-list-7').offsetHeight

	document.querySelector('.prof-table-hours-1').style.height = tableList1 + 'px'
	document.querySelector('.prof-table-hours-2').style.height = tableList2 + 'px'
	document.querySelector('.prof-table-hours-3').style.height = tableList3 + 'px'
	document.querySelector('.prof-table-hours-4').style.height = tableList4 + 'px'
	document.querySelector('.prof-table-hours-5').style.height = tableList5 + 'px'
	document.querySelector('.prof-table-hours-6').style.height = tableList6 + 'px'
	document.querySelector('.prof-table-hours-7').style.height = tableList7 + 'px'
}
heightHours()






const btnSelectOne = document.querySelector('.btn-select-one')
const btnSelectTwo = document.querySelector('.btn-select-two')
const btnSelectThree = document.querySelector('.btn-select-three')
btnSelectOne.addEventListener('click', openSelect, false)
btnSelectTwo.addEventListener('click', openSelect, false)
btnSelectThree.addEventListener('click', openSelect, false)
function openSelect () {

	this.children[0].innerHTML = arrInfoFirstSecond.select
	if (!this.nextElementSibling.classList.contains('quarter-active')){

this.nextElementSibling.classList.toggle('quarter-active')
		this.children[1].style.transform = `rotate(-180deg)`
	this.nextElementSibling.addEventListener('click', e => {
		this.nextElementSibling.classList.remove('quarter-active')
		this.children[1].style.transform = `rotate(0deg)`
	})} else {
		this.nextElementSibling.classList.remove('quarter-active')
		this.children[1].style.transform = `rotate(0deg)`
	}
}



const outputJun = document.querySelector('.quarter-mobile-box__classes-output-jun')
const outputSin = document.querySelector('.quarter-mobile-box__classes-output-sin')
const outputJunSecond = document.querySelector('.output-jun-second')
const outputSinSecond = document.querySelector('.output-sin-second')
const outputJunThird = document.querySelector('.output-jun-third')
const outputSinThird = document.querySelector('.output-sin-third')
const arrInfoFirstSecond = {
	one: "01.09 - 26.10 (8 уч. недель)",
	oneTitle: "1 четверть",

	two: "07.11 - 24.12 (7 уч. недель)",
	twoTitle: "2 четверть",

	three: "09.01 - 04.03 (8 уч. недель)",
	threeTitle: "3 четверть",

	four: "13.03 - 27.05 (11 уч. недель)",
	fourTitle: "4 четверть",

	pa: "29.05 - 10.06 (2 уч. недель)",
	paTwo: "15.05 - 20.05 (1 уч. недель)",

	paTitle: "ПА",

	select: "Выберите период",
//===============//===============//===============//===============//===============//===============//===============//===============//===============

	sinOne: "01.09 - 26.10 (8 уч. недель)",
	sinTwo: "07.11 - 24.12 (7 уч. недель)",
	sinThree: "09.01 - 04.03 (8 уч. недель)",
	sinFour: "13.03 - 13.05 (9 уч. недель)",


	oneSecond: "01.09 - 24.12 (15 уч. недель)",
	oneTitleSecond: "1 полугодие",

	twoSecond: "09.01 - 27.05 (19 уч. недель)",
	twoTitleSecond: "2 полугодие",

	sinOneSecond: "01.09 - 24.12 (15 уч. недель)",
	sinTwoSecond: "09.01 - 13.05 (17 уч. недель)",


	//===============//===============//===============//===============//===============//===============//===============//===============//===============

	seasonFirst: "27.10 - 06.11 (11 дней)",
	sinSeasonFirst: "27.10 - 06.11 (11 дней)",
	seasonFirstTitle: "Осенние",

	seasonSecond: "25.12 - 08.01 (15 дней)",
	sinSeasonSecond: "25.12 - 08.01 (15 дней)",
	seasonSecondTitle: "Зимние",

	seasonThird: "05.03 - 12.03 (8 дней)",
	sinSeasonThird: "05.03 - 12.03 (8 дней)",
	seasonThirdTitle: "Весенние",

	seasonFourth: "11.06 - 31.08 (82 дня)",
	sinSeasonFourth: "ГИА",
	seasonFourthTitle: "Летние",



}



let currentDate = new Date()
let startFirstQuarter = new Date('2022-09-01')
let endFirstQuarter = new Date('2022-10-26')
let startSecondQuarter = new Date('2022-11-07')
let endSecondQuarter = new Date('2022-12-24')
let startThirdQuarter = new Date('2022-01-09')
let endThirdQuarter = new Date('2022-03-04')
let startFourthQuarter = new Date('2022-03-13')
let endFourthQuarter = new Date('2022-05-27')





const showTableInQuarter = () => {
	if (currentDate >= startFirstQuarter && currentDate <= endFirstQuarter) {
		outputJun.innerHTML = arrInfoFirstSecond.one
		outputSin.innerHTML = arrInfoFirstSecond.sinOne
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle

//==============================//==============================//==============================//==============================//==============================//==============================


		outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond

//==============================//==============================//==============================//==============================//==============================//==============================


		console.log('Первая четверть')
	}
	if (currentDate >= startSecondQuarter && currentDate <= endSecondQuarter) {
		outputJun.innerHTML = arrInfoFirstSecond.two
		outputSin.innerHTML = arrInfoFirstSecond.sinTwo
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle

//==============================//==============================//==============================//==============================//==============================//==============================


		outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond

//==============================//==============================//==============================//==============================//==============================//==============================
outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFirstTitle

		console.log('Вторая')
	}
	if (currentDate >= startThirdQuarter && currentDate <= endThirdQuarter) {
		outputJun.innerHTML = arrInfoFirstSecond.three
		outputSin.innerHTML = arrInfoFirstSecond.sinThree
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond
		outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond
		btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonSecondTitle
//==============================//==============================//==============================//==============================//==============================//==============================

		outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond
//==============================//==============================//==============================//==============================//==============================//==============================
outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonThirdTitle
		console.log('Третья')
	}
	if (currentDate >= startFourthQuarter && currentDate <= endFourthQuarter) {
		outputJun.innerHTML = arrInfoFirstSecond.four
		outputSin.innerHTML = arrInfoFirstSecond.sinFour
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle

//===============================//==============================//==============================//==============================//==============================//==============================

		outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond

//==============================//==============================//==============================//==============================//==============================//==============================
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFourthTitle
		console.log('Четвёртая')
	}
//


}
showTableInQuarter()

const btnLiSelect1 = document.querySelector('#quarter-li-1').addEventListener('click', e => {
	outputJun.innerHTML = arrInfoFirstSecond.one
	outputSin.innerHTML = arrInfoFirstSecond.one
	btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle


})
const btnLiSelect2 = document.querySelector('#quarter-li-2').addEventListener('click', e => {
	outputJun.innerHTML = arrInfoFirstSecond.two
	outputSin.innerHTML = arrInfoFirstSecond.two
	btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle


})
const btnLiSelect3 = document.querySelector('#quarter-li-3').addEventListener('click', e => {
	outputJun.innerHTML = arrInfoFirstSecond.three
	outputSin.innerHTML = arrInfoFirstSecond.three
	btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle



})
const btnLiSelect4 = document.querySelector('#quarter-li-4').addEventListener('click', e => {
	outputJun.innerHTML = arrInfoFirstSecond.four
	outputSin.innerHTML = arrInfoFirstSecond.four
	btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle



})
const btnLiSelect5 = document.querySelector('#quarter-li-5').addEventListener('click', e => {
	outputJun.innerHTML = arrInfoFirstSecond.pa
	outputSin.innerHTML = arrInfoFirstSecond.pa
	btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.paTitle

})



const btnLiSelectSecond1 = document.querySelector('#quarter-li-1-second').addEventListener('click', e => {
	outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond
	outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond
	btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond


})
const btnLiSelectSecond2 = document.querySelector('#quarter-li-2-second').addEventListener('click', e => {
	outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond
	outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond
	btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond



})
const btnLiSelectSecond3 = document.querySelector('#quarter-li-3-second').addEventListener('click', e => {
	outputJunSecond.innerHTML = arrInfoFirstSecond.pa
	outputSinSecond.innerHTML = arrInfoFirstSecond.paTwo
	btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.paTitle



})





const btnLiSelectSeason1 = document.querySelector('#quarter-li-1-third').addEventListener('click', e => {
	outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFirstTitle



})
const btnLiSelectSeason2 = document.querySelector('#quarter-li-2-third').addEventListener('click', e => {
	outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonSecondTitle



})
const btnLiSelectSeason3 = document.querySelector('#quarter-li-3-third').addEventListener('click', e => {
	outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonThirdTitle



})
const btnLiSelectSeason4 = document.querySelector('#quarter-li-4-third').addEventListener('click', e => {
	outputJunThird.innerHTML = arrInfoFirstSecond.seasonFourth
	outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth
	btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFourthTitle



})







// const arrInfoSin = [
// 	"01.09 - 26.10
// 	(8 уч. недель)",
// 	"07.11 - 24.12
// 	(7 уч. недель)",
// 	"09.01 - 04.03
// 	(8 уч. недель)",
// 	"13.03 - 13.05
// 	(9 уч. недель)",
// 	"15.05 - 20.05
// 	(1 уч. недель)",
// ]
























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
