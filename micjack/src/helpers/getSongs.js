export function getSongs() {
  return fetch('https://itunes.apple.com/search?term=Michael+jackson')
    .then(response => response.json())
    .then(json => json)
    .catch(err => {
      console.log(err);
    });
}
