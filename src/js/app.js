import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

const app = {
  initData() {
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        thisApp.data = data;

        const homeElem = document.querySelector(select.containerOf.home);
        const searchElem = document.querySelector(select.containerOf.search);
        const discoverElem = document.querySelector(
          select.containerOf.discover
        );

        thisApp.discover = new Discover(thisApp.data, discoverElem);
        thisApp.home = new Home(thisApp.data, homeElem);
        thisApp.search = new Search(thisApp.data, searchElem);

        thisApp.formatElem();
        thisApp.initPages();
      });
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

  formatElem: function () {
    const elements = document.querySelectorAll(select.elements.UpperCase);

    for (let element of elements) {
      element.innerHTML = element.innerHTML.toUpperCase();
    }
  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
  },
};

app.init();
