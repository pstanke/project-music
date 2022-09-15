import { select, classNames, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Song from './components/song.js';
const app = {
  initHome: function () {
    const thisApp = this;

    const homeElem = document.querySelector(select.containerOf.home);

    thisApp.home = new Home(homeElem);
  },
  initSearch: function () {
    const thisApp = this;

    const searchElem = document.querySelector(select.containerOf.search);

    thisApp.search = new Search(searchElem);
  },
  initDiscover: function () {
    const thisApp = this;

    const discoverElem = document.querySelector(select.containerOf.discover);

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
  initMenu: function () {
    const thisApp = this;

    for (let songData in thisApp.data.songs) {
      new Song(thisApp.data.songs[songData].id, thisApp.data.songs[songData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        /* save parsedResponse as thisApp.data.songs*/
        thisApp.data.songs = parsedResponse;
        /* execute initMenu method*/
        thisApp.initMenu();
      });
  },
  formatElem: function () {
    const elements = document.querySelectorAll(select.elem.elements);

    for (let element of elements) {
      element.innerHTML = element.innerHTML.toUpperCase();
    }
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();

    thisApp.initData();

    thisApp.initHome();

    thisApp.initSearch();

    thisApp.initDiscover();

    thisApp.formatElem();
  },
};

app.init();
