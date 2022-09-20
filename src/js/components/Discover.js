import { templates, select, classNames } from '../settings.js';
import utils from '../utils.js';
import AudioPlayer from './AudioPlayer.js';

class Discover {
  constructor(data, element) {
    const thisDiscover = this;
    thisDiscover.songs = data;

    thisDiscover.render(element);
    thisDiscover.getElements();
    thisDiscover.initActions();
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
    thisDiscover.sectionContainer = document.querySelector(
      select.discover.section
    );
    thisDiscover.navLink = document.querySelector(select.discover.navLink);
  }

  initActions() {
    const thisDiscover = this;
    thisDiscover.navLink.addEventListener('click', function (event) {
      event.preventDefault();
      if (!event.target.classList.contains(classNames.nav.active)) {
        thisDiscover.sectionContainer.innerHTML = '';
        thisDiscover.getRandomSong();
      }
    });
  }

  getRandomSong() {
    const thisDiscover = this;

    thisDiscover.item =
      thisDiscover.songs[Math.floor(Math.random() * thisDiscover.songs.length)];
    thisDiscover.renderSong();
  }

  renderSong() {
    const thisDiscover = this;
    const item = thisDiscover.item;

    const generatedHTML = templates.menuSong({
      ...item,
      id: `${select.song.discover}-${item.id}`,
    });

    thisDiscover.element = utils.createDOMFromHTML(generatedHTML);

    thisDiscover.sectionContainer.appendChild(thisDiscover.element);

    new AudioPlayer(`${select.song.prefix}-${select.song.discover}-${item.id}`);
  }
}

export default Discover;
