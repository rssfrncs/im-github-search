import {
  delay,
  call,
  put,
  takeLatest,
  select,
  take,
  race
} from "redux-saga/effects";
import { Action } from "./actions";
import { selectSearch } from "./selectors";
import { User } from "./reducer";

export function* rootSaga() {
  yield takeLatest("search updated", getPredictionsSaga);
  yield takeLatest("active user changed", getUserSaga);
}

function* getUserSaga({ payload }: any) {
  // debounce for those trigger happy users.
  yield delay(333);
  const user = yield select(state =>
    state.users.find((user: User) => user.login === payload)
  );
  if (user) return;
  try {
    const user = yield call(async login => {
      return fetch(`https://api.github.com/users/${login}`)
        .then(throwIfNot200)
        .then(r => r.json());
    }, payload);
    yield put<Action>({
      type: "user loaded",
      payload: user
    });
  } catch (error) {
    yield put<Action>({
      type: "notification updated",
      payload: {
        message: error.message,
        type: "error"
      }
    });
    yield race([delay(3000), take("notification clicked")]);
    yield;
    yield put<Action>({
      type: "notification updated",
      payload: null
    });
  }
}

function* getPredictionsSaga() {
  try {
    yield delay(333);
    const search = yield select(selectSearch);
    const predictions = yield call(async search => {
      return fetch(`https://api.github.com/search/users?q=${search}`)
        .then(throwIfNot200)
        .then(r => r.json());
    }, search);
    yield put<Action>({
      type: "prediction loaded",
      payload: predictions.items.map(({ id, login }: any) => ({ id, login }))
    });
  } catch (error) {
    yield put<Action>({
      type: "prediction loaded",
      payload: []
    });
  }
}

const throwIfNot200 = (response: Response) => {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};
