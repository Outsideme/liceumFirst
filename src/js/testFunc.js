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
const menuLink = document.querySelectorAll(".menu-link");

const quarterMobileContainer = document.querySelectorAll(
  ".quarter-mobile-box__container"
);
const menuHidden = document.querySelectorAll(".menu-hidden");
const menuLinkA = document.querySelectorAll(".link-a");
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
const header = document.querySelector(".header");

const linksMiddleScreenAdded = document.querySelectorAll(
  ".links-middle-screen__added"
);
const structureBorderRight = document.querySelectorAll(
  ".structure-border-right"
);
const educationTablesRow1 = document.querySelectorAll(
  ".education-tables__row-1"
);
const mainInfoPseudoLeft = document.querySelectorAll(
  ".main-table-item-pseudo-left"
);

export let themesNames = [];
const hoverAdd = ["hover-add", "hover-add-color-"];
const docColor = ["doc-color-"];
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
  arrowEducation: (elem) => {
    elem.classList.remove(
      `${arrowEdu[0] + themesNames[1]}`,
      `${arrowEdu[0] + themesNames[2]}`,
      `${arrowEdu[0] + themesNames[3]}`,
      `${arrowEdu[0] + themesNames[4]}`
    );
    elem.classList.add(`${arrowEdu[0] + themesNames[0]}`);
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

  orgItemsReAdd: (elem) => {
    elem.style.backgroundColor = localStorage.getItem("1");
    elem.style.border = `1px solid ${localStorage.getItem("2")}`;
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

  organizationSvgReAdd: (elem) => {
    elem.classList.remove(
      `${organizationSvg[1] + themesNames[1]}`,
      `${organizationSvg[1] + themesNames[2]}`,
      `${organizationSvg[1] + themesNames[3]}`,
      `${organizationSvg[1] + themesNames[4]}`
    );
    elem.classList.add(`${organizationSvg[1] + themesNames[0]}`);
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

  logoColorReAdd: () => {
    logo.classList.remove(
      `${logoArr[0] + themesNames[1]}`,
      `${logoArr[0] + themesNames[2]}`,
      `${logoArr[0] + themesNames[3]}`,
      `${logoArr[0] + themesNames[4]}`
    );
    logo.classList.add(`${logoArr[0] + themesNames[0]}`);
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

  docSvgEduReAdd: (elem) => {
    elem.classList.remove(
      `${docColor[0] + themesNames[1]}`,
      `${docColor[0] + themesNames[2]}`,
      `${docColor[0] + themesNames[3]}`,
      `${docColor[0] + themesNames[4]}`
    );
    elem.classList.add(`${docColor[0] + themesNames[0]}`);
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

  menuItemReAdd: (elem) => {
    elem.style.color = localStorage.getItem("2");
  },
};

//====================================================>
const elementsStyle = {
  color: (elem) => {
    elem.style.color = localStorage.getItem("2");
  },

  border: (elem) => {
    elem.style.border = `1px solid ${localStorage.getItem("2")}`;
  },

  borderTop: (elem) => {
    elem.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
  },

  borderRight: (elem) => {
    elem.style.borderRight = `1px solid ${localStorage.getItem("2")}`;
  },

  borderBottom: (elem) => {
    elem.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
  },

  borderLeft: (elem) => {
    elem.style.borderLeft = `1px solid ${localStorage.getItem("2")}`;
  },

  background: (elem) => {
    elem.style.backgroundColor = localStorage.getItem("1");
  },
};

//====================================================>

const elementBody = {
  body: () => {
    body.style.backgroundColor = localStorage.getItem("1");
    body.style.color = localStorage.getItem("2");
  },

  header: () => {
    changeHeader.style.backgroundColor = localStorage.getItem("1");
    changeHeader.style.color = localStorage.getItem("2");
    changeHeader.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
    changeHeader.style.borderBottom = `1px solid ${localStorage.getItem("1")}`;
  },

  crumbs: () => {
    crumbs.style.backgroundColor = localStorage.getItem("1");
    crumbs.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
    crumbs.style.borderBottom = `1px solid ${localStorage.getItem("2")}`;
  },

  footer: () => {
    footer.style.backgroundColor = localStorage.getItem("1");
    footer.style.color = localStorage.getItem("2");
    footer.style.borderTop = `1px solid ${localStorage.getItem("2")}`;
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

  mainDesc: () => {
    mainDescription.style.backgroundColor = localStorage.getItem("1");
    mainDescription.style.border = `1px solid ${localStorage.getItem("2")}`;
  },

  mainTableBox: () => {
    mainTableBox.style.backgroundColor = localStorage.getItem("1");
    mainTableBox.style.color = localStorage.getItem("2");
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
};

//====================================================>
//====================================================>
//====================================================>

export function themeToggle() {
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
  mtoTableItem.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
  mtoCountBorder.forEach((elem) => {
    elementsStyle.borderBottom(elem);
  });
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
  organizationSvgsColor.forEach((elem) =>
    elementsReAdd.organizationSvgColorReAdd(elem)
  );
  progTopHours.forEach((elem) => elementsReAdd.progTopHoursReAdd(elem), false);
  progBoxTitle.forEach((elem) => elementsReAdd.progBoxTitleReAdd(elem), false);
}
