const burger = document.querySelector("[data-burger]");
const burgerLine = document.querySelector(".burger__line");
const mobileNav = document.querySelector("[data-nav]");
const header = document.querySelector(".header");
const mobilePageMenu = document.querySelectorAll(".mobile-page-menu");
const accorTitle = document.querySelectorAll(".accor-title");
// burger.classList.add("burger-test-vanilla");

// const burgerTest = document.querySelector(".burger-test");
const menuObj = {
  openCloseMainMenu: function () {
    this.children[0].classList.toggle("showHide");
  },
  burgerClose: function () {
    burger.classList.remove("burger-active");
    mobileNav.classList.remove("open-mobile");
  },
  burgerOpen: function () {
    burger.classList.toggle("burger-active");
    mobileNav.classList.toggle("open-mobile");
    topLine.classList.remove("top-line-active");
    eyeBtn.classList.remove("eyeActive");
  },
  headerResize: function () {
    const headerHeight = header.offsetHeight;
    mobileNav.style.top = `${headerHeight - 1}px`;
  },
  resizeHideMobile: function () {
    if (document.documentElement.clientWidth > 768) {
      menuObj.burgerClose();
    }
    menuObj.headerResize();
  },
  openMainMenu: function () {
    const menu = document.querySelectorAll(".menu-item");
    if (menu) {
      for (let i = 0; i < menu.length; i++) {
        let item = menu[i];
        item.addEventListener("mouseenter", menuObj.openCloseMainMenu, false);
        item.addEventListener("mouseleave", menuObj.openCloseMainMenu, false);
      }
    }
  },
};
// menuObj.headerResize();
menuObj.openMainMenu();

//===============================/===============================/===============================/===============================/===============================
console.log(header.offsetHeight);
//===============================/===============================/===============================/===============================/===============================

window.addEventListener("resize", menuObj.resizeHideMobile, false);
window.addEventListener("load", menuObj.resizeHideMobile, false);
burger.addEventListener("click", menuObj.burgerOpen, false);

function mobileAccor() {
  const accors = document.querySelectorAll(".accor");
  const content = document.querySelectorAll(".accor-content");
  accors.forEach((el) => {
    el.addEventListener("click", (e) => {
      const accorIcons = document.querySelectorAll(".accor-icon");
      const self = e.currentTarget.children[1].classList;
      const rotateArrow =
        e.currentTarget.children[0].children[1].children[0].classList;
      accorIcons.forEach((icon) => {
        icon.children[0].classList.remove("open-accor");
      });
      if (!e.currentTarget.children[1].classList.contains("open-accor")) {
        content.forEach((it) => {
          return it.classList.remove("open-accor");
        });
        self.add("open-accor");
        rotateArrow.add("open-accor");
      } else if (e.currentTarget.children[1].classList.contains("open-accor")) {
        rotateArrow.remove("open-accor");
        self.remove("open-accor");
      }
    });
  });
}
mobileAccor();

//===============================/===============================/===============================/===============================/===============================//===============================/===============================/===============================/===============================/===============================
//===============================/===============================/===============================/===============================/===============================//===============================/===============================/===============================/===============================/===============================

const container = document.querySelector(".header__container");
const search = document.querySelector(".search-btn");

const topLineObj = {
  searchTranslate: function () {
    if (search.style.transform) {
      search.style.transform = `translateX(-${search.offsetLeft - 15}px)`;
    }
    return container.offsetWidth;
  },
  showTopInput: function () {
    search.style.transform = `translateX(-${search.offsetLeft - 15}px)`;
    input.classList.add("inputActive");
    setTimeout(() => {
      input.focus();
    }, 500);
  },
  hideTopInput: function () {
    setTimeout(() => {
      (input.value = ""), 0;
    });
    search.style.removeProperty("transform");
    input.classList.remove("inputActive");
  },
  closeSearch: function () {
    search.style.removeProperty("transform");
    input.classList.remove("inputActive");
    setTimeout(() => {
      (input.value = ""), 300;
    });
  },
};

const left = () => {
  window.addEventListener("resize", topLineObj.searchTranslate, false);
};
left();

const input = document.querySelector("#input-top");
function searchTranslate() {
  search.addEventListener("click", (e) => {
    if (!search.style.transform) {
      topLineObj.showTopInput();
    } else {
      topLineObj.hideTopInput();
    }
  });
}

window.addEventListener("click", (e) => {
  if (!e.target.closest(".search-btn") && e.target !== input) {
    topLineObj.closeSearch();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    topLineObj.closeSearch();
  }
});

searchTranslate();

const widthProgResize = () => {
  if (educationH3) {
    window.addEventListener("resize", (e) => {
      return educationH3.offsetWidth + "px";
    });
  }
};

const widthEducationTable = () => {
  const educationH3 = document.querySelector("#educationH3");
  const periodEducation = document.querySelectorAll(".ourWidth-education");
  if (educationH3 && periodEducation) {
    for (let i = 0; i < periodEducation.length; i++) {
      const element = periodEducation[i];
      element.style.width = widthProgResize();
    }
  }
};
widthEducationTable();

document.querySelectorAll(".btn-education-accor").forEach((e) => {
  e.addEventListener("click", btnAccorEducationOpen, false);
});
function btnAccorEducationOpen() {
  const accor = this.nextElementSibling;
  const content = this.nextElementSibling.children[0];
  if (content) {
    if (!accor.classList.contains("education-accor-active")) {
      accor.classList.add("education-accor-active");
      content.classList.add("educationContentAccor");
      this.classList.add("btn-education-radio");
      this.children[0].children[1].style.transform = "rotate(-180deg)";
    } else {
      accor.classList.remove("education-accor-active");
      content.classList.remove("educationContentAccor");

      setTimeout(() => {
        this.children[0].children[1].style.transform = "rotate(0deg)";
      }, 210);
      setTimeout(() => {
        this.classList.remove("btn-education-radio");
      }, 310);
    }
  }
}

window.addEventListener("load", (e) => {
  heightHours();
});
window.addEventListener("resize", (e) => {
  heightHours();
});

const heightHours = () => {
  const progTable = document.querySelector(".prog-table");
  if (progTable) {
    const tableList1 =
      document.querySelector(".prof-table-list-1").offsetHeight;
    const tableList2 =
      document.querySelector(".prof-table-list-2").offsetHeight;
    const tableList3 =
      document.querySelector(".prof-table-list-3").offsetHeight;
    const tableList4 =
      document.querySelector(".prof-table-list-4").offsetHeight;
    const tableList5 =
      document.querySelector(".prof-table-list-5").offsetHeight;
    const tableList6 =
      document.querySelector(".prof-table-list-6").offsetHeight;
    const tableList7 =
      document.querySelector(".prof-table-list-7").offsetHeight;

    document.querySelector(".prof-table-hours-1").style.height =
      tableList1 + "px";
    document.querySelector(".prof-table-hours-2").style.height =
      tableList2 + "px";
    document.querySelector(".prof-table-hours-3").style.height =
      tableList3 + "px";
    document.querySelector(".prof-table-hours-4").style.height =
      tableList4 + "px";
    document.querySelector(".prof-table-hours-5").style.height =
      tableList5 + "px";
    document.querySelector(".prof-table-hours-6").style.height =
      tableList6 + "px";
    document.querySelector(".prof-table-hours-7").style.height =
      tableList7 + "px";
  }
};
heightHours();

const btnSelectOne = document.querySelector(".btn-select-one");
const btnSelectTwo = document.querySelector(".btn-select-two");
const btnSelectThree = document.querySelector(".btn-select-three");
if (btnSelectOne) {
  btnSelectOne.addEventListener("click", openSelect, false);
  btnSelectTwo.addEventListener("click", openSelect, false);
  btnSelectThree.addEventListener("click", openSelect, false);
  function openSelect() {
    this.classList.toggle("btn-education-radio");
    this.children[0].innerHTML = arrInfoFirstSecond.select;
    if (!this.nextElementSibling.classList.contains("quarter-active")) {
      this.nextElementSibling.classList.toggle("quarter-active");
      this.children[1].style.transform = `rotate(-180deg)`;
      this.nextElementSibling.addEventListener("click", (e) => {
        this.nextElementSibling.classList.remove("quarter-active");
        this.children[1].style.transform = `rotate(0deg)`;
      });
    } else {
      this.nextElementSibling.classList.remove("quarter-active");
      this.children[1].style.transform = `rotate(0deg)`;
    }
  }
}

const outputJun = document.querySelectorAll(
  ".quarter-mobile-box__classes-output-jun"
);
const outputSin = document.querySelectorAll(
  ".quarter-mobile-box__classes-output-sin"
);
const outputJunSecond = document.querySelector(".output-jun-second");
const outputSinSecond = document.querySelector(".output-sin-second");
const outputJunThird = document.querySelector(".output-jun-third");
const outputSinThird = document.querySelector(".output-sin-third");
const tableQuarter = document.querySelectorAll(".table-quarter");
const tableIf = document.querySelectorAll(".education-tables__table");
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

  select: "Период",
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
};

const dateObj = {
  currentDate: new Date(),
  startFirstQuarter: new Date("2022-09-01"),
  endFirstQuarter: new Date("2022-10-26"),
  startSecondQuarter: new Date("2022-11-07"),
  endSecondQuarter: new Date("2022-12-24"),
  startThirdQuarter: new Date("2022-01-09"),
  endThirdQuarter: new Date("2022-03-04"),
  startFourthQuarter: new Date("2022-03-13"),
  endFourthQuarter: new Date("2022-05-27"),

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
};

const showTableInQuarter = () => {
  if (tableIf.length > 0) {
    console.log(tableIf);
    if (
      dateObj.currentDate >= dateObj.startFirstQuarter &&
      dateObj.currentDate <= dateObj.endFirstQuarter
    ) {
      outputJun.innerHTML = arrInfoFirstSecond.one;
      outputSin.innerHTML = arrInfoFirstSecond.sinOne;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle;

      //==============================//==============================//==============================//==============================//==============================//==============================

      outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;

      //==============================//==============================//==============================//==============================//==============================//==============================
    }
    if (
      dateObj.currentDate >= dateObj.startSecondQuarter &&
      dateObj.currentDate <= dateObj.endSecondQuarter
    ) {
      outputJun.innerHTML = arrInfoFirstSecond.two;
      outputSin.innerHTML = arrInfoFirstSecond.sinTwo;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle;

      //==============================//==============================//==============================//==============================//==============================//==============================

      outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;

      //==============================//==============================//==============================//==============================//==============================//==============================
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonFirstTitle;
    }
    if (
      dateObj.currentDate >= dateObj.startThirdQuarter &&
      dateObj.currentDate <= dateObj.endThirdQuarter
    ) {
      outputJun.innerHTML = arrInfoFirstSecond.three;
      outputSin.innerHTML = arrInfoFirstSecond.sinThree;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle;
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonSecondTitle;
      //==============================//==============================//==============================//==============================//==============================//==============================

      outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;
      //==============================//==============================//==============================//==============================//==============================//==============================
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonThirdTitle;
    }
    if (
      dateObj.currentDate >= dateObj.startFourthQuarter &&
      dateObj.currentDate <= dateObj.endFourthQuarter
    ) {
      outputJun.innerHTML = arrInfoFirstSecond.four;
      outputSin.innerHTML = arrInfoFirstSecond.sinFour;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle;

      //===============================//==============================//==============================//==============================//==============================//==============================

      outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;

      //==============================//==============================//==============================//==============================//==============================//==============================
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonFourthTitle;
    }
  }
};

showTableInQuarter();

document.querySelectorAll(".li-select").forEach((e) =>
  e.addEventListener("click", function (event) {
    if (event.target.contains(document.getElementById("quarter-li-1"))) {
      outputJun.innerHTML = arrInfoFirstSecond.one;
      outputSin.innerHTML = arrInfoFirstSecond.sinOne;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.oneTitle;
    } else if (event.target.contains(document.getElementById("quarter-li-2"))) {
      outputJun.innerHTML = arrInfoFirstSecond.two;
      outputSin.innerHTML = arrInfoFirstSecond.sinTwo;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.twoTitle;
    } else if (event.target.contains(document.getElementById("quarter-li-3"))) {
      outputJun.innerHTML = arrInfoFirstSecond.three;
      outputSin.innerHTML = arrInfoFirstSecond.sinThree;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.threeTitle;
    } else if (event.target.contains(document.getElementById("quarter-li-4"))) {
      outputJun.innerHTML = arrInfoFirstSecond.four;
      outputSin.innerHTML = arrInfoFirstSecond.sinFour;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.fourTitle;
    } else if (event.target.contains(document.getElementById("quarter-li-5"))) {
      outputJun.innerHTML = arrInfoFirstSecond.pa;
      outputSin.innerHTML = arrInfoFirstSecond.paTwo;
      btnSelectOne.children[0].innerHTML = arrInfoFirstSecond.paTitle;
    }

    if (event.target.contains(document.getElementById("quarter-li-1-second"))) {
      outputJunSecond.innerHTML = arrInfoFirstSecond.oneSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinOneSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.oneTitleSecond;
    } else if (
      event.target.contains(document.getElementById("quarter-li-2-second"))
    ) {
      outputJunSecond.innerHTML = arrInfoFirstSecond.twoSecond;
      outputSinSecond.innerHTML = arrInfoFirstSecond.sinTwoSecond;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.twoTitleSecond;
    } else if (
      event.target.contains(document.getElementById("quarter-li-3-second"))
    ) {
      outputJunSecond.innerHTML = arrInfoFirstSecond.pa;
      outputSinSecond.innerHTML = arrInfoFirstSecond.paTwo;
      btnSelectTwo.children[0].innerHTML = arrInfoFirstSecond.paTitle;
    }

    if (event.target.contains(document.getElementById("quarter-li-1-third"))) {
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonFirst;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFirst;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonFirstTitle;
    } else if (
      event.target.contains(document.getElementById("quarter-li-2-third"))
    ) {
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonSecond;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonSecond;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonSecondTitle;
    } else if (
      event.target.contains(document.getElementById("quarter-li-3-third"))
    ) {
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonThird;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonThird;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonThirdTitle;
    } else if (
      event.target.contains(document.getElementById("quarter-li-4-third"))
    ) {
      outputJunThird.innerHTML = arrInfoFirstSecond.seasonFourth;
      outputSinThird.innerHTML = arrInfoFirstSecond.sinSeasonFourth;
      btnSelectThree.children[0].innerHTML =
        arrInfoFirstSecond.seasonFourthTitle;
    }
  })
);

const endYears = {
  let: "лет",
  goda: "года",
  god: "год",
};

//==============================//==============================//==============================//==============================//==============================//==============================

function changeExp() {
  let workExp = document.querySelectorAll(".expTeach");

  //==============================//==============================
  let yearExpCounter = workExp[0].textContent.split(" ")[0];
  yearExpCounter = String(Number(yearExpCounter) + 1);
  let yearExpArray = new Array(yearExpCounter)[0].split("");
  let lastComparsion = yearExpCounter[yearExpArray.length - 1];
  //==============================//==============================

  if (
    (yearExpCounter >= 5 && yearExpCounter <= 20) ||
    (lastComparsion >= 5 && lastComparsion <= 9) ||
    lastComparsion == 0
  ) {
    return (workExp[0].textContent = `${yearExpCounter} ${endYears.let}`);
  }
  if (lastComparsion == 2 || lastComparsion == 3 || lastComparsion == 4) {
    workExp[0].textContent = `${yearExpCounter} ${endYears.goda}`;
  }
  if (lastComparsion == 1) {
    workExp[0].textContent = `${yearExpCounter} ${endYears.god}`;
  }
}

//==============================//==============================//==============================//==============================//==============================//==============================

function changeExpSec() {
  let workExpSec = document.querySelectorAll(".expTeachSec");

  //==============================//==============================

  let yearExpCounterSec = workExpSec[0].textContent.split(" ")[0];
  yearExpCounterSec = String(Number(yearExpCounterSec) + 1);
  let yearExpArraySec = new Array(yearExpCounterSec)[0].split("");
  let lastComparsionSec = yearExpCounterSec[yearExpArraySec.length - 1];
  //==============================//==============================

  if (
    (yearExpCounterSec >= 5 && yearExpCounterSec <= 20) ||
    (lastComparsionSec >= 5 && lastComparsionSec <= 9) ||
    lastComparsionSec == 0
  ) {
    return (workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.let}`);
  }
  if (
    lastComparsionSec == 2 ||
    lastComparsionSec == 3 ||
    lastComparsionSec == 4
  ) {
    workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.goda}`;
  }
  if (lastComparsionSec == 1) {
    workExpSec[0].textContent = `${yearExpCounterSec} ${endYears.god}`;
  }
}

if (dateObj.currentDate > dateObj.teachersExpYears2023) {
  changeExp();
  changeExpSec();
}
if (dateObj.currentDate > dateObj.teachersExpYears2024) {
  changeExp();
  changeExpSec();
}

if (dateObj.currentDate > dateObj.teachersExpYears2025) {
  changeExp();
  changeExpSec();
}
if (dateObj.currentDate > dateObj.teachersExpYears2026) {
  changeExp();
  changeExpSec();
}

if (dateObj.currentDate > dateObj.teachersExpYears2027) {
  changeExp();
  changeExpSec();
}
if (dateObj.currentDate > dateObj.teachersExpYears2028) {
  changeExp();
  changeExpSec();
}

if (dateObj.currentDate > dateObj.teachersExpYears2029) {
  changeExp();
  changeExpSec();
}
if (dateObj.currentDate > dateObj.teachersExpYears2030) {
  changeExp();
  changeExpSec();
}

if (dateObj.currentDate > dateObj.teachersExpYears2031) {
  changeExp();
  changeExpSec();
}
if (dateObj.currentDate > dateObj.teachersExpYears2032) {
  changeExp();
  changeExpSec();
}

const eyeBtn = document.querySelector(".buttom-top-eye");
const topLine = document.querySelector(".header__top-line");

eyeBtn.addEventListener("click", (e) => {
  menuObj.burgerClose();
  topLine.classList.toggle("top-line-active");
  eyeBtn.classList.toggle("eyeActive");
});

const menuItem = document.querySelectorAll(".menu-item");
const organizationSubs = document.querySelectorAll(".organization-subs");
const educationTable = document.querySelectorAll(".education-tables__table");
const educationTitles = document.querySelectorAll(".education-tables__titles");
const educationTablesBorderLeft = document.querySelectorAll(
  ".education-tables-border-left"
);
const btnEducationAccor = document.querySelectorAll(".btn-education-accor");
const cardTeam = document.querySelectorAll(".card-team");
const cardTeamPosition = document.querySelectorAll(".card-team__position");
const footerLinkChange = document.querySelectorAll(".footer-link-change");
const boxEducationContent = document.querySelectorAll(".box-content-accor");
const quarterMobile = document.querySelectorAll(".quarter-mobile");
const buttonSelect = document.querySelectorAll(".button-select");
const quarterMobileContentLi = document.querySelectorAll(
  ".quarter-mobile-content"
);
const quarterMobileContainer = document.querySelectorAll(
  ".quarter-mobile-box__container"
);
const menuHidden = document.querySelectorAll(".menu-hidden");
const menuLinkA = document.querySelectorAll(".link-a");
const menuLink = document.querySelectorAll(".menu-link");
const changeHeader = document.querySelector(".header__body");
const body = document.querySelector("main");
const footer = document.querySelector(".footer");
const crumbs = document.querySelector(".crumbs");
const crumbsTitle = document.querySelectorAll(".crumbs-link");
const mainTableBox = document.querySelector(".main-table-box");
const progTable = document.querySelector(".prog-table");
const mainDescription = document.querySelector(".leaders__main-description");
const hunterSection = document.querySelector(".hunter-section");
const hunterSectionLink = document.querySelector(".hunter-section__link");
const organizationSvgs = document.querySelectorAll(".organization-svg");
const organizationSvgsColor = document.querySelectorAll(".svg-footer-color");
const footerButtons = document.querySelectorAll(".footer-buttons");
const docSvg = document.querySelectorAll("#doc");
const docSvgEdu = document.querySelectorAll("#doc-edu");
const progMiddleEducation = document.querySelector(".prog-middle-education");
const progTopList = document.querySelector(".prog-top-list");
const progTopListBorderBottom = document.querySelectorAll(
  ".prog-top-list-border-bottom"
);
const progBottomList = document.querySelectorAll(".prog-bottom-list");
const progBottomHours = document.querySelector(".prog-bottom-hours");
const quarterMobileTitleClasses = document.querySelectorAll(
  ".quarter-mobile-box__title-classes"
);
const quarterMobileJun = document.querySelectorAll(
  ".quarter-mobile-box__classes-jun"
);
const quarterMobileOutputJun = document.querySelectorAll(
  ".quarter-mobile-box__classes-output-jun"
);
const quarterMobileSelect = document.querySelectorAll(
  ".quarter-mobile-box__select"
);
const mainInfoTable = document.querySelectorAll(".main-info-table");
const mainInfoTableBorder = document.querySelectorAll(
  ".main-table-item-border-bottom"
);
const links = document.querySelectorAll("a");
const mtoTable = document.querySelectorAll(".mto-table");
const mtoTableItem = document.querySelectorAll(".mto-table-item");
const mtoCountBorder = document.querySelectorAll(".mto-count-border");
const mtoCount = document.querySelectorAll(".mto-count");
const teachersMainPhrase = document.querySelectorAll(".teachers-main__phrase");
const teachersPoint = document.querySelectorAll(".teachers-point");
const teachersPosition = document.querySelectorAll(".teachers-main__position");
const teachersRaising = document.querySelectorAll(".teachers__raising");
const orgItems = document.querySelectorAll(".organization__items");
const mainInfoLinks = document.querySelectorAll(".main-info-link");
const orgSubsBorderLeft = document.querySelectorAll(".orgSubsBorderLeft");
const orgSubsBorderTop = document.querySelectorAll(".orgSubsBorderTop");
const arrowEducation = document.querySelectorAll("#arrow-education");

const linksMiddleScreenAdded = document.querySelectorAll(
  ".links-middle-screen__added"
);
const structureBorderRight = document.querySelectorAll(
  ".structure-border-right"
);
menuLink.forEach((elem) => {
  elem.classList.add("hover-add");
});
const educationTablesRow1 = document.querySelectorAll(
  ".education-tables__row-1"
);
const mainInfoPseudoLeft = document.querySelectorAll(
  ".main-table-item-pseudo-left"
);
let themesNames = [];
const hoverAdd = ["hover-add", "hover-add-color-"];
const docColor = ["doc-color-"];
const pageColor = ["page-color-"];
const logoArr = ["logo-color-"];
const mtoCountPseudo = ["mto-count-pdeudo-before", "mto-count-pdeudo-before-"];
const mainTablePseudo = [
  "main-table-item-pseudo-left-add",
  "main-table-item-pseudo-left-add-",
];
const quarterPseudo = [
  "quarter-mobile-box__select-pseudo-before",
  "quarter-mobile-box__select-pseudo-before-",
];
const arrowEdu = ["arrow-education-"];
const organizationSvg = ["organization-svg", "organization-svg-"];
const progTopHoursPseudo = [
  "prog-top-hours-pseudo-before",
  "prog-top-hours-pseudo-before-",
];
const progProfilePseudo = [
  "prog-profile-pseudo-before",
  "prog-profile-pseudo-before-",
];
const burgerColor = ["burger-test-"];

mainInfoPseudoLeft.forEach((e) => {
  e.classList.add("main-table-item-pseudo-left-add");
});
const progBoxTitle = document.querySelectorAll(".prog-box-title");
progBoxTitle.forEach((e) => {
  e.classList.add("prog-profile-pseudo-before");
});

const logo = document.querySelector("#logo");
mtoCount.forEach((elem) => {
  elem.classList.add("mto-count-pdeudo-before");
});
quarterMobileSelect.forEach((e) => {
  e.classList.add("quarter-mobile-box__select-pseudo-before");
});
outputJun.forEach((e) => {
  e.classList.add("quarter-mobile-box__select-pseudo-before");
});
outputSin.forEach((e) => {
  e.classList.add("quarter-mobile-box__select-pseudo-before");
});
const progTopHours = document.querySelectorAll(".prog-top-hours-before");
progTopHours.forEach((e) => {
  e.classList.add("prog-top-hours-pseudo-before");
});
burger.classList.add("burger-test");
//====================================================>

const elementsReAdd = {
  mainInfoTablePseudo: (elem) => {
    elem.classList.remove(
      `${mainTablePseudo[0]}`,
      `${mainTablePseudo[1] + themesNames[1]}`,
      `${mainTablePseudo[1] + themesNames[2]}`,
      `${mainTablePseudo[1] + themesNames[3]}`,
      `${mainTablePseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${mainTablePseudo[1] + themesNames[0]}`);
  },
  resetMainInfoTablePseudo: (elem) => {
    elem.classList.remove(
      `${mainTablePseudo[1] + themesNames[1]}`,
      `${mainTablePseudo[1] + themesNames[2]}`,
      `${mainTablePseudo[1] + themesNames[3]}`,
      `${mainTablePseudo[1] + themesNames[4]}`,
      `${mainTablePseudo[1] + themesNames[0]}`
    );
    elem.classList.add(`${mainTablePseudo[0]}`);
  },
  arrowEducation: (elem) => {
    elem.classList.remove(
      `${arrowEdu[0] + themesNames[1]}`,
      `${arrowEdu[0] + themesNames[2]}`,
      `${arrowEdu[0] + themesNames[3]}`,
      `${arrowEdu[0] + themesNames[4]}`
    );
    elem.classList.add(`${arrowEdu[0] + themesNames[0]}`);
  },
  resetArrowEducation: (elem) => {
    elem.classList.remove(
      `${arrowEdu[0] + themesNames[1]}`,
      `${arrowEdu[0] + themesNames[2]}`,
      `${arrowEdu[0] + themesNames[3]}`,
      `${arrowEdu[0] + themesNames[4]}`,
      `${arrowEdu[0] + themesNames[0]}`
    );
  },

  quarterSelect: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
  },
  resetQuarterSelect: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[1] + themesNames[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[0]}`);
  },

  orgItemsReAdd: (elem) => {
    elem.style.backgroundColor = localStorage.getItem("1");
    elem.style.border = `1px solid ${localStorage.getItem("2")}`;
  },
  resetOrgItemsReAdd: (elem) => {
    elem.style.backgroundColor = "#DDF0F2";
    elem.style.border = `0px solid #ffffff`;
  },

  outputJinReAdd: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
  },
  resetOutputJinReAdd: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[1] + themesNames[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[0]}`);
  },

  outputSinReAdd: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[1] + themesNames[0]}`);
  },
  resetOutputSinReAdd: (elem) => {
    elem.classList.remove(
      `${quarterPseudo[1] + themesNames[0]}`,
      `${quarterPseudo[1] + themesNames[1]}`,
      `${quarterPseudo[1] + themesNames[2]}`,
      `${quarterPseudo[1] + themesNames[3]}`,
      `${quarterPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${quarterPseudo[0]}`);
  },

  organizationSvgReAdd: (elem) => {
    elem.classList.remove(
      `${organizationSvg[1] + themesNames[1]}`,
      `${organizationSvg[1] + themesNames[2]}`,
      `${organizationSvg[1] + themesNames[3]}`,
      `${organizationSvg[1] + themesNames[4]}`
    );
    elem.classList.add(`${organizationSvg[1] + themesNames[0]}`);
  },
  resetOrganizationSvgReAdd: (elem) => {
    elem.classList.remove(
      `${organizationSvg[1] + themesNames[1]}`,
      `${organizationSvg[1] + themesNames[2]}`,
      `${organizationSvg[1] + themesNames[3]}`,
      `${organizationSvg[1] + themesNames[4]}`,
      `${organizationSvg[1] + themesNames[0]}`
    );
  },

  organizationSvgColorReAdd: (elem) => {
    elem.classList.remove(
      `${organizationSvg[1] + themesNames[1]}`,
      `${organizationSvg[1] + themesNames[2]}`,
      `${organizationSvg[1] + themesNames[3]}`,
      `${organizationSvg[1] + themesNames[4]}`
    );
    elem.classList.add(`${organizationSvg[1] + themesNames[0]}`);
  },
  resetOrganizationSvgColorReAdd: (elem) => {
    elem.classList.remove(
      `${organizationSvg[1] + themesNames[1]}`,
      `${organizationSvg[1] + themesNames[2]}`,
      `${organizationSvg[1] + themesNames[3]}`,
      `${organizationSvg[1] + themesNames[4]}`,
      `${organizationSvg[1] + themesNames[0]}`
    );
  },

  progTopHoursReAdd: (elem) => {
    elem.classList.remove(
      `${progTopHoursPseudo[0]}`,
      `${progTopHoursPseudo[1] + themesNames[1]}`,
      `${progTopHoursPseudo[1] + themesNames[2]}`,
      `${progTopHoursPseudo[1] + themesNames[3]}`,
      `${progTopHoursPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${progTopHoursPseudo[1] + themesNames[0]}`);
  },
  resetProgTopHoursReAdd: (elem) => {
    elem.classList.remove(
      `${progTopHoursPseudo[1] + themesNames[0]}`,
      `${progTopHoursPseudo[1] + themesNames[1]}`,
      `${progTopHoursPseudo[1] + themesNames[2]}`,
      `${progTopHoursPseudo[1] + themesNames[3]}`,
      `${progTopHoursPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${progTopHoursPseudo[0]}`);
  },

  progBoxTitleReAdd: (elem) => {
    elem.classList.remove(
      `${progProfilePseudo[0]}`,
      `${progProfilePseudo[1] + themesNames[1]}`,
      `${progProfilePseudo[1] + themesNames[2]}`,
      `${progProfilePseudo[1] + themesNames[3]}`,
      `${progProfilePseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${progProfilePseudo[1] + themesNames[0]}`);
  },
  resetProgBoxTitleReAdd: (elem) => {
    elem.classList.remove(
      `${progProfilePseudo[1] + themesNames[0]}`,
      `${progProfilePseudo[1] + themesNames[1]}`,
      `${progProfilePseudo[1] + themesNames[2]}`,
      `${progProfilePseudo[1] + themesNames[3]}`,
      `${progProfilePseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${progProfilePseudo[0]}`);
  },

  mtoCountReAdd: (elem) => {
    elem.classList.remove(
      `${mtoCountPseudo[0]}`,
      `${mtoCountPseudo[1] + themesNames[1]}`,
      `${mtoCountPseudo[1] + themesNames[2]}`,
      `${mtoCountPseudo[1] + themesNames[3]}`,
      `${mtoCountPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${mtoCountPseudo[1] + themesNames[0]}`);
  },
  resetMtoCountReAdd: (elem) => {
    elem.classList.remove(
      `${mtoCountPseudo[1] + themesNames[0]}`,
      `${mtoCountPseudo[1] + themesNames[1]}`,
      `${mtoCountPseudo[1] + themesNames[2]}`,
      `${mtoCountPseudo[1] + themesNames[3]}`,
      `${mtoCountPseudo[1] + themesNames[4]}`
    );
    elem.classList.add(`${mtoCountPseudo[0]}`);
  },

  logoColorReAdd: () => {
    logo.classList.remove(
      `${logoArr[0] + themesNames[1]}`,
      `${logoArr[0] + themesNames[2]}`,
      `${logoArr[0] + themesNames[3]}`,
      `${logoArr[0] + themesNames[4]}`
    );
    logo.classList.add(`${logoArr[0] + themesNames[0]}`);
  },
  resetLogoColorReAdd: () => {
    logo.classList.remove(
      `${logoArr[0] + themesNames[1]}`,
      `${logoArr[0] + themesNames[2]}`,
      `${logoArr[0] + themesNames[3]}`,
      `${logoArr[0] + themesNames[4]}`,
      `${logoArr[0] + themesNames[0]}`
    );
  },

  docSvgReAdd: (elem) => {
    elem.classList.remove(
      `${docColor[0] + themesNames[1]}`,
      `${docColor[0] + themesNames[2]}`,
      `${docColor[0] + themesNames[3]}`,
      `${docColor[0] + themesNames[4]}`
    );
    elem.classList.add(`${docColor[0] + themesNames[0]}`);
  },
  resetDocSvgReAdd: (elem) => {
    elem.classList.remove(
      `${docColor[0] + themesNames[1]}`,
      `${docColor[0] + themesNames[2]}`,
      `${docColor[0] + themesNames[3]}`,
      `${docColor[0] + themesNames[4]}`,
      `${docColor[0] + themesNames[0]}`
    );
  },
  pageColorReAdd: (elem) => {
    elem.classList.remove(
      `${pageColor[0] + themesNames[1]}`,
      `${pageColor[0] + themesNames[2]}`,
      `${pageColor[0] + themesNames[3]}`,
      `${pageColor[0] + themesNames[4]}`
    );
    elem.classList.add(`${pageColor[0] + themesNames[0]}`);
  },

  resetPageColorReAdd: (elem) => {
    elem.classList.remove(
      `${pageColor[0] + themesNames[1]}`,
      `${pageColor[0] + themesNames[2]}`,
      `${pageColor[0] + themesNames[3]}`,
      `${pageColor[0] + themesNames[4]}`,
      `${pageColor[0] + themesNames[0]}`
    );
  },

  docSvgEduReAdd: (elem) => {
    elem.classList.remove(
      `${docColor[0] + themesNames[1]}`,
      `${docColor[0] + themesNames[2]}`,
      `${docColor[0] + themesNames[3]}`,
      `${docColor[0] + themesNames[4]}`
    );
    elem.classList.add(`${docColor[0] + themesNames[0]}`);
  },

  resetDocSvgEduReAdd: (elem) => {
    elem.classList.remove(
      `${docColor[0] + themesNames[1]}`,
      `${docColor[0] + themesNames[2]}`,
      `${docColor[0] + themesNames[3]}`,
      `${docColor[0] + themesNames[4]}`,
      `${docColor[0] + themesNames[0]}`
    );
  },

  menuLinkReAdd: (elem) => {
    elem.classList.remove(
      `${hoverAdd[0]}`,
      `${hoverAdd[1] + themesNames[1]}`,
      `${hoverAdd[1] + themesNames[2]}`,
      `${hoverAdd[1] + themesNames[3]}`,
      `${hoverAdd[1] + themesNames[4]}`
    );
    elem.classList.add(`${hoverAdd[1] + themesNames[0]}`);
  },
  resetMenuLinkReAdd: (elem) => {
    elem.classList.remove(
      `${hoverAdd[1] + themesNames[1]}`,
      `${hoverAdd[1] + themesNames[2]}`,
      `${hoverAdd[1] + themesNames[3]}`,
      `${hoverAdd[1] + themesNames[4]}`,
      `${hoverAdd[1] + themesNames[0]}`
    );
    elem.classList.add(`${hoverAdd[0]}`);
  },
  burger: () => {
    burger.classList.remove(
      `${burgerColor[0] + themesNames[1]}`,
      `${burgerColor[0] + themesNames[2]}`,
      `${burgerColor[0] + themesNames[3]}`,
      `${burgerColor[0] + themesNames[4]}`
    );
    burger.classList.add(`${burgerColor[0] + themesNames[0]}`);
    burgerLine.style.backgroundColor = localStorage.getItem("2");
  },
  resetBurger: () => {
    burger.classList.remove(
      `${burgerColor[0] + themesNames[1]}`,
      `${burgerColor[0] + themesNames[2]}`,
      `${burgerColor[0] + themesNames[3]}`,
      `${burgerColor[0] + themesNames[4]}`,
      `${burgerColor[0] + themesNames[0]}`
    );
    burgerLine.style.backgroundColor = "#ffffff";
  },

  menuItemReAdd: (elem) => {
    elem.style.color = localStorage.getItem("2");
  },
  resetMenuItemReAdd: (elem) => {
    elem.style.color = `${normalColors.white}`;
  },
};
const normalColors = {
  white: "#ffffff",
  color: "#25282B",
  bg: "#F5F6F9",
  tif: "#00b2b5",
  descTif: "#C9ECED",
  borderTif: "#6CD3D3",
};
//====================================================>
const elementsStyle = {
  color: (elem) => {
    elem.style.color = localStorage.getItem("2");
  },
  resetColor: (elem) => {
    elem.style.color = `${normalColors.color}`;
  },

  border: (elem) => {
    elem.style.border = `1px solid ${localStorage.getItem("2")}`;
  },
  resetBorder: (elem) => {
    elem.style.border = `${normalColors.borderTif}`;
  },

  borderTop: (elem) => {
    elem.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
  },
  resetBorderTop: (elem) => {
    elem.style.borderTop = `1px solid ${normalColors.borderTif}`;
  },

  borderRight: (elem) => {
    elem.style.borderRight = `1px solid ${localStorage.getItem("2")}`;
  },
  resetBorderRight: (elem) => {
    elem.style.borderRight = `1px solid ${normalColors.borderTif}`;
  },

  borderBottom: (elem) => {
    elem.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
  },
  resetBorderBottom: (elem) => {
    elem.style.borderBottom = `1px solid ${normalColors.borderTif}`;
  },

  borderLeft: (elem) => {
    elem.style.borderLeft = `1px solid ${localStorage.getItem("2")}`;
  },
  resetBorderLeft: (elem) => {
    elem.style.borderLeft = `1px solid ${normalColors.borderTif}`;
  },

  background: (elem) => {
    elem.style.backgroundColor = localStorage.getItem("1");
  },
  resetBackground: (elem) => {
    elem.style.backgroundColor = `${normalColors.bg}`;
  },
};

//====================================================>

const elementBody = {
  body: () => {
    body.style.backgroundColor = localStorage.getItem("1");
    body.style.color = localStorage.getItem("2");
  },
  resetBody: () => {
    body.style.backgroundColor = normalColors.bg;
    body.style.color = normalColors.color;
  },

  header: () => {
    changeHeader.style.backgroundColor = localStorage.getItem("1");
    changeHeader.style.color = localStorage.getItem("2");
    changeHeader.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
    changeHeader.style.borderBottom = `1px solid ${localStorage.getItem("1")}`;
  },
  resetHeader: () => {
    changeHeader.style.backgroundColor = normalColors.tif;
    changeHeader.style.color = normalColors.color;
    changeHeader.style.borderTop = `0px solid #ffffff`;
    changeHeader.style.borderBottom = `0px solid #ffffff`;
  },

  crumbs: () => {
    crumbs.style.backgroundColor = localStorage.getItem("1");
    crumbs.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
    crumbs.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
  },
  resetCrumbs: () => {
    crumbs.style.backgroundColor = normalColors.white;
    crumbs.style.color = "#A4A4AF";
    crumbs.style.borderTop = `0px solid #ffffff`;
    crumbs.style.borderBottom = `0px solid #ffffff`;
  },

  footer: () => {
    footer.style.backgroundColor = localStorage.getItem("1");
    footer.style.color = localStorage.getItem("2");
    footer.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
  },
  resetFooter: () => {
    footer.style.backgroundColor = "#25282B";
    footer.style.color = "#ffffff";
    footer.style.borderTop = `0px solid #ffffff`;
  },
};

//====================================================>

const bodySections = {
  hunter: () => {
    hunterSection.style.backgroundColor = localStorage.getItem("1");
    hunterSection.style.border = `1px solid ${localStorage.getItem("2")}`;
    hunterSectionLink.style.backgroundColor = localStorage.getItem("1");
    hunterSectionLink.style.border = `1px solid ${localStorage.getItem("2")}`;
    hunterSectionLink.style.color = localStorage.getItem("2");
  },
  resetHunter: () => {
    hunterSection.style.backgroundColor = "#DDF0F2";
    hunterSection.style.border = `0px solid #ffffff`;
    hunterSectionLink.style.backgroundColor = normalColors.tif;
    hunterSectionLink.style.border = `0px solid #ffffff`;
    hunterSectionLink.style.color = `${normalColors.white}`;
  },

  mainDesc: () => {
    mainDescription.style.backgroundColor = localStorage.getItem("1");
    mainDescription.style.border = `1px solid ${localStorage.getItem("2")}`;
  },
  resetMainDesc: () => {
    mainDescription.style.backgroundColor = normalColors.descTif;
    mainDescription.style.border = `0px solid #ffffff`;
  },

  mainTableBox: () => {
    mainTableBox.style.backgroundColor = localStorage.getItem("1");
    mainTableBox.style.color = localStorage.getItem("2");
  },
  resetMainTableBox: () => {
    mainTableBox.style.backgroundColor = normalColors.white;
    mainTableBox.style.color = normalColors.color;
  },

  progEdu: () => {
    progTable.style.backgroundColor = localStorage.getItem("1");
    progTable.style.color = localStorage.getItem("2");
    progTable.style.border = `1px solid ${localStorage.getItem("2")}`;
    progMiddleEducation.style.borderTop = `1px solid ${localStorage.getItem(
      "2"
    )}`;
    progTopList.style.borderLeft = `1px solid ${localStorage.getItem("2")}`;
  },
  resetProgEdu: () => {
    progTable.style.backgroundColor = normalColors.white;
    progTable.style.color = normalColors.color;
    progTable.style.border = `1px solid ${normalColors.borderTif}`;
    progMiddleEducation.style.borderTop = `1px solid ${normalColors.borderTif}`;
    progTopList.style.borderLeft = `1px solid ${normalColors.borderTif}`;
  },
};

//====================================================>
//====================================================>
//====================================================>
const tgOkVk = document.querySelectorAll(".tgOkVk");
const pageColorChange = document.querySelectorAll(".page-color-change");
const pageSocial = document.querySelectorAll(".page-social");
pageSocial.forEach((elem) => {
  elem.classList.add("page-social-normal");
});
function themeToggle() {
  elementBody.body();
  elementBody.header();
  elementBody.footer();
  elementBody.crumbs();
  crumbsTitle.forEach((elem) => {
    elementsStyle.color(elem);
  });
  if (hunterSection !== null && hunterSectionLink !== null) {
    bodySections.hunter();
  }
  if (mainDescription !== null) {
    bodySections.mainDesc();
  }

  if (mainTableBox !== null) {
    bodySections.mainTableBox();
  }
  teachersMainPhrase.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.border(elem);
  });

  teachersPoint.forEach((elem) => {
    elementsStyle.color(elem);
  });
  teachersPosition.forEach((elem) => {
    elementsStyle.color(elem);
  });
  teachersRaising.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });

  footerButtons.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.border(elem);
  });
  mtoTable.forEach((elem) => {
    elementsStyle.border(elem);
  });
  pageColorChange.forEach((elem) => {
    elementsStyle.color(elem);
  });
  // mobilePageMenu.style.backgroundColor = "red";
  mobilePageMenu.forEach((elem) => elementsStyle.background(elem));
  mtoTableItem.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  mtoCountBorder.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  elementsReAdd.burger();
  orgSubsBorderLeft.forEach((elem) => elementsStyle.borderLeft(elem));
  orgSubsBorderTop.forEach((elem) => elementsStyle.borderTop(elem));
  linksMiddleScreenAdded.forEach((elem) => elementsStyle.borderTop(elem));
  if (mainInfoTable !== null) {
    mainInfoLinks.forEach((elem) => elementsStyle.borderBottom(elem));
    mainInfoTable.forEach((elem) => {
      elementsStyle.border(elem);
    });
    mainInfoTableBorder.forEach((elem) => {
      elementsStyle.borderBottom(elem);
    });

    links.forEach((elem) => {
      elementsStyle.color(elem);
    });
  }

  if (progTable !== null) {
    bodySections.progEdu();
    document
      .querySelector(".prog-profile")
      .classList.remove("pog-profile-pseudo-before");
    educationTable.forEach((elem) => {
      elementsStyle.background(elem);
      elementsStyle.color(elem);
      elementsStyle.border(elem);
    });
  }
  arrowEducation.forEach((elem) => elementsReAdd.arrowEducation(elem));
  progBottomList.forEach((elem) => {
    elementsStyle.borderLeft(elem);
    elementsStyle.borderTop(elem);
  });
  if (progBottomHours !== null) {
    progBottomHours.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
    quarterMobile.forEach((elem) => {
      elementsStyle.border(elem);
    });
  }
  accorTitle.forEach((elem) => elementsStyle.color(elem));
  quarterMobileTitleClasses.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  quarterMobileJun.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });

  quarterMobileOutputJun.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  quarterMobileSelect.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });

  progTopListBorderBottom.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  cardTeamPosition.forEach((elem) => {
    elementsStyle.color(elem);
  });

  educationTablesBorderLeft.forEach((elem) => {
    elementsStyle.borderLeft(elem);
  });

  educationTablesRow1.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  educationTitles.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  structureBorderRight.forEach((elem) => elementsStyle.borderRight(elem));
  progBoxTitle.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  boxEducationContent.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.border(elem);
  });
  quarterMobileContainer.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.borderBottom(elem);
    elementsStyle.borderLeft(elem);
    elementsStyle.borderRight(elem);
  });
  cardTeam.forEach((elem) => {
    elem.style.padding = "8px";
    elementsStyle.background(elem);
    elementsStyle.borderLeft(elem);
    elementsStyle.borderRight(elem);
  });
  quarterMobileContentLi.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.borderBottom(elem);
  });
  buttonSelect.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.border(elem);
  });
  quarterMobile.forEach((elem) => {
    elementsStyle.background(elem);
  });
  btnEducationAccor.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.border(elem);
  });

  menuHidden.forEach((elem) => {
    elementsStyle.background(elem);
    elementsStyle.color(elem);
    elementsStyle.border(elem);
  });

  menuLinkA.forEach((elem) => {
    elementsStyle.color(elem);
  });
  organizationSubs.forEach((elem) => {
    elementsStyle.color(elem);
  });
  footerLinkChange.forEach((elem) => {
    elementsStyle.color(elem);
  });
  //===================================================================>
  //==========================================================================>
  //================================================================================>

  elementsReAdd.logoColorReAdd();

  orgItems.forEach((elem) => elementsReAdd.orgItemsReAdd(elem), false);
  menuItem.forEach((elem) => elementsReAdd.menuItemReAdd(elem), false);
  menuLink.forEach((elem) => elementsReAdd.menuLinkReAdd(elem), false);
  docSvgEdu.forEach((elem) => elementsReAdd.docSvgEduReAdd(elem), false);
  docSvg.forEach((elem) => elementsReAdd.docSvgReAdd(elem), false);
  tgOkVk.forEach((elem) => elementsReAdd.pageColorReAdd(elem), false);
  pageSocial.forEach((elem) => elementsReAdd.docSvgReAdd(elem), false);

  mtoCount.forEach((elem) => elementsReAdd.mtoCountReAdd(elem), false);
  mainInfoPseudoLeft.forEach(
    (elem) => elementsReAdd.mainInfoTablePseudo(elem),
    false
  );
  quarterMobileSelect.forEach(
    (elem) => elementsReAdd.quarterSelect(elem),
    false
  );
  outputJun.forEach((elem) => elementsReAdd.outputJinReAdd(elem), false);
  outputSin.forEach((elem) => elementsReAdd.outputSinReAdd(elem), false);
  organizationSvgs.forEach((elem) => elementsReAdd.organizationSvgReAdd(elem));
  organizationSvgsColor.forEach((elem) => elementsReAdd.docSvgReAdd(elem));
  progTopHours.forEach((elem) => elementsReAdd.progTopHoursReAdd(elem), false);
  progBoxTitle.forEach((elem) => elementsReAdd.progBoxTitleReAdd(elem), false);
}
//==============================/==================================/================================/===================================/===================================/
const btnEduc = document.querySelectorAll(".btn-education-accor");
function normalToggle() {
  //=========================
  elementBody.resetBody();
  //=========================
  elementBody.resetHeader();
  //=========================
  elementBody.resetFooter();
  //=========================
  elementBody.resetCrumbs();
  //=========================
  crumbsTitle.forEach((elem) => {
    elementsStyle.resetColor(elem);
  });
  //=========================//=========================
  if (hunterSection !== null && hunterSectionLink !== null) {
    bodySections.resetHunter();
  }
  //=========================//=========================
  if (mainDescription !== null) {
    bodySections.resetMainDesc();
  }
  //=========================//=========================
  if (mainTableBox !== null) {
    bodySections.resetMainTableBox();
  }
  //=========================
  teachersMainPhrase.forEach((elem) => {
    elem.style.backgroundColor = `${normalColors.descTif}`;
    elementsStyle.resetBorder(elem);
  });
  //=========================
  teachersPoint.forEach((elem) => {
    elem.style.color = `#9696A0`;
  });
  //=========================
  teachersPosition.forEach((elem) => {
    elem.style.color = `${normalColors.tif}`;
  });
  //=========================
  teachersRaising.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  footerButtons.forEach((elem) => {
    elementsStyle.resetBackground(elem);
    elementsStyle.resetBorder(elem);
  });
  //=========================
  mtoTable.forEach((elem) => {
    elem.style.border = ``;
  });
  //=========================
  pageColorChange.forEach((elem) => {
    elem.style.color = `#ffffff`;
  });
  //=========================
  // mobilePageMenu.style.backgroundColor = "red";
  mobilePageMenu.forEach((elem) => {
    elem.style.backgroundColor = `${normalColors.tif}`;
  });
  //=========================
  mtoTableItem.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  mtoCountBorder.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  elementsReAdd.resetBurger();
  //=========================
  orgSubsBorderLeft.forEach((elem) => elementsStyle.resetBorderLeft(elem));
  //=========================
  orgSubsBorderTop.forEach((elem) => elementsStyle.resetBorderTop(elem));
  //=========================
  linksMiddleScreenAdded.forEach((elem) => elementsStyle.resetBorderTop(elem));
  //=========================//=========================
  if (mainInfoTable !== null) {
    mainInfoLinks.forEach((elem) => {
      elem.style.borderBottom = ``;
    });
    mainInfoTable.forEach((elem) => {
      elem.style.border = ``;
    });
    //=========================
    mainInfoTableBorder.forEach((elem) => {
      elem.style.borderBottom = ``;
    });
    //=========================
    links.forEach((elem) => {
      elem.style.color = ``;
    });
  }
  //=========================//=========================
  if (progTable !== null) {
    bodySections.resetProgEdu();
    document
      .querySelector(".prog-profile")
      .classList.remove("pog-profile-pseudo-before");
    educationTable.forEach((elem) => {
      elementsStyle.resetBackground(elem);
      elementsStyle.resetColor(elem);
      elementsStyle.resetBorder(elem);
    });
  }
  //=========================
  arrowEducation.forEach((elem) => elementsReAdd.resetArrowEducation(elem));
  //=========================
  progBottomList.forEach((elem) => {
    elementsStyle.resetBorderLeft(elem);
    elementsStyle.resetBorderTop(elem);
  });
  //=========================//=========================
  if (progBottomHours !== null) {
    progBottomHours.style.borderTop = `1px solid ${normalColors.borderTif}`;
    quarterMobile.forEach((elem) => {
      elementsStyle.resetBorder(elem);
    });
  }
  //=========================
  accorTitle.forEach((elem) => {
    elem.style.color = ``;
  });
  quarterMobile.forEach((elem) => {
    elem.style.border = "";
    elem.style.backgroundColor = "#ffffff";
  });
  quarterMobileTitleClasses.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  // //=========================
  quarterMobileJun.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  // //=========================
  quarterMobileOutputJun.forEach((elem) => {
    elem.style.borderBottom = `1px solid ${normalColors.borderTif}`;
  });
  // //=========================
  quarterMobileSelect.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  progTopListBorderBottom.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  cardTeamPosition.forEach((elem) => {
    elementsStyle.resetColor(elem);
  });
  //=========================
  educationTablesBorderLeft.forEach((elem) => {
    elem.style.borderLeft = `1px solid ${normalColors.borderTif}`;
  });
  tableIf.forEach((elem) => {
    elem.style.border = ``;
    elem.style.backgroundColor = ``;
  });
  btnEduc.forEach((elem) => {
    elem.backgroundColor = "white";
  });

  //=========================
  educationTablesRow1.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  educationTitles.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  structureBorderRight.forEach((elem) => elementsStyle.resetBorderRight(elem));
  progBoxTitle.forEach((elem) => {
    elementsStyle.resetBorderBottom(elem);
  });
  //=========================
  boxEducationContent.forEach((elem) => {
    elem.style.backgroundColor = "";
    elementsStyle.resetBorder(elem);
  });
  //=========================
  quarterMobileContainer.forEach((elem) => {
    elem.style.backgroundColor = ``;
    elem.style.borderBottom = ``;
    elem.style.borderLeft = ``;
    elem.style.borderRight = ``;
  });
  //=========================
  cardTeam.forEach((elem) => {
    elem.style.padding = "0px";
    elem.style.backgroundColor = normalColors.bg;
    elem.style.borderLeft = `0px solid ${normalColors.borderTif}`;
    elem.style.borderRight = `0px solid ${normalColors.borderTif}`;
  });
  //=========================
  quarterMobileContentLi.forEach((elem) => {
    elem.style.backgroundColor = ``;
    elem.style.borderBottom = ``;
  });
  buttonSelect.forEach((elem) => {
    elem.style.backgroundColor = ``;
    elem.style.border = ``;
  });
  //=========================
  quarterMobile.forEach((elem) => {
    elem.style.backgroundColor = ``;
  });
  //=========================
  btnEducationAccor.forEach((elem) => {
    elem.style.backgroundColor = ``;
    elem.style.border = ``;
  });
  //=========================
  menuHidden.forEach((elem) => {
    elementsStyle.resetBackground(elem);
    elementsStyle.resetColor(elem);
    elementsStyle.resetBorder(elem);
  });
  //=========================
  menuLinkA.forEach((elem) => {
    elementsStyle.resetColor(elem);
  });
  //=========================
  organizationSubs.forEach((elem) => {
    elem.style.color = "";
  });
  //=========================
  footerLinkChange.forEach((elem) => {
    elem.style.color = normalColors.tif;
  });
  //===================================================================>
  //==========================================================================>
  //================================================================================>

  elementsReAdd.resetLogoColorReAdd();
  //=========================
  orgItems.forEach((elem) => elementsReAdd.resetOrgItemsReAdd(elem), false);
  //=========================
  menuItem.forEach((elem) => elementsReAdd.resetMenuItemReAdd(elem), false);
  //=========================
  menuLink.forEach((elem) => elementsReAdd.resetMenuLinkReAdd(elem), false);
  //=========================
  docSvgEdu.forEach((elem) => elementsReAdd.resetDocSvgEduReAdd(elem), false);
  //=========================
  docSvg.forEach((elem) => elementsReAdd.resetDocSvgReAdd(elem), false);
  //=========================
  tgOkVk.forEach((elem) => elementsReAdd.resetPageColorReAdd(elem), false);
  //=========================
  pageSocial.forEach((elem) => elementsReAdd.resetDocSvgReAdd(elem), false);
  //=========================
  mtoCount.forEach((elem) => elementsReAdd.resetMtoCountReAdd(elem), false);
  //=========================
  mainInfoPseudoLeft.forEach(
    (elem) => elementsReAdd.resetMainInfoTablePseudo(elem),
    false
  );
  //=========================
  quarterMobileSelect.forEach(
    (elem) => elementsReAdd.resetQuarterSelect(elem),
    false
  );
  //=========================
  outputJun.forEach((elem) => elementsReAdd.resetOutputJinReAdd(elem), false);
  //=========================
  outputSin.forEach((elem) => elementsReAdd.resetOutputSinReAdd(elem), false);
  organizationSvgs.forEach((elem) =>
    elementsReAdd.resetOrganizationSvgReAdd(elem)
  );
  //=========================
  organizationSvgsColor.forEach((elem) => elementsReAdd.resetDocSvgReAdd(elem));
  //=========================
  progTopHours.forEach(
    (elem) => elementsReAdd.resetProgTopHoursReAdd(elem),
    false
  );
  //=========================
  progBoxTitle.forEach(
    (elem) => elementsReAdd.resetProgBoxTitleReAdd(elem),
    false
  );
}

function whiteColor() {
  window.localStorage.clear();
  window.localStorage.setItem("1", "#ffffff");
  window.localStorage.setItem("2", "#000000");
  themesNames = [];
  themesNames.push("white", "black", "vanilla", "blue", "brown");
}
function blackColor() {
  window.localStorage.clear();
  window.localStorage.setItem("1", "#000000");
  window.localStorage.setItem("2", "#ffffff");
  themesNames = [];
  themesNames.push("black", "white", "vanilla", "blue", "brown");
}
function vanillaColor() {
  window.localStorage.clear();
  window.localStorage.setItem("1", "#F7F3D6");
  window.localStorage.setItem("2", "#4D4B43");
  themesNames = [];
  themesNames.push("vanilla", "black", "white", "blue", "brown");
}
function blueColor() {
  window.localStorage.clear();
  window.localStorage.setItem("1", "#9DD1FF");
  window.localStorage.setItem("2", "#25282B");
  themesNames = [];
  themesNames.push("blue", "black", "vanilla", "white", "brown");
}
function brownColor() {
  window.localStorage.clear();
  window.localStorage.setItem("1", "#3B2716");
  window.localStorage.setItem("2", "#A9E44D");
  themesNames = [];
  themesNames.push("brown", "black", "vanilla", "blue", "white");
}

document.querySelector(".web-color__brown").addEventListener("click", (e) => {
  brownColor();
  themeToggle();
});
document.querySelector(".web-color__blue").addEventListener("click", (e) => {
  blueColor();
  themeToggle();
});

document.querySelector(".web-color__vanilla").addEventListener("click", (e) => {
  vanillaColor();
  themeToggle();
});
document.querySelector(".web-color__white").addEventListener("click", (e) => {
  whiteColor();
  themeToggle();
});
document.querySelector(".web-color__black").addEventListener("click", (e) => {
  blackColor();
  themeToggle();
});

if (localStorage.getItem("1") === "#3B2716") {
  brownColor();
  themeToggle();
} else if (localStorage.getItem("1") === "#9DD1FF") {
  blueColor();
  themeToggle();
} else if (localStorage.getItem("1") === "#F7F3D6") {
  vanillaColor();
  themeToggle();
} else if (localStorage.getItem("1") === "#ffffff") {
  whiteColor();
  themeToggle();
} else if (localStorage.getItem("1") === "#000000") {
  blackColor();
  themeToggle();
} else {
  window.localStorage.clear();
}

const leadersMainDescription = document.querySelector(
  ".leaders__main-description"
);
const imparedImagesHide = document.querySelector(".impared-images__hide");
const imparedImagesGray = document.querySelector(".impared-images__gray");
const imparedImagesShow = document.querySelector(".impared-images__show");
const teachersCards = document.querySelectorAll(".teachers__card");
const imgChanger = {
  hideImgs: () => {
    body.classList.add("hide-imgs");
    cardTeam.forEach((elem) => {
      elem.style.padding = "8px";
      elem.style.borderLeft = "1px solid #25282B";
      elem.style.borderRight = "1px solid #25282B";
      sessionStorage.setItem(1, "noimg");
    });
    if (leadersMainDescription !== null) {
      leadersMainDescription.style.paddingBottom = "36px";
      leadersMainDescription.classList.remove("gray-background");
    }
  },
  grayImgs: () => {
    body.classList.add("gray-imgs");
    sessionStorage.setItem(2, "grayimg");
    if (!body.classList.contains("hide-imgs")) {
      if (leadersMainDescription) {
        leadersMainDescription.classList.add("gray-background");
      }
    }
  },
  showImg: () => {
    sessionStorage.setItem(2, " ");
    body.classList.remove("hide-imgs");
    body.classList.remove("gray-imgs");
    cardTeam.forEach((elem) => {
      elem.style.padding = "0px";
      elem.style.borderLeft = "0px solid #25282B";
      elem.style.borderRight = "0px solid #25282B";
      sessionStorage.setItem(1, " ");
    });
  },
};
// impared-images__gray

imparedImagesHide.addEventListener("click", (e) => {
  imgChanger.hideImgs();
});
imparedImagesGray.addEventListener("click", (e) => {
  imgChanger.grayImgs();
});

imparedImagesShow.addEventListener("click", (e) => {
  imgChanger.showImg();
});

// fonts - change__little;
const fontsLittle = document.querySelector(".fonts-change__little");
const fontsMiddle = document.querySelector(".fonts-change__middle");
const fontsLarge = document.querySelector(".fonts-change__large");
const letterDistancMiddle = document.querySelector(".letter-distance__middle");
const letterFistanceLarge = document.querySelector(".letter-distance__large");
const letterDistanceLittle = document.querySelector(".letter-distance__little");

const fontsCharger = {
  permLittleFonts: () => {
    sessionStorage.setItem(3, "littlefonts");
    body.classList.add("little-font");
    menuItem.forEach((e) => {
      e.classList.add("little-font");
      heightHours();
    });
  },
  permMiddleFonts: () => {
    sessionStorage.setItem(3, " ");
    body.classList.remove("little-font");
    body.classList.remove("large-font");
    heightHours();
  },
  permLargeFonts: () => {
    sessionStorage.setItem(3, "largefonts");
    body.classList.remove("little-font");
    body.classList.add("large-font");
    console.log(sessionStorage.getItem(3));
    heightHours();
  },
  normalDistance: () => {
    sessionStorage.setItem(4, "");
    body.classList.remove("big-distance");
    body.classList.remove("biggest-distance");
    heightHours();
  },
  bigDistance: () => {
    sessionStorage.setItem(4, "bigDistance");
    body.classList.add("big-distance");
    heightHours();
  },
  biggestDistance: () => {
    sessionStorage.setItem(4, "biggestDistance");
    body.classList.remove("big-distance");
    body.classList.add("biggest-distance");
    heightHours();
  },
};

fontsLittle.addEventListener("click", (e) => fontsCharger.permLittleFonts());
fontsMiddle.addEventListener("click", (e) => fontsCharger.permMiddleFonts());

fontsLarge.addEventListener("click", (e) => fontsCharger.permLargeFonts());

letterDistanceLittle.addEventListener("click", (e) =>
  fontsCharger.normalDistance()
);
letterFistanceLarge.addEventListener("click", (e) =>
  fontsCharger.biggestDistance()
);
letterDistancMiddle.addEventListener("click", (e) =>
  fontsCharger.bigDistance()
);

document
  .querySelector(".impaired-bar__ussually-mode")
  .addEventListener("click", (e) => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    normalToggle();
    fontsCharger.normalDistance();
    fontsCharger.permMiddleFonts();
    imgChanger.showImg();
  });

if (sessionStorage.getItem(1) === "noimg") {
  imgChanger.hideImgs();
} else if (sessionStorage.getItem(2) === "grayimg") {
  imgChanger.grayImgs();
}
if (sessionStorage.getItem(3) === "littlefonts") {
  fontsCharger.permLittleFonts();
} else if (sessionStorage.getItem(3) === "largefonts") {
  fontsCharger.permLargeFonts();
}
if (sessionStorage.getItem(4) === "bigDistance") {
  fontsCharger.bigDistance();
} else if (sessionStorage.getItem(4) === "biggestDistance") {
  fontsCharger.biggestDistance();
}
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
window["FLS"] = true;

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
