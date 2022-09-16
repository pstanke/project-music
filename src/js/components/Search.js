import { select, templates, settings } from '../settings.js';
import utils from '../utils.js';
class Search {
  constructor(element) {
    const thisSearch = this;
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
      select.search.button
    );
    thisSearch.search = thisSearch.dom.wrapper.querySelector(
      select.search.input
    );
    thisSearch.resultsSongs = thisSearch.dom.wrapper.querySelector(
      select.results.songs
    );
    thisSearch.resultsBox = thisSearch.dom.wrapper.querySelector(
      select.results.box
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
            id: 'search-' + song.id,
          });

          thisSearch.element = utils.createDOMFromHTML(generatedHTML);

          thisSearch.resultsSongs.insertAdjacentElement(
            'beforeEnd',
            thisSearch.element
          );

          // eslint-disable-next-line no-undef
          GreenAudioPlayer.init({
            selector: `#song-search-${song.id}`,
            stopOthersOnPlay: true,
          });
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
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        let value = thisSearch.search.value.toLowerCase();

        for (let song of parsedResponse) {
          if (song.title.toLowerCase().includes(value)) {
            thisSearch.matchingSongs.push(song);
          }
        }

        thisSearch.updateDom();
      });
  }
}
export default Search;
