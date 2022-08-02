/// <reference path="./global.d.ts" />
// @ts-check
/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */
 export function cookingStatus(remainingTime) {
    if (remainingTime === 0) {
      return 'Lasagna is done.';
    } else if (!remainingTime) {
      return 'You forgot to set the timer.';
    } else {
      return 'Not done, please wait.';
    };
  }
  const DEFAULT_PREPARATION_TIME = 2;
  export function preparationTime(layers, averagePreparationTime) {
    if (!averagePreparationTime) {
      return layers.length * DEFAULT_PREPARATION_TIME;
    } else {
      return layers.length * averagePreparationTime;
    }
  }
  const NOODLE_LAYER_QUANTITY = 50;
  const SAUCE_LAYER_QUANTITY = 0.2;
  export function quantities(layers) {
    return {
      noodles: layers.filter(e => e === 'noodles').length * NOODLE_LAYER_QUANTITY,
      sauce: layers.filter(e => e === 'sauce').length * SAUCE_LAYER_QUANTITY,
    }
  }
  export function addSecretIngredient(friendsList, myList) {
    myList.push(friendsList[friendsList.length-1]);
    return;
  }
  export function scaleRecipe(recipe, portions) {
    let recipe1 = {};
    if ((portions !== undefined)&&(portions !== null)) {
      for (let key in recipe) {
        recipe1[key] = (recipe[key] / 2) * portions;
      };
    };
    return recipe1;
  }