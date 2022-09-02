import { select, classNames } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
const app = {
  initHome: function () {
    const thisApp = this;

    const homeElem = document.querySelector(select.containerOf.home);
    console.log('homeElem', homeElem);
    thisApp.home = new Home(homeElem);
  },
  initSearch: function () {
    const thisApp = this;

    const searchElem = document.querySelector(select.containerOf.search);
    console.log('searchElem', searchElem);
    thisApp.search = new Search(searchElem);
  },
  initDiscover: function () {
    const thisApp = this;

    const discoverElem = document.querySelector(select.containerOf.discover);
    console.log('discoverElem', discoverElem);
    thisApp.discover = new Discover(discoverElem);
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;

    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMachingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMachingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMachingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        /* get page id from href attribute  */
        const id = clickedElement.getAttribute('href').replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    /* add class "active" to maching pages , remove form non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    /* add class "active" to maching links , remove form non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },
  init: function () {
    const thisApp = this;

    thisApp.initPages();

    thisApp.initHome();

    thisApp.initSearch();

    thisApp.initDiscover();
  },
};

app.init();
