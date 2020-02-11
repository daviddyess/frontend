import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  getIngredient,
  getCachedIngredients,
  getIngredientsPager
} from 'selectors/ingredients';
import { actions, types } from 'reducers/ingredients';
import { actions as toastActions } from 'reducers/toast';

function* requestIngredientWorker({ ingredientId }) {
  try {
    const ingredient = yield select(getIngredient);

    if (ingredient.length === 0 || ingredient.ingredientId !== ingredientId) {
      const endpoint = {
        url: `/ingredient/${ingredientId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        // eslint-disable-next-line no-console
        console.log(data);
        yield put(actions.requestIngredientSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get ingredient!');
      }
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestIngredientsWorker({ pager }) {
  try {
    const ingredientsPager = yield select(getIngredientsPager);

    // Initial/previous values stored
    let { count, limit, page } = ingredientsPager;
    const { pages } = ingredientsPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/ingredients/count',
        method: 'GET'
      };
      const ingredientsCount = yield call(request.execute, { endpoint });

      if (ingredientsCount.success) {
        const {
          response: { data }
        } = ingredientsCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (ingredientsCount.error) {
        throw ingredientsCount.error;
      } else {
        throw new Error('Failed to count ingredients!');
      }
    } else {
      pager.count = count;
    }

    if (!pager.limit) {
      pager.limit = limit;
    }

    pager.pages =
      !pages || pages === null || pager.limit !== limit
        ? Math.ceil(pager.count / pager.limit)
        : pages;

    if (!pager.page) {
      pager.page = page;
    }
    // Refresh these values to the desired values (from pager)
    count = pager.count;
    limit = pager.limit;
    page = pager.page;

    const cached = yield select(getCachedIngredients);

    if (!cached[page] || cached[page].length !== Number(limit)) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of ingredients
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/ingredients/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update ingredients in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestIngredientsSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get ingredients!');
      }
    } else {
      yield put(actions.requestIngredientsSuccess(cached, pager));
    }
  } catch (error) {
    const { message } = error;

    yield put(actions.requestFailure(error));
    yield put(
      toastActions.popToast({
        title: 'Error',
        icon: 'times-circle',
        message
      })
    );
  }
}

function* requestIngredientWatcher() {
  yield takeLatest(types.REQUEST_INGREDIENT, requestIngredientWorker);
}

function* requestIngredientsWatcher() {
  yield takeLatest(types.REQUEST_INGREDIENTS, requestIngredientsWorker);
}

export const workers = {
  requestIngredientWorker,
  requestIngredientsWorker
};

export const watchers = {
  requestIngredientWatcher,
  requestIngredientsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
