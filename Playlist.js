// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.
/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} new playlist with unique entries
 */
 export function removeDuplicates(playlist) {
    return  Array.from(new Set(playlist));
  }
  /**
   * Checks whether a playlist includes a track.
   *
   * @param {string[]} playlist
   * @param {string} track
   * @returns {boolean} whether the track is in the playlist
   */
  export function hasTrack(playlist, track) {
    return new Set(playlist).has(track);
  }
  /**
   * Adds a track to a playlist.
   *
   * @param {string[]} playlist
   * @param {string} track
   * @returns {string[]} new playlist
   */
  export function addTrack(playlist, track) {
    return Array.from(new Set(playlist).add(track));
  }
  /**
   * Deletes a track from a playlist.
   *
   * @param {string[]} playlist
   * @param {string} track
   * @returns {string[]} new playlist
   */
  export function deleteTrack(playlist, track) {
    playlist = new Set(playlist);
    playlist.delete(track);
    return Array.from(playlist);
  }
  /**
   * Lists the unique artists in a playlist.
   *
   * @param {string[]} playlist
   * @returns {string[]} list of artists
   */
  export function listArtists(playlist) {
    let artists = new Set();
    playlist.forEach((str => artists.add(str.split('-')[1].trim())));
    return Array.from(artists);
  }
  