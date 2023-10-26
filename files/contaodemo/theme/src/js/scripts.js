// toggles navi sidebar
const toggleNavMain = document.querySelector('[ data-nav-toggle ]');
const navMobile = document.querySelector('.nav-main');
const header = document.getElementById('header');

const showNavMobile = 'show-nav-mobile';
const isActive = 'is-active';
const preventBodyScrolling = "prevent-scrolling";

if (toggleNavMain) {
  toggleNavMain.addEventListener('click', navStatus);
}

function navStatus() {

  if (document.body.classList.contains(showNavMobile)) {
    navClose();
  } else {
    navOpen();
  }
}

function navClose() {
  document.body.classList.remove(showNavMobile, preventBodyScrolling);
  toggleNavMain.classList.remove(isActive);
  navMobile.classList.remove(isActive);
}

function navOpen() {
  document.body.classList.add(showNavMobile, preventBodyScrolling);
  toggleNavMain.classList.add(isActive);
  navMobile.classList.add(isActive);

  let headerHeight = header.offsetHeight;
  navMobile.setAttribute('style', 'top:' + headerHeight + 'px;');
}


// insert th text in td as data-attr
document.addEventListener('DOMContentLoaded', function () {

  // table auto data-attr setter
  const collTables = document.querySelectorAll('.ce_table table');
  let arrHeaderTexts = [];

  //iteration through tables
  collTables.forEach((table) => {

    //truncate data
    arrHeaderTexts = [];

    //iteration through table headlines
    let collTableHeads = table.querySelectorAll('th');
    collTableHeads.forEach((header) => {
      arrHeaderTexts.push(header.innerText);
    })

    //iteration through table rows
    let collTableRows = table.querySelectorAll('tbody tr');
    collTableRows.forEach((row, index) => {

      //iterate through table cells
      let collTableCell = row.querySelectorAll('td');
      collTableCell.forEach((cell, index) => {
        cell.setAttribute('data-cellHeadline', arrHeaderTexts[index]);
      })
    })

    // Refresh the CSS attr() data if it has already been rendered by the browser (see contao/contao-demo#6)
    table.style.visibility = 'hidden';
    setTimeout(() => {
      table.style.visibility = 'visible';
    })
  })

}, false);
