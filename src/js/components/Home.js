import { templates, select, classNames } from '../settings.js';
import utils from '../utils.js';
import AudioPlayer from './AudioPlayer.js';
class Home {
  constructor(data, element) {
    const thisHome = this;
    thisHome.songs = data;

    thisHome.selectedCategories = [];
    thisHome.filteredSongs = [];

    thisHome.render(element);
    thisHome.getElements();
    thisHome.initCategories();

    thisHome.initActions();
    thisHome.renderSongs(thisHome.songs);
  }

  render(element) {
    const thisHome = this;
    thisHome.element = element;

    thisHome.dom = {
      wrapper: thisHome.element,
    };
    /* generate HTML based on template */
    const generatedHTML = templates.home();
    /* change wrapper content to generatedHTML */
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }

  getElements() {
    const thisHome = this;
    thisHome.categoriesContainer = thisHome.dom.wrapper.querySelector(
      select.home.categories
    );
    thisHome.songList = thisHome.dom.wrapper.querySelector(select.home.list);
  }

  initCategories() {
    const thisHome = this;

    thisHome.categories = [];

    for (let song of thisHome.songs) {
      for (const category of song.categories) {
        if (!thisHome.categories.includes(category)) {
          thisHome.categories.push(category);
        }
      }
    }
    for (let category of thisHome.categories) {
      const linkHTML =
        '<a href="#category-' +
        category +
        '" class="category-selector">' +
        category +
        '</a>';

      thisHome.categoriesContainer.insertAdjacentHTML('beforeend', linkHTML);
    }
  }

  initActions() {
    const thisHome = this;
    thisHome.categoriesContainer.addEventListener('click', function (event) {
      event.preventDefault();
      thisHome.changeCategory(event);
    });
  }

  renderSongs(songs) {
    const thisHome = this;
    for (let song of songs) {
      const generatedHTML = templates.menuSong({
        ...song,
        id: `${select.song.home}-${song.id}`,
      });

      thisHome.element = utils.createDOMFromHTML(generatedHTML);

      thisHome.songList.insertAdjacentElement('beforeEnd', thisHome.element);
      new AudioPlayer(`${select.song.prefix}-${select.song.home}-${song.id}`);
    }
  }

  changeCategory(event) {
    const thisHome = this;
    let clickedElement = event.target;

    //check if clicked element is a category
    if (clickedElement.classList.contains(classNames.home.categorySelector)) {
      //check if clicked element hasn't class active
      if (!clickedElement.classList.contains(classNames.home.activeCategory)) {
        // add class active to clicked element
        clickedElement.classList.add(classNames.home.activeCategory);
        // save clicked element as selected category
        thisHome.selectedCategories.push(clickedElement.textContent);
      } else {
        // remove class active to clicked element
        clickedElement.classList.remove(classNames.home.activeCategory);
        // remove clicked element as selected category
        thisHome.selectedCategories.splice(thisHome.selectedCategory, 1);
      }
      //execute filterSongs
      thisHome.filterSongs();
    }
  }

  filterSongs() {
    const thisHome = this;
    thisHome.filteredSongs = [];
    for (let song of thisHome.songs) {
      // console.log('song', song);
      for (song.category of song.categories) {
        //check if song category is in selected categories
        if (thisHome.selectedCategories.includes(song.category)) {
          // check if song is not already in filtered songs
          if (!thisHome.filteredSongs.includes(song)) {
            // add song to filtered songs
            thisHome.filteredSongs.push(song);
          }
        }
      }
    }
    if (thisHome.filteredSongs.length > 0) {
      //clear songList
      thisHome.songList.innerHTML = '';
      //execute initFilteredSongs
      thisHome.renderSongs(thisHome.filteredSongs);
    } else {
      //clear songList
      thisHome.songList.innerHTML = '';
      //execute initAllSongs
      thisHome.renderSongs(thisHome.songs);
    }
  }
}
export default Home;
