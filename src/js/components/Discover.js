import { templates, select } from '../settings.js';
// import utils from '../utils.js';
import Songs from './songs.js';
class Discover extends Songs {
  constructor(element) {
    super();
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

    console.log(thisDiscover.data);
    thisDiscover.item =
      thisDiscover.data[Math.floor(Math.random() * thisDiscover.data.length)];
    console.log(thisDiscover.item);
    // thisDiscover.renderSong();
  }

  // renderSong() {
  //   const thisDiscover = this;
  //   const item = thisDiscover.item;

  //   const generatedHTML = templates.menuSong({
  //     ...item,
  //     id: 'discover-' + item.data,
  //   });

  //   thisDiscover.element = utils.createDOMFromHTML(generatedHTML);

  //   thisDiscover.discoverContainer.appendChild(thisDiscover.element);

  //   // eslint-disable-next-line no-undef
  //   GreenAudioPlayer.init({
  //     selector: `#song-discover-${item.data}`,
  //     stopOthersOnPlay: true,
  //   });
  // }
}

export default Discover;
