import { select, templates } from '../settings.js';
import utils from '../utils.js';
import AudioPlayer from './AudioPlayer.js';
class Search {
  constructor(data, element) {
    const thisSearch = this;
    thisSearch.songs = data;

    thisSearch.matchingSongs = [];

    thisSearch.render(element);
    thisSearch.getElements();
    thisSearch.initActions();
  }
  render(element) {
    const thisSearch = this;
    thisSearch.element = element;
    thisSearch.dom = {
      wrapper: thisSearch.element,
    };

    const generatedHTML = templates.search();

    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }
  getElements() {
    const thisSearch = this;
    thisSearch.check = thisSearch.dom.wrapper.querySelector(
      select.search.searcher.button
    );
    thisSearch.search = thisSearch.dom.wrapper.querySelector(
      select.search.searcher.input
    );
    thisSearch.resultsSongs = thisSearch.dom.wrapper.querySelector(
      select.search.results.songs
    );
    thisSearch.resultsBox = thisSearch.dom.wrapper.querySelector(
      select.search.results.box
    );
  }

  initActions() {
    const thisSearch = this;

    thisSearch.check.addEventListener('click', function (event) {
      event.preventDefault();
      thisSearch.matchingSongs = [];
      thisSearch.updateDom();
      thisSearch.searcher();
    });
  }
  updateDom() {
    const thisSearch = this;

    if (thisSearch.search.value != '') {
      if (!thisSearch.matchingSongs.length == 0) {
        thisSearch.resultsSongs.innerHTML = '';
        thisSearch.resultsBox.innerHTML = '';

        if (thisSearch.matchingSongs.length > 1) {
          thisSearch.resultsBox.insertAdjacentHTML(
            'afterbegin',
            'We have found ' +
              `${thisSearch.matchingSongs.length}` +
              ' songs...'
          );
        } else {
          thisSearch.resultsBox.insertAdjacentHTML(
            'afterbegin',
            'We have found ' + `${thisSearch.matchingSongs.length}` + ' song...'
          );
        }

        for (let song of thisSearch.matchingSongs) {
          const generatedHTML = templates.menuSong({
            ...song,
            id: `${select.song.search}-${song.id}`,
          });

          thisSearch.element = utils.createDOMFromHTML(generatedHTML);

          thisSearch.resultsSongs.insertAdjacentElement(
            'beforeEnd',
            thisSearch.element
          );
          new AudioPlayer(
            `${select.song.prefix}-${select.song.search}-${song.id}`
          );
        }
      } else {
        thisSearch.resultsSongs.innerHTML = '';
        thisSearch.resultsBox.innerHTML = '';
        thisSearch.resultsBox.insertAdjacentHTML(
          'beforeEnd',
          'No results sorry...'
        );
      }
    }
  }
  searcher() {
    const thisSearch = this;

    let value = thisSearch.search.value.toLowerCase();

    for (let song of thisSearch.songs) {
      if (song.title.toLowerCase().includes(value)) {
        thisSearch.matchingSongs.push(song);
      }
    }

    thisSearch.updateDom();
  }
}
export default Search;
