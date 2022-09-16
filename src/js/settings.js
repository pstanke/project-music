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
    menu: '#song-list',
  },

  results: {
    songs: '.results-songs',
    box: '.results-box',
  },
  nav: {
    links: '.main-nav a',
  },
  search: {
    button: '#check',
    input: '#search',
  },
  elem: {
    elements: '.element',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
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
