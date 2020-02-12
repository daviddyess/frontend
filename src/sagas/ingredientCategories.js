import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  getCachedIngredientCategories,
  getIngredientCategoriesPager
} from 'selectors/ingredientCategories';
import { actions, types } from 'reducers/ingredientCategories';
import { actions as toastActions } from 'reducers/toast';

function* requestIngredientCategoriesWorker({ pager }) {
  try {
    const ingredientCategoriesPager = yield select(
      getIngredientCategoriesPager
    );

    // Initial/previous values stored
    let { count, limit, page } = ingredientCategoriesPager;
    const { pages } = ingredientCategoriesPager;

    let endpoint = {};

    if (!count) {
      endpoint = {
        url: '/ingredient/categories/count',
        method: 'GET'
      };
      const ingredientCategoriesCount = yield call(request.execute, {
        endpoint
      });

      if (ingredientCategoriesCount.success) {
        const {
          response: { data }
        } = ingredientCategoriesCount;
        // Set pager to be passed into Success, Update count

        pager.count = data;
      } else if (ingredientCategoriesCount.error) {
        throw ingredientCategoriesCount.error;
      } else {
        throw new Error('Failed to count ingredient categories!');
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

    const cached = yield select(getCachedIngredientCategories);

    if (!cached[page] || cached[page].length !== Number(limit)) {
      let offset = page * limit - limit + 1;

      if (offset > count) {
        // Prevent an offset higher than total amount of ingredient categories
        // - Consider a max limit/offset
        offset = count - limit;
      }
      endpoint = {
        url: `/ingredient/categories/?limit=${limit}&offset=${offset}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      // update ingredient categories in state or throw an error
      if (result.success) {
        const {
          response: { data }
        } = result;

        cached[page] = data;

        yield put(actions.requestIngredientCategoriesSuccess(cached, pager));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get ingredient categories!');
      }
    } else {
      yield put(actions.requestIngredientCategoriesSuccess(cached, pager));
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

function* requestIngredientCategoriesWatcher() {
  yield takeLatest(
    types.REQUEST_INGREDIENT_CATEGORIES,
    requestIngredientCategoriesWorker
  );
}

export const workers = {
  requestIngredientCategoriesWorker
};

export const watchers = {
  requestIngredientCategoriesWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
