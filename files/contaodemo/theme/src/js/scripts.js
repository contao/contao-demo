// toggles navi sidebar
const toggleNavMain = document.querySelector('[ data-nav-toggle ]');
const navMobile = document.querySelector('.nav-main');
const header = document.getElementById('header');

const showNavMobile = 'show-nav-mobile';
const isActive = 'is-active';
const preventBodyScrolling = "prevent-scrolling";

function toggleNavigationState(open) {
    if (open) {
        document.body.classList.add(showNavMobile, preventBodyScrolling);
        navMobile.setAttribute('style', 'top:' + header.offsetHeight + 'px;');
    } else {
        document.body.classList.remove(showNavMobile, preventBodyScrolling);
    }

    toggleNavMain.classList.toggle(isActive, open);
    toggleNavMain.ariaExpanded = open ? 'true' : 'false';

    navMobile.classList.toggle(isActive, open);
}
toggleNavMain?.addEventListener('click', () => toggleNavigationState(!document.body.classList.contains(showNavMobile)));

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
