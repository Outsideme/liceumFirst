

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



			document.querySelectorAll('.btn-education-accor').forEach(e=> {e.addEventListener('click', btnAccorEducationOpen, false)})
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
	const progTable = document.querySelector('.prog-table')
	if (progTable) {
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
}}
heightHours()




const btnSelectOne = document.querySelector('.btn-select-one')
const btnSelectTwo = document.querySelector('.btn-select-two')
const btnSelectThree = document.querySelector('.btn-select-three')
if (btnSelectOne) {
btnSelectOne.addEventListener('click', openSelect, false)
btnSelectTwo.addEventListener('click', openSelect, false)
btnSelectThree.addEventListener('click', openSelect, false)
function openSelect () {
	this.classList.toggle('btn-education-radio')
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
}


const outputJun = document.querySelectorAll('.quarter-mobile-box__classes-output-jun')
const outputSin = document.querySelectorAll('.quarter-mobile-box__classes-output-sin')
const outputJunSecond = document.querySelector('.output-jun-second')
const outputSinSecond = document.querySelector('.output-sin-second')
const outputJunThird = document.querySelector('.output-jun-third')
const outputSinThird = document.querySelector('.output-sin-third')
const tableIf = document.querySelector('.education-tables__table')
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


const dateObj = {
	currentDate: new Date(),
	startFirstQuarter: new Date('2022-09-01'),
	endFirstQuarter: new Date('2022-10-26'),
	startSecondQuarter: new Date('2022-11-07'),
	endSecondQuarter: new Date('2022-12-24'),
	startThirdQuarter: new Date('2022-01-09'),
	endThirdQuarter: new Date('2022-03-04'),
	startFourthQuarter: new Date('2022-03-13'),
	endFourthQuarter: new Date('2022-05-27'),



	teachersExpYears2023: new Date(2023, 9, 1, 0, 0),
	teachersExpYears2024: new Date(2024, 9, 1, 0, 0),
	teachersExpYears2025: new Date(2025, 9, 1, 0, 0),
	teachersExpYears2026: new Date(2026, 9, 1, 0, 0),
	teachersExpYears2027: new Date(2027, 9, 1, 0, 0),
	teachersExpYears2028: new Date(2028, 9, 1, 0, 0),
	teachersExpYears2029: new Date(2029, 9, 1, 0, 0),
	teachersExpYears2030: new Date(2030, 9, 1, 0, 0),
	teachersExpYears2031: new Date(2031, 9, 1, 0, 0),
	teachersExpYears2032: new Date(2032, 9, 1, 0, 0),


}



const showTableInQuarter = () => {
if (tableIf) {
	if (dateObj.currentDate >= dateObj.startFirstQuarter && dateObj.currentDate <= dateObj.endFirstQuarter) {
		outputJun.innerHTML = arrInfoFirstSecond.one
		outputSin.innerHTML = arrInfoFirstSecond.sinOne
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle

//==============================//==============================//==============================//==============================//==============================//==============================


		outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond

//==============================//==============================//==============================//==============================//==============================//==============================


	}
	if (dateObj.currentDate >= dateObj.startSecondQuarter && dateObj.currentDate <= dateObj.endSecondQuarter) {
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
	}
	if (dateObj.currentDate >= dateObj.startThirdQuarter && dateObj.currentDate <= dateObj.endThirdQuarter) {
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
	}
	if (dateObj.currentDate >= dateObj.startFourthQuarter && dateObj.currentDate <= dateObj.endFourthQuarter) {
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
	}
}
}

showTableInQuarter()





document.querySelectorAll('.li-select').forEach(e =>  e.addEventListener('click', function (event) {

	if (event.target.contains(document.getElementById('quarter-li-1'))) {
		outputJun.innerHTML = arrInfoFirstSecond.one
		outputSin.innerHTML = arrInfoFirstSecond.sinOne
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle
	} else if (event.target.contains(document.getElementById('quarter-li-2'))) {
		outputJun.innerHTML = arrInfoFirstSecond.two
		outputSin.innerHTML = arrInfoFirstSecond.sinTwo
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle
	} else if (event.target.contains(document.getElementById('quarter-li-3'))) {
		outputJun.innerHTML = arrInfoFirstSecond.three
		outputSin.innerHTML = arrInfoFirstSecond.sinThree
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle
	} else if (event.target.contains(document.getElementById('quarter-li-4'))) {
		outputJun.innerHTML = arrInfoFirstSecond.four
		outputSin.innerHTML = arrInfoFirstSecond.sinFour
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle
	} else if (event.target.contains(document.getElementById('quarter-li-5'))) {
		outputJun.innerHTML = arrInfoFirstSecond.pa
		outputSin.innerHTML = arrInfoFirstSecond.paTwo
		btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.paTitle
	}



	if (event.target.contains(document.getElementById('quarter-li-1-second'))) {
		outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond
	} else if (event.target.contains(document.getElementById('quarter-li-2-second'))) {
	 	outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond
		outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond
	} else if (event.target.contains(document.getElementById('quarter-li-3-second'))) {
		outputJunSecond.innerHTML = arrInfoFirstSecond.pa
		outputSinSecond.innerHTML = arrInfoFirstSecond.paTwo
		btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.paTitle
	}


	if (event.target.contains(document.getElementById('quarter-li-1-third'))) {
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst
		outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst
		btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFirstTitle
	} else if (event.target.contains(document.getElementById('quarter-li-2-third'))) {
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond
		outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond
		btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonSecondTitle
	} else if (event.target.contains(document.getElementById('quarter-li-3-third'))) {
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird
		outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird
		btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonThirdTitle
	} else if (event.target.contains(document.getElementById('quarter-li-4-third'))) {
		outputJunThird.innerHTML = arrInfoFirstSecond.seasonFourth
		outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth
		btnSelectThree.children[0].innerHTML = arrInfoFirstSecond.seasonFourthTitle
	}
}))





const endYears = {
	let: 'лет',
	goda: 'года',
	god: 'год',
}

//==============================//==============================//==============================//==============================//==============================//==============================

function changeExp() {
	let workExp = document.querySelectorAll('.expTeach')


//==============================//==============================
	let yearExpCounter = workExp[0].textContent.split(" ")[0]
	yearExpCounter = String(Number(yearExpCounter) + 1)
	let yearExpArray = new Array(yearExpCounter)[0].split('')
	let lastComparsion = yearExpCounter [yearExpArray.length - 1]
//==============================//==============================


		if ( yearExpCounter >= 5 && yearExpCounter <= 20 || lastComparsion >= 5 && lastComparsion <= 9 || lastComparsion == 0) {

			return workExp[0].textContent = `${yearExpCounter} ${endYears.let}`
		}
		if ( lastComparsion == 2 ||lastComparsion == 3 || lastComparsion == 4 ) {
			workExp[0].textContent = `${yearExpCounter} ${endYears.goda}`
		}
		if ( lastComparsion == 1) {
			workExp[0].textContent = `${yearExpCounter} ${endYears.god}`
		}

	}


//==============================//==============================//==============================//==============================//==============================//==============================



function changeExpSec() {
	let workExpSec = document.querySelectorAll('.expTeachSec')

//==============================//==============================


	let yearExpCounterSec = workExpSec[0].textContent.split(" ")[0]
	yearExpCounterSec = String(Number(yearExpCounterSec) + 1)
	let yearExpArraySec = new Array(yearExpCounterSec)[0].split('')
	let lastComparsionSec = yearExpCounterSec [yearExpArraySec.length - 1]
//==============================//==============================


		if ( yearExpCounterSec >= 5 && yearExpCounterSec <= 20 || lastComparsionSec >= 5 && lastComparsionSec <= 9 || lastComparsionSec == 0) {

			return workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.let}`
		}
		if ( lastComparsionSec == 2 || lastComparsionSec == 3 || lastComparsionSec == 4 ) {
			workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.goda}`
		}
		if ( lastComparsionSec == 1) {
			workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.god}`
		}



	}

	if (dateObj.currentDate > dateObj.teachersExpYears2023) {
		changeExp()
		changeExpSec()
	}
	if (dateObj.currentDate > dateObj.teachersExpYears2024) {
		changeExp()
		changeExpSec()
	}

	if (dateObj.currentDate > dateObj.teachersExpYears2025) {
		changeExp()
		changeExpSec()
	}
	if (dateObj.currentDate > dateObj.teachersExpYears2026) {
		changeExp()
		changeExpSec()
	}

	if (dateObj.currentDate > dateObj.teachersExpYears2027) {
		changeExp()
		changeExpSec()
	}
	if (dateObj.currentDate > dateObj.teachersExpYears2028) {
		changeExp()
		changeExpSec()
	}

	if (dateObj.currentDate > dateObj.teachersExpYears2029) {
		changeExp()
		changeExpSec()
	}
	if (dateObj.currentDate > dateObj.teachersExpYears2030) {
		changeExp()
		changeExpSec()
	}

	if (dateObj.currentDate > dateObj.teachersExpYears2031) {
		changeExp()
		changeExpSec()
	}
	if (dateObj.currentDate > dateObj.teachersExpYears2032) {
		changeExp()
		changeExpSec()
	}






const eyeBtn = document.querySelector('.buttom-top-eye')
const topLine = document.querySelector('.header__top-line')



eyeBtn.addEventListener('click', e => {
	topLine.classList.toggle('top-line-active')
	eyeBtn.classList.toggle('eyeActive')


})




const menuItem = document.querySelectorAll('.menu-item')
const organizationSubs = document.querySelectorAll('.organization-subs')
const educationTable = document.querySelectorAll('.education-tables__table')
const educationTitles = document.querySelectorAll('.education-tables__titles')
const educationTablesBorderLeft = document.querySelectorAll('.education-tables-border-left')
const btnEducationAccor = document.querySelectorAll('.btn-education-accor')
const cardTeam = document.querySelectorAll('.card-team')
const cardTeamPosition = document.querySelectorAll('.card-team__position')
const footerLinkChange = document.querySelectorAll('.footer-link-change')
const boxEducationContent = document.querySelectorAll('.box-content-accor')
const quarterMobile = document.querySelectorAll('.quarter-mobile')
const buttonSelect = document.querySelectorAll('.button-select')
const quarterMobileContentLi = document.querySelectorAll('.quarter-mobile-content')
const quarterMobileContainer = document.querySelectorAll('.quarter-mobile-box__container')
const menuHidden = document.querySelectorAll('.menu-hidden')
const menuLinkA = document.querySelectorAll('.link-a')
const menuLink = document.querySelectorAll('.menu-link')
const changeHeader = document.querySelector('.header__body')
const body = document.querySelector('main')
const footer = document.querySelector('.footer')
const crumbs = document.querySelector('.crumbs')
const crumbsTitle = document.querySelectorAll('.crumbs-link')
const mainTableBox = document.querySelector('.main-table-box')
const progTable = document.querySelector('.prog-table')
const mainDescription = document.querySelector('.leaders__main-description')
const hunterSection = document.querySelector('.hunter-section')
const hunterSectionLink = document.querySelector('.hunter-section__link')
const organizationSvgs = document.querySelectorAll('.organization-svg')
const organizationSvgsColor = document.querySelectorAll('.svg-footer-color')
const footerButtons = document.querySelectorAll('.footer-buttons')
const docSvg = document.querySelectorAll('#doc')
const docSvgEdu = document.querySelectorAll('#doc-edu')
const progMiddleEducation = document.querySelector('.prog-middle-education')
const progTopList = document.querySelector('.prog-top-list')
const progTopListBorderBottom = document.querySelectorAll('.prog-top-list-border-bottom')
const progBottomList = document.querySelectorAll('.prog-bottom-list')
const progBottomHours = document.querySelector('.prog-bottom-hours')
const quarterMobileTitleClasses = document.querySelectorAll('.quarter-mobile-box__title-classes')
const quarterMobileJun = document.querySelectorAll('.quarter-mobile-box__classes-jun')
const quarterMobileOutputJun = document.querySelectorAll('.quarter-mobile-box__classes-output-jun')
const quarterMobileSelect = document.querySelectorAll('.quarter-mobile-box__select')
const mainInfoTable = document.querySelectorAll('.main-info-table')
const mainInfoTableBorder = document.querySelectorAll('.main-table-item-border-bottom')
const links = document.querySelectorAll('a')
const mtoTable = document.querySelectorAll('.mto-table')
const mtoTableItem = document.querySelectorAll('.mto-table-item')
const mtoCountBorder = document.querySelectorAll('.mto-count-border')
const mtoCount = document.querySelectorAll('.mto-count')
const teachersMainPhrase = document.querySelectorAll('.teachers-main__phrase')
const teachersPoint = document.querySelectorAll('.teachers-point')
const teachersPosition = document.querySelectorAll('.teachers-main__position')
const teachersRaising = document.querySelectorAll('.teachers__raising')
const orgItems = document.querySelectorAll('.organization__items')


menuLink.forEach(elem => {
	elem.classList.add('hover-add')
})
console.log(crumbsTitle)
console.log(menuItem)





const educationTablesRow1 = document.querySelectorAll('.education-tables__row-1')
const mainInfoPseudoLeft = document.querySelectorAll('.main-table-item-pseudo-left')

mainInfoPseudoLeft.forEach(e => {
	e.classList.add('main-table-item-pseudo-left-add')
})
const progBoxTitle = document.querySelectorAll('.prog-box-title')
progBoxTitle.forEach(e => {
	e.classList.add('prog-profile-pseudo-before')
})



const logo = document.querySelector('#logo')
mtoCount.forEach(elem => {
	elem.classList.add('mto-count-pdeudo-before')
})
quarterMobileSelect.forEach(e => {
	e.classList.add('quarter-mobile-box__select-pseudo-before')
})
outputJun.forEach(e => {
	e.classList.add('quarter-mobile-box__select-pseudo-before')
})
outputSin.forEach(e => {
	e.classList.add('quarter-mobile-box__select-pseudo-before')
})
const progTopHours = document.querySelectorAll('.prog-top-hours-before')
progTopHours.forEach(e => {
	e.classList.add('prog-top-hours-pseudo-before')
})


		function brownThemeToggle () {
			window.localStorage.clear()
			window.localStorage.setItem('brownBg', '#3B2716')
			window.localStorage.setItem('brownBgText', '#A9E44D')
			body.style.backgroundColor = localStorage.getItem('brownBg')
			body.style.color = localStorage.getItem('brownBgText')
			changeHeader.style.backgroundColor = localStorage.getItem('brownBg')
			changeHeader.style.color = localStorage.getItem('brownBgText')
			changeHeader.style.borderTop = '1px solid #A9E44D'
			changeHeader.style.borderBottom = '1px solid #A9E44D'
			footer.style.backgroundColor = localStorage.getItem('brownBg')
			footer.style.color = localStorage.getItem('brownBgText')
			footer.style.borderTop = '1px solid #A9E44D'
			crumbs.style.backgroundColor = localStorage.getItem('brownBg')
			crumbs.style.borderTop = '1px solid #A9E44D'
			crumbs.style.borderBottom = '1px solid #A9E44D'
			docSvgEdu.forEach(elem => {
				elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-vanilla', 'doc-color-blue')
				// elem.classList.remove('doc-color-black')
				// elem.classList.remove('doc-color-vanilla')
				// elem.classList.remove('doc-color-blue')
				elem.classList.add('doc-color-brown')

			})
			docSvg.forEach(elem => {
				elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-vanilla', 'doc-color-blue')
				// elem.classList.remove('doc-color-black')
				// elem.classList.remove('doc-color-vanilla')
				// elem.classList.remove('doc-color-blue')
				elem.classList.add('doc-color-brown')

			})
			crumbsTitle.forEach(elem => {
				elem.style.color = localStorage.getItem('brownBgText')

			})
			if (hunterSection !== null && hunterSectionLink !== null) {
				hunterSection.style.backgroundColor = localStorage.getItem('brownBg')
				hunterSection.style.border = '1px solid #A9E44D'
				hunterSectionLink.style.backgroundColor = localStorage.getItem('brownBg')
				hunterSectionLink.style.border = '1px solid #A9E44D'
				hunterSectionLink.style.color = localStorage.getItem('brownBgText')

			}
			if (mainDescription !== null) {
				mainDescription.style.backgroundColor = localStorage.getItem('brownBg')
				mainDescription.style.border = '1px solid #A9E44D'

			}


			if (mainTableBox !== null) {
				mainTableBox.style.backgroundColor = localStorage.getItem('brownBg')
				mainTableBox.style.color = localStorage.getItem('brownBgText')
			}
			teachersMainPhrase.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('brownBg')
				elem.style.border = '1px solid #A9E44D'
			})
			teachersPoint.forEach(elem => {
				elem.style.color = localStorage.getItem('brownBgText')
			})
			teachersPosition.forEach(elem => {
				elem.style.color = localStorage.getItem('brownBgText')
			})
			teachersRaising.forEach(elem => {
				elem.style.borderBottom = '1px solid #A9E44D'
			})
			organizationSvgs.forEach(elem => {
				elem.classList.add('organization-svg-brown')
			})
			organizationSvgsColor.forEach(elem => {
				elem.classList.remove('organization-svg-blue')
				elem.classList.add('organization-svg-brown')
			})



			logo.classList.remove('logo-color-black', 'logo-color-white', 'logo-color-blue', 'logo-color-vanilla')
			// logo.classList.remove('logo-color-white')
			// logo.classList.remove('logo-color-blue')
			// logo.classList.remove('logo-color-vanilla')
			logo.classList.add('logo-color-brown')
			footerButtons.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('brownBg')
				elem.style.border = '1px solid #A9E44D'
			})
			mtoTable.forEach(elem => {

				elem.style.border = '1px solid #A9E44D'
			})
			mtoTableItem.forEach(elem => {

				elem.style.borderBottom = '1px solid #A9E44D'
			})
			mtoCountBorder.forEach(elem => {
				elem.style.borderBottom = '1px solid #A9E44D'


			})
			mtoCount.forEach(elem => {
				elem.classList.remove('mto-count-pdeudo-before', 'mto-count-pdeudo-before-vanilla', 'mto-count-pdeudo-before-black', 'mto-count-pdeudo-before-white', 'mto-count-pdeudo-before-blue')
				// elem.classList.remove('mto-count-pdeudo-before-vanilla')
				// elem.classList.remove('mto-count-pdeudo-before-black')
				// elem.classList.remove('mto-count-pdeudo-before-white')
				// elem.classList.remove('mto-count-pdeudo-before-blue')
				elem.classList.add('mto-count-pdeudo-before-brown')

			})

			if (mainInfoTable !== null) {
				mainInfoTable.forEach(elem => {
					elem.style.border = '1px solid #A9E44D'
				})
				mainInfoTableBorder.forEach(elem => {
					elem.style.borderBottom = '1px solid #A9E44D'
				})
				mainInfoPseudoLeft.forEach(elem => {
					elem.classList.remove('main-table-item-pseudo-left-add', 'main-table-item-pseudo-left-add-black', 'main-table-item-pseudo-left-add-white', 'main-table-item-pseudo-left-add-vanilla', 'main-table-item-pseudo-left-add-blue')
					// elem.classList.remove('main-table-item-pseudo-left-add-brown')
					// elem.classList.remove('main-table-item-pseudo-left-add-white')
					// elem.classList.remove('main-table-item-pseudo-left-add-vanilla')
					// elem.classList.remove('main-table-item-pseudo-left-add-blue')
					elem.classList.add('main-table-item-pseudo-left-add-brown')
				})
				links.forEach(elem => {
					elem.style.color = localStorage.getItem('brownBgText')

				})
			}

			if (progTable !== null) {
				progTable.style.backgroundColor = localStorage.getItem('brownBg')
				progTable.style.color = localStorage.getItem('brownBgText')
				progTable.style.border = '1px solid #A9E44D'
				progMiddleEducation.style.borderTop = '1px solid #A9E44D'
				progTopList.style.borderLeft = '1px solid #A9E44D'
				document.querySelector('.prog-profile').classList.remove('pog-profile-pseudo-before')
				educationTable.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.color = localStorage.getItem('brownBgText')
					elem.style.border = '1px solid #A9E44D'
				})}
				progBottomList.forEach(elem => {
					elem.style.borderLeft = '1px solid #A9E44D'
					elem.style.borderTop = '1px solid #A9E44D'

				})
				if (progBottomHours !== null) {
				progBottomHours.style.borderTop = '1px solid #A9E44D'
				quarterMobile.forEach(e => {

					e.style.border = '1px solid #A9E44D'
				})}
				quarterMobileTitleClasses.forEach(e => {

					e.style.borderBottom = '1px solid #A9E44D'
				})
				quarterMobileJun.forEach(e => {

					e.style.borderBottom = '1px solid #A9E44D'
				})
				quarterMobileSelect.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.add('quarter-mobile-box__select-pseudo-before-brown')
				})
				outputJun.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.add('quarter-mobile-box__select-pseudo-before-brown')
				})
				outputSin.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.add('quarter-mobile-box__select-pseudo-before-brown')
				})
				quarterMobileOutputJun.forEach(e => {

					e.style.borderBottom = '1px solid #A9E44D'
				})
				quarterMobileSelect.forEach(e => {

					e.style.borderBottom = '1px solid #A9E44D'
				})
				organizationSvgs.forEach(elem => {
					elem.classList.remove('organization-svg-blue', 'organization-svg-white', 'organization-svg-black', 'organization-svg-vanilla')
					// elem.classList.remove('organization-svg-white')
					// elem.classList.remove('organization-svg-black')
					// elem.classList.remove('organization-svg-vanilla')
					elem.classList.add('organization-svg-brown')
				})
				organizationSvgsColor.forEach(elem => {
					elem.classList.remove('organization-svg-blue', 'organization-svg-white', 'organization-svg-black', 'organization-svg-vanilla')
					// elem.classList.remove('organization-svg-white')
					// elem.classList.remove('organization-svg-black')
					// elem.classList.remove('organization-svg-vanilla')
					elem.classList.add('organization-svg-brown')
				})
				// quarterMobileSin
				progTopListBorderBottom.forEach(elem => {
					elem.style.borderBottom = '1px solid #A9E44D'

				})
				cardTeamPosition.forEach(elem => {
					elem.style.color = localStorage.getItem('brownBgText')

				})
				progTopHours.forEach(e => {

					e.classList.remove('prog-top-hours-pseudo-before')
					e.classList.add('prog-top-hours-pseudo-before-brown')
				})
				educationTablesBorderLeft.forEach(elem => {
					elem.style.borderLeft = '1px solid #A9E44D'

				})
				progBoxTitle.forEach(e => {
					e.classList.remove('prog-profile-pseudo-before')
					e.classList.add('prog-profile-pseudo-before-brown')
				})


				educationTablesRow1.forEach(elem => {
					elem.style.borderBottom = '1px solid #A9E44D'

				})
				educationTitles.forEach(elem => {
					elem.style.borderBottom = '1px solid #A9E44D'

				})
				progBoxTitle.forEach(elem => {
					elem.style.borderBottom = '1px solid #A9E44D'

				})
				boxEducationContent.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.border = '1px solid #A9E44D'
				})
				quarterMobileContainer.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.borderBottom = '1px solid #A9E44D'
					elem.style.borderLeft = '1px solid #A9E44D'
					elem.style.borderRight = '1px solid #A9E44D'

				})
				cardTeam.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.padding = '8px'
					elem.style.borderLeft = '1px solid #A9E44D'
					elem.style.borderRight = '1px solid #A9E44D'

				})
				quarterMobileContentLi.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.borderBottom = '1px solid #A9E44D'

				})
				buttonSelect.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.border = '1px solid #A9E44D'
				})
				quarterMobile.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
				})
				btnEducationAccor.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.border = '1px solid #A9E44D'
				})
				menuHidden.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.color = localStorage.getItem('brownBgText')
					elem.style.border = '1px solid #A9E44D'
				})
				menuLink.forEach(elem => {
					elem.classList.remove('hover-add', 'hover-add-color-blue', 'hover-add-color-vanilla', 'hover-add-color-black', 'hover-add-color-white')

					elem.classList.add('hover-add-color-brown')
					console.log(menuLink)
				})
				menuLinkA.forEach(elem => {
					elem.style.color = localStorage.getItem('brownBgText')
				})
				organizationSubs.forEach(e => {
					e.style.color = localStorage.getItem('brownBgText')
				})
				footerLinkChange.forEach(e => {
					e.style.color = localStorage.getItem('brownBgText')
				})
				orgItems.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('brownBg')
					elem.style.border = '1px solid #A9E44D'
				})
				menuItem.forEach(elem => {
					elem.style.color = localStorage.getItem('brownBgText')
				})
		}
		function blueThemeToggle () {
	window.localStorage.clear()
	window.localStorage.setItem('blueBg', '#9DD1FF')
	window.localStorage.setItem('blueBgText', '#25282B')
	body.style.backgroundColor = localStorage.getItem('blueBg')
	body.style.color = localStorage.getItem('blueBgText')
	changeHeader.style.backgroundColor = localStorage.getItem('blueBg')
	changeHeader.style.color = localStorage.getItem('blueBgText')
	changeHeader.style.borderTop = '1px solid #25282B'
	changeHeader.style.borderBottom = '1px solid #25282B'
	footer.style.backgroundColor = localStorage.getItem('blueBg')
	footer.style.color = localStorage.getItem('blueBgText')
	footer.style.borderTop = '1px solid #25282B'
	crumbs.style.backgroundColor = localStorage.getItem('blueBg')
	crumbs.style.borderTop = '1px solid #25282B'
	crumbs.style.borderBottom = '1px solid #25282B'
	docSvgEdu.forEach(elem => {
		elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-vanilla', 'doc-color-brown')
		elem.classList.add('doc-color-blue')

	})
	docSvg.forEach(elem => {
		elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-vanilla', 'doc-color-brown')
		elem.classList.add('doc-color-blue')

	})
	crumbsTitle.forEach(elem => {
		elem.style.color = localStorage.getItem('blueBgText')

	})
	if (hunterSection !== null && hunterSectionLink !== null) {
		hunterSection.style.backgroundColor = localStorage.getItem('blueBg')
		hunterSection.style.border = '1px solid #25282B'
		hunterSectionLink.style.backgroundColor = localStorage.getItem('blueBg')
		hunterSectionLink.style.border = '1px solid #25282B'
		hunterSectionLink.style.color = localStorage.getItem('blueBgText')

	}
	if (mainDescription !== null) {
		mainDescription.style.backgroundColor = localStorage.getItem('blueBg')
		mainDescription.style.border = '1px solid #25282B'

	}


	if (mainTableBox !== null) {
		mainTableBox.style.backgroundColor = localStorage.getItem('blueBg')
		mainTableBox.style.color = localStorage.getItem('blueBgText')
	}
	teachersMainPhrase.forEach(elem => {
		elem.style.backgroundColor = localStorage.getItem('blueBg')
		elem.style.border = '1px solid #25282B'
	})
	teachersPoint.forEach(elem => {
		elem.style.color = localStorage.getItem('blueBgText')
	})
	teachersPosition.forEach(elem => {
		elem.style.color = localStorage.getItem('blueBgText')
	})
	teachersRaising.forEach(elem => {
		elem.style.borderBottom = '1px solid #25282B'
	})
	organizationSvgs.forEach(elem => {
		elem.classList.remove('organization-svg-brown', 'organization-svg-white', 'organization-svg-black', 'organization-svg-vanilla')
		// elem.classList.remove('organization-svg-white')
		// elem.classList.remove('organization-svg-black')
		// elem.classList.remove('organization-svg-vanilla')
		elem.classList.add('organization-svg-blue')
	})
	organizationSvgsColor.forEach(elem => {
		elem.classList.remove('organization-svg-brown', 'organization-svg-white', 'organization-svg-black', 'organization-svg-vanilla')
		// elem.classList.remove('organization-svg-white')
		// elem.classList.remove('organization-svg-black')
		// elem.classList.remove('organization-svg-vanilla')
		elem.classList.add('organization-svg-blue')
	})
	logo.classList.remove('logo-color-black', 'logo-color-white', 'logo-color-vanilla', 'logo-color-brown')
	// logo.classList.remove('logo-color-white')
	// logo.classList.remove('logo-color-vanilla')
	// logo.classList.remove('logo-color-brown')
	logo.classList.add('logo-color-blue')

	mtoTable.forEach(elem => {

		elem.style.border = '1px solid #25282B'
	})
	footerButtons.forEach(elem => {
		elem.style.backgroundColor = localStorage.getItem('blueBg')
		elem.style.border = '1px solid #25282B'
	})
	mtoTableItem.forEach(elem => {

		elem.style.borderBottom = '1px solid #25282B'
	})
	mtoCountBorder.forEach(elem => {
		elem.style.borderBottom = '1px solid #25282B'


	})
	mtoCount.forEach(elem => {
		elem.classList.remove('mto-count-pdeudo-before')
		elem.classList.remove('mto-count-pdeudo-before-vanilla')
		elem.classList.remove('mto-count-pdeudo-before-black')
		elem.classList.remove('mto-count-pdeudo-before-white')
		elem.classList.remove('mto-count-pdeudo-before-brown')
		elem.classList.remove('mto-count-pdeudo-before-blue')
		elem.classList.add('mto-count-pdeudo-before-blue')

	})

	if (mainInfoTable !== null) {
		mainInfoTable.forEach(elem => {
			elem.style.border = '1px solid #25282B'
		})
		mainInfoTableBorder.forEach(elem => {
			elem.style.borderBottom = '1px solid #25282B'
		})
		mainInfoPseudoLeft.forEach(elem => {
			elem.classList.remove('main-table-item-pseudo-left-add', 'main-table-item-pseudo-left-add-brown', 'main-table-item-pseudo-left-add-white', 'main-table-item-pseudo-left-add-vanilla', 'main-table-item-pseudo-left-add-black')
			// elem.classList.remove('main-table-item-pseudo-left-add-brown')
			// elem.classList.remove('main-table-item-pseudo-left-add-white')
			// elem.classList.remove('main-table-item-pseudo-left-add-vanilla')
			// elem.classList.remove('main-table-item-pseudo-left-add-blue')
			elem.classList.add('main-table-item-pseudo-left-add-blue')
		})
		links.forEach(elem => {
			elem.style.color = localStorage.getItem('blueBgText')

		})

	}

	if (progTable !== null) {
		progTable.style.backgroundColor = localStorage.getItem('blueBg')
		progTable.style.color = localStorage.getItem('blueBgText')
		progTable.style.border = '1px solid #25282B'
		progMiddleEducation.style.borderTop = '1px solid #25282B'
		progTopList.style.borderLeft = '1px solid #25282B'
		document.querySelector('.prog-profile').classList.remove('pog-profile-pseudo-before')
		educationTable.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.color = localStorage.getItem('blueBgText')
			elem.style.border = '1px solid #25282B'
		})}
		progBottomList.forEach(elem => {
			elem.style.borderLeft = '1px solid #25282B'
			elem.style.borderTop = '1px solid #25282B'

		})
		if (progBottomHours !== null) {
		progBottomHours.style.borderTop = '1px solid #25282B'
		quarterMobile.forEach(e => {

			e.style.border = '1px solid #25282B'
		})}
		quarterMobileTitleClasses.forEach(e => {

			e.style.borderBottom = '1px solid #25282B'
		})
		quarterMobileJun.forEach(e => {

			e.style.borderBottom = '1px solid #25282B'
		})
		quarterMobileSelect.forEach(e => {
			e.classList.remove('quarter-mobile-box__select-pseudo-before')
			e.classList.remove('quarter-mobile-box__select-pseudo-before-brown')
			e.classList.add('quarter-mobile-box__select-pseudo-before-blue')
		})
		outputJun.forEach(e => {
			e.classList.remove('quarter-mobile-box__select-pseudo-before')
			e.classList.add('quarter-mobile-box__select-pseudo-before-blue')
		})
		outputSin.forEach(e => {
			e.classList.remove('quarter-mobile-box__select-pseudo-before')
			e.classList.add('quarter-mobile-box__select-pseudo-before-blue')
		})
		quarterMobileOutputJun.forEach(e => {

			e.style.borderBottom = '1px solid #25282B'
		})
		quarterMobileSelect.forEach(e => {

			e.style.borderBottom = '1px solid #25282B'
		})

		// quarterMobileSin
		progTopListBorderBottom.forEach(elem => {
			elem.style.borderBottom = '1px solid #25282B'

		})
		cardTeamPosition.forEach(elem => {
			elem.style.color = localStorage.getItem('blueBgText')

		})
		progTopHours.forEach(e => {

			e.classList.remove('prog-top-hours-pseudo-before')
			e.classList.add('prog-top-hours-pseudo-before-blue')
		})
		educationTablesBorderLeft.forEach(elem => {
			elem.style.borderLeft = '1px solid #25282B'

		})
		progBoxTitle.forEach(e => {
			e.classList.remove('prog-profile-pseudo-before')
			e.classList.add('prog-profile-pseudo-before-blue')
		})


		educationTablesRow1.forEach(elem => {
			elem.style.borderBottom = '1px solid #25282B'

		})
		educationTitles.forEach(elem => {
			elem.style.borderBottom = '1px solid #25282B'

		})
		progBoxTitle.forEach(elem => {
			elem.style.borderBottom = '1px solid #25282B'

		})
		boxEducationContent.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.border = '1px solid #25282B'
		})
		quarterMobileContainer.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.borderBottom = '1px solid #25282B'
			elem.style.borderLeft = '1px solid #25282B'
			elem.style.borderRight = '1px solid #25282B'

		})
		cardTeam.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.padding = '8px'
			elem.style.borderLeft = '1px solid #25282B'
			elem.style.borderRight = '1px solid #25282B'

		})
		quarterMobileContentLi.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.borderBottom = '1px solid #25282B'

		})
		buttonSelect.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.border = '1px solid #25282B'
		})
		quarterMobile.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
		})
		btnEducationAccor.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.border = '1px solid #25282B'
		})
		menuHidden.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.color = localStorage.getItem('blueBgText')
			elem.style.border = '1px solid #25282B'
		})
		menuLink.forEach(elem => {
			elem.classList.remove('hover-add')
			elem.classList.remove('hover-add-color-brown')
			elem.classList.remove('hover-add-color-vanilla')
			elem.classList.remove('hover-add-color-black')
			elem.classList.remove('hover-add-color-white')
			elem.classList.add('hover-add-color-blue')
			console.log(menuLink)
		})
		menuLinkA.forEach(elem => {
			elem.style.color = localStorage.getItem('blueBgText')
		})
		organizationSubs.forEach(e => {
			e.style.color = localStorage.getItem('blueBgText')
		})
		footerLinkChange.forEach(e => {
			e.style.color = localStorage.getItem('blueBgText')
		})
		orgItems.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('blueBg')
			elem.style.border = '1px solid #25282B'
		})
		menuItem.forEach(elem => {
			elem.style.color = localStorage.getItem('blueBgText')
		})

		}
		function vanillaThemeToggle () {
		window.localStorage.clear()
		window.localStorage.setItem('vanillaBg', '#F7F3D6')
		window.localStorage.setItem('vanillaBgText', '#4D4B43')
		body.style.backgroundColor = localStorage.getItem('vanillaBg')
		body.style.color = localStorage.getItem('vanillaBgText')
		changeHeader.style.backgroundColor = localStorage.getItem('vanillaBg')
		changeHeader.style.color = localStorage.getItem('vanillaBgText')
		changeHeader.style.borderTop = '1px solid #4D4B43'
		changeHeader.style.borderBottom = '1px solid #4D4B43'
		footer.style.backgroundColor = localStorage.getItem('vanillaBg')
		footer.style.color = localStorage.getItem('vanillaBgText')
		footer.style.borderTop = '1px solid #4D4B43'
		crumbs.style.backgroundColor = localStorage.getItem('vanillaBg')
		crumbs.style.borderTop = '1px solid #4D4B43'
		crumbs.style.borderBottom = '1px solid #4D4B43'
		docSvgEdu.forEach(elem => {
			elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-blue', 'doc-color-brown')
			elem.classList.add('doc-color-vanilla')

		})
		docSvg.forEach(elem => {
			elem.classList.remove('doc-color-white', 'doc-color-black', 'doc-color-blue', 'doc-color-brown')
			elem.classList.add('doc-color-vanilla')

		})
		crumbsTitle.forEach(elem => {
			elem.style.color = localStorage.getItem('vanillaBgText')

		})
		if (hunterSection !== null && hunterSectionLink !== null) {
			hunterSection.style.backgroundColor = localStorage.getItem('vanillaBg')
			hunterSection.style.border = '1px solid #4D4B43'
			hunterSectionLink.style.backgroundColor = localStorage.getItem('vanillaBg')
			hunterSectionLink.style.border = '1px solid #4D4B43'
			hunterSectionLink.style.color = localStorage.getItem('vanillaBgText')

		}
		if (mainDescription !== null) {
			mainDescription.style.backgroundColor = localStorage.getItem('vanillaBg')
			mainDescription.style.border = '1px solid #4D4B43'

		}


		if (mainTableBox !== null) {
			mainTableBox.style.backgroundColor = localStorage.getItem('vanillaBg')
			mainTableBox.style.color = localStorage.getItem('vanillaBgText')
		}
		teachersMainPhrase.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('vanillaBg')
			elem.style.border = '1px solid #4D4B43'
		})
		teachersPoint.forEach(elem => {
			elem.style.color = localStorage.getItem('vanillaBgText')
		})
		teachersPosition.forEach(elem => {
			elem.style.color = localStorage.getItem('vanillaBgText')
		})
		teachersRaising.forEach(elem => {
			elem.style.borderBottom = '1px solid #4D4B43'
		})
		organizationSvgs.forEach(elem => {
			elem.classList.remove('organization-svg-brown')
			elem.classList.remove('organization-svg-white')
			elem.classList.remove('organization-svg-black')
			elem.classList.remove('organization-svg-blue')
			elem.classList.add('organization-svg-vanilla')
		})
		organizationSvgsColor.forEach(elem => {
			elem.classList.remove('organization-svg-brown')
			elem.classList.remove('organization-svg-white')
			elem.classList.remove('organization-svg-black')
			elem.classList.remove('organization-svg-blue')
			elem.classList.add('organization-svg-vanilla')
		})
		logo.classList.remove('logo-color-black')
		logo.classList.remove('logo-color-white')
		logo.classList.remove('logo-color-blue')
		logo.classList.remove('logo-color-brown')
		logo.classList.add('logo-color-vanilla')
		footerButtons.forEach(elem => {
			elem.style.backgroundColor = localStorage.getItem('vanillaBg')
			elem.style.border = '1px solid #4D4B43'
		})
		mtoTable.forEach(elem => {

			elem.style.border = '1px solid #4D4B43'
		})
		mtoTableItem.forEach(elem => {

			elem.style.borderBottom = '1px solid #4D4B43'
		})
		mtoCountBorder.forEach(elem => {
			elem.style.borderBottom = '1px solid #4D4B43'


		})
		mtoCount.forEach(elem => {
			elem.classList.remove('mto-count-pdeudo-before')
			elem.classList.remove('mto-count-pdeudo-before-vanilla')
			elem.classList.remove('mto-count-pdeudo-before-black')
			elem.classList.remove('mto-count-pdeudo-before-white')
			elem.classList.remove('mto-count-pdeudo-before-blue')
			elem.classList.remove('mto-count-pdeudo-before-brown')
			elem.classList.add('mto-count-pdeudo-before-vanilla')

		})

		if (mainInfoTable !== null) {
			mainInfoTable.forEach(elem => {
				elem.style.border = '1px solid #4D4B43'
			})
			mainInfoTableBorder.forEach(elem => {
				elem.style.borderBottom = '1px solid #4D4B43'
			})
			mainInfoPseudoLeft.forEach(elem => {
				mainInfoPseudoLeft.forEach(elem => {
					elem.classList.remove('main-table-item-pseudo-left-add', 'main-table-item-pseudo-left-add-brown', 'main-table-item-pseudo-left-add-white', 'main-table-item-pseudo-left-add-black', 'main-table-item-pseudo-left-add-blue')
					// elem.classList.remove('main-table-item-pseudo-left-add-brown')
					// elem.classList.remove('main-table-item-pseudo-left-add-white')
					// elem.classList.remove('main-table-item-pseudo-left-add-vanilla')
					// elem.classList.remove('main-table-item-pseudo-left-add-blue')
					elem.classList.add('main-table-item-pseudo-left-add-vanilla')
				})
			})
			links.forEach(elem => {
				elem.style.color = localStorage.getItem('vanillaBgText')

			})
		}

		if (progTable !== null) {
			progTable.style.backgroundColor = localStorage.getItem('vanillaBg')
			progTable.style.color = localStorage.getItem('vanillaBgText')
			progTable.style.border = '1px solid #4D4B43'
			progMiddleEducation.style.borderTop = '1px solid #4D4B43'
			progTopList.style.borderLeft = '1px solid #4D4B43'
			document.querySelector('.prog-profile').classList.remove('pog-profile-pseudo-before')
			educationTable.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.color = localStorage.getItem('vanillaBgText')
				elem.style.border = '1px solid #4D4B43'
			})}
			progBottomList.forEach(elem => {
				elem.style.borderLeft = '1px solid #4D4B43'
				elem.style.borderTop = '1px solid #4D4B43'

			})
			if (progBottomHours !== null) {
			progBottomHours.style.borderTop = '1px solid #4D4B43'
			quarterMobile.forEach(e => {

				e.style.border = '1px solid #4D4B43'
			})}
			quarterMobileTitleClasses.forEach(e => {

				e.style.borderBottom = '1px solid #4D4B43'
			})
			quarterMobileJun.forEach(e => {

				e.style.borderBottom = '1px solid #4D4B43'
			})
			quarterMobileSelect.forEach(e => {
				e.classList.remove('quarter-mobile-box__select-pseudo-before')
				e.classList.remove('quarter-mobile-box__select-pseudo-before-brown')
				e.classList.add('quarter-mobile-box__select-pseudo-before-vanilla')
			})
			outputJun.forEach(e => {
				e.classList.remove('quarter-mobile-box__select-pseudo-before')
				e.classList.add('quarter-mobile-box__select-pseudo-before-vanilla')
			})
			outputSin.forEach(e => {
				e.classList.remove('quarter-mobile-box__select-pseudo-before')
				e.classList.add('quarter-mobile-box__select-pseudo-before-vanilla')
			})
			quarterMobileOutputJun.forEach(e => {

				e.style.borderBottom = '1px solid #4D4B43'
			})
			quarterMobileSelect.forEach(e => {

				e.style.borderBottom = '1px solid #4D4B43'
			})

			// quarterMobileSin
			progTopListBorderBottom.forEach(elem => {
				elem.style.borderBottom = '1px solid #4D4B43'

			})
			cardTeamPosition.forEach(elem => {
				elem.style.color = localStorage.getItem('vanillaBgText')

			})
			progTopHours.forEach(e => {

				e.classList.remove('prog-top-hours-pseudo-before')
				e.classList.add('prog-top-hours-pseudo-before-vanilla')
			})
			educationTablesBorderLeft.forEach(elem => {
				elem.style.borderLeft = '1px solid #4D4B43'

			})
			progBoxTitle.forEach(e => {
				e.classList.remove('prog-profile-pseudo-before')
				e.classList.add('prog-profile-pseudo-before-vanilla')
			})


			educationTablesRow1.forEach(elem => {
				elem.style.borderBottom = '1px solid #4D4B43'

			})
			educationTitles.forEach(elem => {
				elem.style.borderBottom = '1px solid #4D4B43'

			})
			progBoxTitle.forEach(elem => {
				elem.style.borderBottom = '1px solid #4D4B43'

			})
			boxEducationContent.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.border = '1px solid #4D4B43'
			})
			quarterMobileContainer.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.borderBottom = '1px solid #4D4B43'
				elem.style.borderLeft = '1px solid #4D4B43'
				elem.style.borderRight = '1px solid #4D4B43'

			})
			cardTeam.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.padding = '8px'
				elem.style.borderLeft = '1px solid #4D4B43'
				elem.style.borderRight = '1px solid #4D4B43'

			})
			quarterMobileContentLi.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.borderBottom = '1px solid #4D4B43'

			})
			buttonSelect.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.border = '1px solid #4D4B43'
			})
			quarterMobile.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
			})
			btnEducationAccor.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.border = '1px solid #4D4B43'
			})
			menuHidden.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.color = localStorage.getItem('vanillaBgText')
				elem.style.border = '1px solid #4D4B43'
			})
			menuLink.forEach(elem => {
				elem.classList.remove('hover-add')
				elem.classList.remove('hover-add-color-brown')
				elem.classList.remove('hover-add-color-blue')
				elem.classList.remove('hover-add-color-black')
				elem.classList.remove('hover-add-color-white')
				elem.classList.add('hover-add-color-vanilla')
				console.log(menuLink)
			})
			menuLinkA.forEach(elem => {
				elem.style.color = localStorage.getItem('vanillaBgText')
			})
			organizationSubs.forEach(e => {
				e.style.color = localStorage.getItem('vanillaBgText')
			})
			footerLinkChange.forEach(e => {
				e.style.color = localStorage.getItem('vanillaBgText')
			})
			orgItems.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('vanillaBg')
				elem.style.border = '1px solid #4D4B43'
			})
			menuItem.forEach(elem => {
				elem.style.color = localStorage.getItem('vanillaBgText')
			})

		}
		function blackThemeToggle () {
			window.localStorage.clear()
			window.localStorage.setItem('blackBg', '#000000')
			window.localStorage.setItem('blackBgText', '#ffffff')
			body.style.backgroundColor = localStorage.getItem('blackBg')
			body.style.color = localStorage.getItem('blackBgText')
			changeHeader.style.backgroundColor = localStorage.getItem('blackBg')
			changeHeader.style.color = localStorage.getItem('blackBgText')
			changeHeader.style.borderTop = '1px solid #ffffff'
			changeHeader.style.borderBottom = '1px solid #ffffff'
			footer.style.backgroundColor = localStorage.getItem('blackBg')
			footer.style.color = localStorage.getItem('blackBgText')
			footer.style.borderTop = '1px solid #ffffff'
			crumbs.style.backgroundColor = localStorage.getItem('blackBg')
			crumbs.style.borderTop = '1px solid #ffffff'
			crumbs.style.borderBottom = '1px solid #ffffff'
			docSvgEdu.forEach(elem => {
				elem.classList.remove('doc-color-white', 'doc-color-vanilla', 'doc-color-blue', 'doc-color-brown')
				elem.classList.add('doc-color-black')

			})
			docSvg.forEach(elem => {
				elem.classList.remove('doc-color-white', 'doc-color-vanilla', 'doc-color-blue', 'doc-color-brown')
				elem.classList.add('doc-color-black')

			})
			crumbsTitle.forEach(elem => {
				elem.style.color = localStorage.getItem('blackBgText')

			})
			if (hunterSection !== null && hunterSectionLink !== null) {
				hunterSection.style.backgroundColor = localStorage.getItem('blackBg')
				hunterSection.style.border = '1px solid #ffffff'
				hunterSectionLink.style.backgroundColor = localStorage.getItem('blackBg')
				hunterSectionLink.style.border = '1px solid #ffffff'
				hunterSectionLink.style.color = localStorage.getItem('blackBgText')

			}
			if (mainDescription !== null) {
				mainDescription.style.backgroundColor = localStorage.getItem('blackBg')
				mainDescription.style.border = '1px solid #ffffff'

			}


			if (mainTableBox !== null) {
				mainTableBox.style.backgroundColor = localStorage.getItem('blackBg')
				mainTableBox.style.color = localStorage.getItem('blackBgText')
			}
			teachersMainPhrase.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('blackBg')
				elem.style.border = '1px solid #ffffff'
			})
			teachersPoint.forEach(elem => {
				elem.style.color = localStorage.getItem('blackBgText')
			})
			teachersPosition.forEach(elem => {
				elem.style.color = localStorage.getItem('blackBgText')
			})
			teachersRaising.forEach(elem => {
				elem.style.borderBottom = '1px solid #ffffff'
			})
			organizationSvgs.forEach(elem => {
				elem.classList.remove('organization-svg-brown')
				elem.classList.remove('organization-svg-white')
				elem.classList.remove('organization-svg-vanilla')
				elem.classList.remove('organization-svg-blue')
				elem.classList.add('organization-svg-black')
			})
			organizationSvgsColor.forEach(elem => {
				elem.classList.remove('organization-svg-brown')
				elem.classList.remove('organization-svg-white')
				elem.classList.remove('organization-svg-vanilla')
				elem.classList.remove('organization-svg-blue')
				elem.classList.add('organization-svg-black')
			})
			logo.classList.remove('logo-color-vanilla', 'logo-color-white', 'logo-color-blue', 'logo-color-brown')
			// logo.classList.remove('logo-color-white')
			// logo.classList.remove('logo-color-blue')
			// logo.classList.remove('logo-color-brown')
			logo.classList.add('logo-color-black')
			footerButtons.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('blackBg')
				elem.style.border = '1px solid #ffffff'
			})
			mtoTable.forEach(elem => {

				elem.style.border = '1px solid #ffffff'
			})
			mtoTableItem.forEach(elem => {

				elem.style.borderBottom = '1px solid #ffffff'
			})
			mtoCountBorder.forEach(elem => {
				elem.style.borderBottom = '1px solid #ffffff'


			})
			mtoCount.forEach(elem => {
				elem.classList.remove('mto-count-pdeudo-before', 'mto-count-pdeudo-before-vanilla', 'mto-count-pdeudo-before-black', 'mto-count-pdeudo-before-white', 'mto-count-pdeudo-before-blue', 'mto-count-pdeudo-before-brown')
				// elem.classList.remove('mto-count-pdeudo-before-vanilla')
				// elem.classList.remove('mto-count-pdeudo-before-black')
				// elem.classList.remove('mto-count-pdeudo-before-white')
				// elem.classList.remove('mto-count-pdeudo-before-blue')
				// elem.classList.remove('mto-count-pdeudo-before-brown')
				elem.classList.add('mto-count-pdeudo-before-black')

			})

			if (mainInfoTable !== null) {
				mainInfoTable.forEach(elem => {
					elem.style.border = '1px solid #ffffff'
				})
				mainInfoTableBorder.forEach(elem => {
					elem.style.borderBottom = '1px solid #ffffff'
				})
				mainInfoPseudoLeft.forEach(elem => {
					elem.classList.remove('main-table-item-pseudo-left-add', 'main-table-item-pseudo-left-add-brown', 'main-table-item-pseudo-left-add-white', 'main-table-item-pseudo-left-add-vanilla', 'main-table-item-pseudo-left-add-blue')
					// elem.classList.remove('main-table-item-pseudo-left-add-brown')
					// elem.classList.remove('main-table-item-pseudo-left-add-white')
					// elem.classList.remove('main-table-item-pseudo-left-add-vanilla')
					// elem.classList.remove('main-table-item-pseudo-left-add-blue')
					elem.classList.add('main-table-item-pseudo-left-add-black')
				})
				links.forEach(elem => {
					elem.style.color = localStorage.getItem('blackBgText')

				})
			}

			if (progTable !== null) {
				progTable.style.backgroundColor = localStorage.getItem('blackBg')
				progTable.style.color = localStorage.getItem('blackBgText')
				progTable.style.border = '1px solid #ffffff'
				progMiddleEducation.style.borderTop = '1px solid #ffffff'
				progTopList.style.borderLeft = '1px solid #ffffff'
				document.querySelector('.prog-profile').classList.remove('pog-profile-pseudo-before')
				educationTable.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.color = localStorage.getItem('blackBgText')
					elem.style.border = '1px solid #ffffff'
				})}
				progBottomList.forEach(elem => {
					elem.style.borderLeft = '1px solid #ffffff'
					elem.style.borderTop = '1px solid #ffffff'

				})
				if (progBottomHours !== null) {
				progBottomHours.style.borderTop = '1px solid #ffffff'
				quarterMobile.forEach(e => {

					e.style.border = '1px solid #ffffff'
				})}
				quarterMobileTitleClasses.forEach(e => {

					e.style.borderBottom = '1px solid #ffffff'
				})
				quarterMobileJun.forEach(e => {

					e.style.borderBottom = '1px solid #ffffff'
				})
				quarterMobileSelect.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.remove('quarter-mobile-box__select-pseudo-before-brown')
					e.classList.add('quarter-mobile-box__select-pseudo-before-black')
				})
				outputJun.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.add('quarter-mobile-box__select-pseudo-before-black')
				})
				outputSin.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before')
					e.classList.add('quarter-mobile-box__select-pseudo-before-black')
				})
				quarterMobileOutputJun.forEach(e => {

					e.style.borderBottom = '1px solid #ffffff'
				})
				quarterMobileSelect.forEach(e => {

					e.style.borderBottom = '1px solid #ffffff'
				})

				// quarterMobileSin
				progTopListBorderBottom.forEach(elem => {
					elem.style.borderBottom = '1px solid #ffffff'

				})
				cardTeamPosition.forEach(elem => {
					elem.style.color = localStorage.getItem('blackBgText')

				})
				progTopHours.forEach(e => {

					e.classList.remove('prog-top-hours-pseudo-before')
					e.classList.add('prog-top-hours-pseudo-before-black')
				})
				educationTablesBorderLeft.forEach(elem => {
					elem.style.borderLeft = '1px solid #ffffff'

				})
				progBoxTitle.forEach(e => {
					e.classList.remove('prog-profile-pseudo-before')
					e.classList.add('prog-profile-pseudo-before-black')
				})


				educationTablesRow1.forEach(elem => {
					elem.style.borderBottom = '1px solid #ffffff'

				})
				educationTitles.forEach(elem => {
					elem.style.borderBottom = '1px solid #ffffff'

				})
				progBoxTitle.forEach(elem => {
					elem.style.borderBottom = '1px solid #ffffff'

				})
				boxEducationContent.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.border = '1px solid #ffffff'
				})
				quarterMobileContainer.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.borderBottom = '1px solid #ffffff'
					elem.style.borderLeft = '1px solid #ffffff'
					elem.style.borderRight = '1px solid #ffffff'

				})
				cardTeam.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.padding = '8px'
					elem.style.borderLeft = '1px solid #ffffff'
					elem.style.borderRight = '1px solid #ffffff'

				})
				quarterMobileContentLi.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.borderBottom = '1px solid #ffffff'

				})
				buttonSelect.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.border = '1px solid #ffffff'
				})
				quarterMobile.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
				})
				btnEducationAccor.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.border = '1px solid #ffffff'
				})
				menuHidden.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.color = localStorage.getItem('blackBgText')
					elem.style.border = '1px solid #ffffff'
				})
				menuLink.forEach(elem => {
					elem.classList.remove('hover-add')
					elem.classList.remove('hover-add-color-brown')
					elem.classList.remove('hover-add-color-blue')
					elem.classList.remove('hover-add-color-vanilla')
					elem.classList.remove('hover-add-color-white')
					elem.classList.add('hover-add-color-black')
					console.log(menuLink)
				})
				menuLinkA.forEach(elem => {
					elem.style.color = localStorage.getItem('blackBgText')
				})
				organizationSubs.forEach(e => {
					e.style.color = localStorage.getItem('blackBgText')
				})
				footerLinkChange.forEach(e => {
					e.style.color = localStorage.getItem('blackBgText')
				})
				orgItems.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('blackBg')
					elem.style.border = '1px solid #ffffff'
				})
				menuItem.forEach(elem => {
					elem.style.color = localStorage.getItem('blackBgText')
				})

		}
		function whiteThemeToggle () {
			window.localStorage.clear()
			window.localStorage.setItem('whiteBg', '#ffffff')
			window.localStorage.setItem('whiteBgText', '#000000')
			body.style.backgroundColor = localStorage.getItem('whiteBg')
			body.style.color = localStorage.getItem('whiteBgText')
			changeHeader.style.backgroundColor = localStorage.getItem('whiteBg')
			changeHeader.style.color = localStorage.getItem('whiteBgText')
			changeHeader.style.borderTop = '1px solid #000000'
			changeHeader.style.borderBottom = '1px solid #000000'
			footer.style.backgroundColor = localStorage.getItem('whiteBg')
			footer.style.color = localStorage.getItem('whiteBgText')
			footer.style.borderTop = '1px solid #000000'
			crumbs.style.backgroundColor = localStorage.getItem('whiteBg')
			crumbs.style.borderTop = '1px solid #000000'
			crumbs.style.borderBottom = '1px solid #000000'
			docSvgEdu.forEach(elem => {
				elem.classList.remove('doc-color-black', 'doc-color-vanilla', 'doc-color-blue', 'doc-color-brown')
				elem.classList.add('doc-color-white')

			})
			docSvg.forEach(elem => {
				elem.classList.remove('doc-color-black', 'doc-color-vanilla', 'doc-color-blue', 'doc-color-brown')
				elem.classList.add('doc-color-white')

			})
			crumbsTitle.forEach(elem => {
				elem.style.color = localStorage.getItem('whiteBgText')

			})
			if (hunterSection !== null && hunterSectionLink !== null) {
				hunterSection.style.backgroundColor = localStorage.getItem('whiteBg')
				hunterSection.style.border = '1px solid #000000'
				hunterSectionLink.style.backgroundColor = localStorage.getItem('whiteBg')
				hunterSectionLink.style.border = '1px solid #000000'
				hunterSectionLink.style.color = localStorage.getItem('whiteBgText')

			}
			if (mainDescription !== null) {
				mainDescription.style.backgroundColor = localStorage.getItem('whiteBg')
				mainDescription.style.border = '1px solid #000000'

			}


			if (mainTableBox !== null) {
				mainTableBox.style.backgroundColor = localStorage.getItem('whiteBg')
				mainTableBox.style.color = localStorage.getItem('whiteBgText')
			}
			teachersMainPhrase.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('whiteBg')
				elem.style.border = '1px solid #000000'
			})
			teachersPoint.forEach(elem => {
				elem.style.color = localStorage.getItem('whiteBgText')
			})
			teachersPosition.forEach(elem => {
				elem.style.color = localStorage.getItem('whiteBgText')
			})
			teachersRaising.forEach(elem => {
				elem.style.borderBottom = '1px solid #000000'
			})
			organizationSvgs.forEach(elem => {
				elem.classList.remove('organization-svg-brown', 'organization-svg-black', 'organization-svg-vanilla', 'organization-svg-blue')
				// elem.classList.remove('organization-svg-black')
				// elem.classList.remove('organization-svg-vanilla')
				// elem.classList.remove('organization-svg-blue')
				elem.classList.add('organization-svg-white')
			})
			organizationSvgsColor.forEach(elem => {
				elem.classList.remove('organization-svg-brown', 'organization-svg-black', 'organization-svg-vanilla', 'organization-svg-blue')
				// elem.classList.remove('organization-svg-black')
				// elem.classList.remove('organization-svg-vanilla')
				// elem.classList.remove('organization-svg-blue')
				elem.classList.add('organization-svg-white')
			})
			logo.classList.remove('logo-color-vanilla', 'logo-color-black', 'logo-color-blue', 'logo-color-brown')
			// logo.classList.remove('logo-color-white')
			// logo.classList.remove('logo-color-blue')
			// logo.classList.remove('logo-color-brown')
			logo.classList.add('logo-color-white')
			footerButtons.forEach(elem => {
				elem.style.backgroundColor = localStorage.getItem('whiteBg')
				elem.style.border = '1px solid #000000'
			})
			mtoTable.forEach(elem => {

				elem.style.border = '1px solid #000000'
			})
			mtoTableItem.forEach(elem => {

				elem.style.borderBottom = '1px solid #000000'
			})
			mtoCountBorder.forEach(elem => {
				elem.style.borderBottom = '1px solid #000000'


			})
			mtoCount.forEach(elem => {
				elem.classList.remove('mto-count-pdeudo-before', 'mto-count-pdeudo-before-black', 'mto-count-pdeudo-before-vanilla', 'mto-count-pdeudo-before-blue', 'mto-count-pdeudo-before-brown')
				// elem.classList.remove('mto-count-pdeudo-before-vanilla')
				// elem.classList.remove('mto-count-pdeudo-before-black')
				// elem.classList.remove('mto-count-pdeudo-before-white')
				// elem.classList.remove('mto-count-pdeudo-before-blue')
				// elem.classList.remove('mto-count-pdeudo-before-brown')
				elem.classList.add('mto-count-pdeudo-before-white')

			})

			if (mainInfoTable !== null) {
				mainInfoTable.forEach(elem => {
					elem.style.border = '1px solid #000000'
				})
				mainInfoTableBorder.forEach(elem => {
					elem.style.borderBottom = '1px solid #000000'
				})
				mainInfoPseudoLeft.forEach(elem => {
					elem.classList.remove('main-table-item-pseudo-left-add', 'main-table-item-pseudo-left-add-brown', 'main-table-item-pseudo-left-add-black', 'main-table-item-pseudo-left-add-vanilla', 'main-table-item-pseudo-left-add-blue')
					elem.classList.add('main-table-item-pseudo-left-add-white')
				})
			}
			links.forEach(elem => {
				elem.style.color = localStorage.getItem('whiteBgText')

			})

			if (progTable !== null) {
				progTable.style.backgroundColor = localStorage.getItem('whiteBg')
				progTable.style.color = localStorage.getItem('whiteBgText')
				progTable.style.border = '1px solid #000000'
				progMiddleEducation.style.borderTop = '1px solid #000000'
				progTopList.style.borderLeft = '1px solid #000000'
				document.querySelector('.prog-profile').classList.remove('pog-profile-pseudo-before')
				educationTable.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.color = localStorage.getItem('whiteBgText')
					elem.style.border = '1px solid #000000'
				})}
				progBottomList.forEach(elem => {
					elem.style.borderLeft = '1px solid #000000'
					elem.style.borderTop = '1px solid #000000'

				})
				if (progBottomHours !== null) {
				progBottomHours.style.borderTop = '1px solid #000000'
				quarterMobile.forEach(e => {

					e.style.border = '1px solid #000000'
				})}
				quarterMobileTitleClasses.forEach(e => {

					e.style.borderBottom = '1px solid #000000'
				})
				quarterMobileJun.forEach(e => {

					e.style.borderBottom = '1px solid #000000'
				})
				quarterMobileSelect.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before', 'quarter-mobile-box__select-pseudo-before-brown', 'quarter-mobile-box__select-pseudo-before-black', 'quarter-mobile-box__select-pseudo-before-vanilla', 'quarter-mobile-box__select-pseudo-before-blue')
					e.classList.add('quarter-mobile-box__select-pseudo-before-white')
				})
				outputJun.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before', 'quarter-mobile-box__select-pseudo-before-brown', 'quarter-mobile-box__select-pseudo-before-black', 'quarter-mobile-box__select-pseudo-before-vanilla', 'quarter-mobile-box__select-pseudo-before-blue')
					e.classList.add('quarter-mobile-box__select-pseudo-before-white')
				})
				outputSin.forEach(e => {
					e.classList.remove('quarter-mobile-box__select-pseudo-before', 'quarter-mobile-box__select-pseudo-before-brown', 'quarter-mobile-box__select-pseudo-before-black', 'quarter-mobile-box__select-pseudo-before-vanilla', 'quarter-mobile-box__select-pseudo-before-blue')
					e.classList.add('quarter-mobile-box__select-pseudo-before-white')
				})
				quarterMobileOutputJun.forEach(e => {

					e.style.borderBottom = '1px solid #000000'
				})
				quarterMobileSelect.forEach(e => {

					e.style.borderBottom = '1px solid #000000'
				})

				// quarterMobileSin
				progTopListBorderBottom.forEach(elem => {
					elem.style.borderBottom = '1px solid #000000'

				})
				cardTeamPosition.forEach(elem => {
					elem.style.color = localStorage.getItem('whiteBgText')

				})
				progTopHours.forEach(e => {

					e.classList.remove('prog-top-hours-pseudo-before')
					e.classList.add('prog-top-hours-pseudo-before-white')
				})
				educationTablesBorderLeft.forEach(elem => {
					elem.style.borderLeft = '1px solid #000000'

				})
				progBoxTitle.forEach(e => {
					e.classList.remove('prog-profile-pseudo-before')
					e.classList.add('prog-profile-pseudo-before-white')
				})


				educationTablesRow1.forEach(elem => {
					elem.style.borderBottom = '1px solid #000000'

				})
				educationTitles.forEach(elem => {
					elem.style.borderBottom = '1px solid #000000'

				})
				progBoxTitle.forEach(elem => {
					elem.style.borderBottom = '1px solid #000000'

				})
				boxEducationContent.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.border = '1px solid #000000'
				})
				quarterMobileContainer.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.borderBottom = '1px solid #000000'
					elem.style.borderLeft = '1px solid #000000'
					elem.style.borderRight = '1px solid #000000'

				})
				cardTeam.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.padding = '8px'
					elem.style.borderLeft = '1px solid #000000'
					elem.style.borderRight = '1px solid #000000'

				})
				quarterMobileContentLi.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.borderBottom = '1px solid #000000'

				})
				buttonSelect.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.border = '1px solid #000000'
				})
				quarterMobile.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
				})
				btnEducationAccor.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.border = '1px solid #000000'
				})
				menuHidden.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.color = localStorage.getItem('whiteBgText')
					elem.style.border = '1px solid #000000'
				})
				menuLink.forEach(elem => {
					elem.classList.remove('hover-add', 'hover-add-color-brown', 'hover-add-color-blue', 'hover-add-color-vanilla', 'hover-add-color-black')
					elem.classList.add('hover-add-color-white')
					console.log(menuLink)
				})
				menuLinkA.forEach(elem => {
					elem.style.color = localStorage.getItem('whiteBgText')
				})
				organizationSubs.forEach(e => {
					e.style.color = localStorage.getItem('whiteBgText')
				})
				footerLinkChange.forEach(e => {
					e.style.color = localStorage.getItem('whiteBgText')
				})
				orgItems.forEach(elem => {
					elem.style.backgroundColor = localStorage.getItem('whiteBg')
					elem.style.border = '1px solid #000000'
				})
				menuItem.forEach(elem => {
					elem.style.color = localStorage.getItem('whiteBgText')
				})

		}



	document.querySelector('.web-color__brown').addEventListener('click', e => {
		brownThemeToggle()
	})
	document.querySelector('.web-color__blue').addEventListener('click', e => {
		blueThemeToggle()
	})

	document.querySelector('.web-color__vanilla').addEventListener('click', e => {
		vanillaThemeToggle()
	})
	document.querySelector('.web-color__white').addEventListener('click', e => {
		whiteThemeToggle()
	})
	document.querySelector('.web-color__black').addEventListener('click', e => {
		blackThemeToggle()
	})


	if (localStorage.getItem('brownBg')) {
		brownThemeToggle()
	} else if (localStorage.getItem('blueBg')) {
		blueThemeToggle()
	}  else if (localStorage.getItem('vanillaBg')) {
		vanillaThemeToggle()
	}  else if (localStorage.getItem('blackBg')) {
		blackThemeToggle()
	} else if (localStorage.getItem('whiteBg')) {
		whiteThemeToggle()
	} else {
		window.localStorage.clear()
	}


	document.querySelector('.impaired-bar__ussually-mode').addEventListener('click', e => {
		window.localStorage.clear()
		body.style.backgroundColor = ''
		body.style.color = ''
		orgItems.forEach(e => {
			e.style.backgroundColor = ''
			e.style.border = '0px solid #fff'
		})
		changeHeader.style.backgroundColor = ''
		changeHeader.style.color = ''

	})

// localStorage.forEach(elem => {
// 	console.log(elem)
// })
if (localStorage.getItem('brownBg') === '#3B2716') {
	console.log('work')
}
console.log(localStorage.getItem('brownBg'))
// if (localStorage.getItem('blueBg')) {
// }

// if (localStorage.getItem('vanillaBg')) {
// 	vanillaThemeToggle()
// }
// if (localStorage.getItem('blackBg')) {
// 	blackThemeToggle()
// }
// if (localStorage.getItem('whiteBg')) {
// 	whiteThemeToggle ()
// }


// if (localStorage.length == 0) {

// }



// location.reload()

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
