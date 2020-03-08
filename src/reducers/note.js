import { buildActions } from 'utils';

export const types = buildActions('note', [
  'REQUEST_NOTE',
  'REQUEST_NOTE_SUCCESS',
  'REQUEST_NOTE_FAILURE',
  'CREATE_NOTE',
  'CREATE_NOTE_SUCCESS',
  'CREATE_NOTE_FAILURE',
  'DELETE_NOTE',
  'DELETE_NOTE_SUCCESS',
  'DELETE_NOTE_FAILURE',
  'UPDATE_NOTE',
  'UPDATE_NOTE_SUCCESS',
  'UPDATE_NOTE_FAILURE'
]);

const requestNote = note => ({
  type: types.REQUEST_NOTE,
  note
});

const requestNoteSuccess = note => ({
  type: types.REQUEST_NOTE_SUCCESS,
  note
});

const requestNoteFailure = error => ({
  type: types.REQUEST_NOTE_FAILURE,
  error
});

const createNote = flavorNote => ({
  type: types.CREATE_NOTE,
  flavorNote
});

const createNoteSuccess = () => ({
  type: types.CREATE_NOTE_SUCCESS
});

const createNoteFailure = error => ({
  type: types.CREATE_NOTE_FAILURE,
  error
});

const deleteNote = flavorNote => ({
  type: types.DELETE_NOTE,
  flavorNote
});

const deleteNoteSuccess = () => ({
  type: types.DELETE_NOTE_SUCCESS
});

const deleteNoteFailure = error => ({
  type: types.DELETE_NOTE_FAILURE,
  error
});

const updateNote = flavorNote => ({
  type: types.UPDATE_NOTE,
  flavorNote
});

const updateNoteSuccess = () => ({
  type: types.UPDATE_NOTE_SUCCESS
});

const updateNoteFailure = error => ({
  type: types.UPDATE_NOTE_FAILURE,
  error
});

export const actions = {
  requestNote,
  requestNoteSuccess,
  requestNoteFailure,
  createNote,
  createNoteSuccess,
  createNoteFailure,
  deleteNote,
  deleteNoteSuccess,
  deleteNoteFailure,
  updateNote,
  updateNoteSuccess,
  updateNoteFailure
};

export const initialState = {
  loaded: false,
  error: null,
  collection: {}
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_NOTE_SUCCESS:
      return {
        ...state,
        collection: action.note
      };
    case types.REQUEST_NOTE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.CREATE_NOTE_SUCCESS:
      return {
        ...state
      };
    case types.CREATE_NOTE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.DELETE_NOTE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case types.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loaded: false
      };
    case types.UPDATE_NOTE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
