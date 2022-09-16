import { settings } from '../settings.js';
class Songs {
  constructor() {
    const thisSong = this;
    thisSong.data = [];
    thisSong.getData();
    console.log(thisSong.data);
  }
  getData() {
    const thisSong = this;

    const url = settings.db.url + '/' + settings.db.songs;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        for (let song of parsedResponse) {
          thisSong.data.push(song);
        }
      });
  }
}
export default Songs;
