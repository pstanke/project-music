import { templates, settings, select } from '../settings.js';
import utils from '../utils.js';
class Discover {
  constructor(element) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.getRandomSong();
  }
  render(element) {
    const thisDiscover = this;
    thisDiscover.element = element;

    thisDiscover.dom = {
      wrapper: thisDiscover.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.discover();
    /* change wrapper content to generatedHTML */
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }
  getRandomSong() {
    const thisDiscover = this;
    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        const item =
          parsedResponse[Math.floor(Math.random() * parsedResponse.length)];
        console.log('item', item);

        /* generate HTML based on template */
        const generatedHTML = templates.menuSong(item);

        /* create element using utils.createElementFromHTML */
        thisDiscover.element = utils.createDOMFromHTML(generatedHTML);

        /* find menu container */
        const menuContainer = document.querySelector(
          select.containerOf.discover
        );

        /* add element to menu */
        menuContainer.appendChild(thisDiscover.element);

        // eslint-disable-next-line no-undef
        GreenAudioPlayer.init({
          selector: `#song-${item.id}`,
          stopOthersOnPlay: true,
        });
      });
  }
}

export default Discover;
