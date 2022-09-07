import { select, templates } from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(id, data) {
    const thisSong = this;
    thisSong.id = id;
    thisSong.data = data;

    thisSong.renderInMenu();
    thisSong.initPlugin();
  }

  renderInMenu() {
    const thisSong = this;

    /* generate HTML based on template */
    const generatedHTML = templates.menuSong(thisSong.data);

    /* create element using utils.createElementFromHTML */
    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    /* find menu container */
    const menuContainer = document.querySelector(select.containerOf.menu);

    /* add element to menu */
    menuContainer.appendChild(thisSong.element);
  }
  initPlugin() {
    const thisSong = this;
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: `#song-${thisSong.id}`,
      stopOthersOnPlay: true,
    });
  }
}
export default Song;
