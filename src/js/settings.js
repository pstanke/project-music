export const select = {
  templateOf: {
    home: '#template-home',
    search: '#template-search',
    discover: '#template-discover',
    song: '#template-menu-song',
  },
  containerOf: {
    pages: '#pages',
    home: '.home-wrapper',
    search: '.search-wrapper',
    discover: '.discover-wrapper',
  },
  nav: {
    links: '.main-nav a',
  },
  elements: {
    UpperCase: '.element',
  },
  search: {
    results: {
      songs: '.results-songs',
      box: '.results-box',
    },
    searcher: {
      button: '#check',
      input: '#search',
    },
  },
  home: {
    categories: '.categories',
    categorySelector: '.category-selector',
    list: '.song-list',
  },
  discover: {
    navLink: '.discover',
    section: '.section-container',
  },
  song: {
    prefix: '#song',
    home: 'home',
    search: 'search',
    discover: 'discover',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
  home: {
    categorySelector: 'category-selector',
    activeCategory: 'active',
  },
};

export const templates = {
  home: Handlebars.compile(
    document.querySelector(select.templateOf.home).innerHTML
  ),
  search: Handlebars.compile(
    document.querySelector(select.templateOf.search).innerHTML
  ),
  discover: Handlebars.compile(
    document.querySelector(select.templateOf.discover).innerHTML
  ),
  menuSong: Handlebars.compile(
    document.querySelector(select.templateOf.song).innerHTML
  ),
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),

    songs: 'songs',
  },
};
