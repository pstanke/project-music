import { templates, settings, select } from '../settings.js';
import utils from '../utils.js';
class Discover {
  constructor(element) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.getElements();
    thisDiscover.getRandomSong();
  }
  render(element) {
    const thisDiscover = this;
    thisDiscover.element = element;

    thisDiscover.dom = {
      wrapper: thisDiscover.element,
    };

    const generatedHTML = templates.discover();

    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  getElements() {
    const thisDiscover = this;
    thisDiscover.discoverContainer = document.querySelector(
      select.containerOf.discover
    );
  }
  getRandomSong() {
    const thisDiscover = this;
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisDiscover.item =
          parsedResponse[Math.floor(Math.random() * parsedResponse.length)];
        thisDiscover.renderSong();
      });
  }
  renderSong() {
    const thisDiscover = this;
    const item = thisDiscover.item;

    const generatedHTML = templates.menuSong({
      ...item,
      id: 'discover-' + item.id,
    });

    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);

    thisDiscover.discoverContainer.appendChild(thisDiscover.element);

    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: `#song-discover-${item.id}`,
      stopOthersOnPlay: true,
    });
  }
}

export default Discover;
