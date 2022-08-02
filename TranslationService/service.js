import { AbusiveClientError, NotAvailable, Untranslatable } from './errors';
/// <reference path="./global.d.ts" />
// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.
export class TranslationService {
  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }
  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text) {
    return this.api.fetch(text)
    .then(function (value) {
      return value.translation;
    }) 
    .catch(function (error) {
      throw error;
    })
  }
  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
   batch(texts) {
    if (texts.length === 0){
       return new Promise(function (resolve, reject) {
      throw new BatchIsEmpty;
    })};
    let promises = [];
    promises = texts.map(text => this.api.fetch(text));
    return Promise.all(promises)
    .then(function (value) {
      return value.map(el => el.translation);
    })
    .catch(function (error) {
      throw error;
    })
   }
    
  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  request(text) {
    const myPromise = (text) => {
    return new Promise((resolve, reject) => {
    this.api.request(text, (err, data) => {
      if (err) return reject(err)
      resolve(data)
        })
      })
    }
    function retry(fn, retries=3, err=null) {
      if (!retries) {
        return Promise.reject(err);
      }
      return fn(text).catch(err => {
          return retry(fn, (retries - 1), err);
        });
    }
    return retry(myPromise)
  }
  /**
   * Retrieves the translation for the given text
   *
   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
  premium(text, minimumQuality) {
  let checkQuality = (quality, value) => {return new Promise((resolve, reject) => {
    if (quality >= minimumQuality) {
      resolve(value);
    } else {
      reject(new QualityThresholdNotMet())
    }
  })
  };
  return this.api.fetch(text)
  .then(
    v => {return checkQuality(v.quality, v.translation)},
    r => {return this.request(text).then(
      ok => {return this.api.fetch(text).then(v => {return checkQuality(v.quality, v.translation)})}
    )}
  )
}
}
/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
export class QualityThresholdNotMet extends Error {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(
      `The translation of ${text} does not meet the requested quality threshold.`.trim()
    );
    this.text = text;
  }
}
/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `Requested a batch translation, but there are no texts in the batch.`.trim()
    );
  }
}
