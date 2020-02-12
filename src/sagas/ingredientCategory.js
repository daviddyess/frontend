import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { getIngredientCategory } from 'selectors/ingredientCategory';
import { actions, types } from 'reducers/ingredientCategory';
import { actions as toastActions } from 'reducers/toast';

function* requestIngredientCategoryWorker({ ingredientCategoryId }) {
  try {
    const ingredientCategory = yield select(getIngredientCategory);

    if (
      ingredientCategory.length === 0 ||
      ingredientCategory.ingredientCategoryId !== ingredientCategoryId
    ) {
      const endpoint = {
        url: `/ingredient/category/${ingredientCategoryId}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: { data }
        } = result;

        // eslint-disable-next-line no-console
        console.log(data);
        yield put(actions.requestIngredientCategorySuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to get ingredient category!');
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

function* requestIngredientCategoryWatcher() {
  yield takeLatest(
    types.REQUEST_INGREDIENT_CATEGORY,
    requestIngredientCategoryWorker
  );
}

export const workers = {
  requestIngredientCategoryWorker
};

export const watchers = {
  requestIngredientCategoryWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map(watcher => watcher()));
}
