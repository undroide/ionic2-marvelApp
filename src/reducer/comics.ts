import {
  LOAD_COMICS, LOAD_COMICS_SUCCESS, LOAD_COMICS_FAIL, LOAD_COMICS_OFFSET,
  LOAD_COMICS_OFFSET_SUCCESS, SEARCH_COMICS, SEARCH_COMICS_SUCCESS, SEARCH_COMICS_BY_YEAR,
  SEARCH_COMICS_BY_YEAR_SUCCESS, SEARCH_COMICS_CLEAR, SEARCH_COMICS_BY_YEAR_CLEAR, COMICS_NOT_FOUND, SELECTED_COMIC,
  LOAD_COMIC_CHARACTERS, LOAD_COMIC_CHARACTERS_SUCCESS, LOAD_COMIC_CHARACTERS_FAIL
} from "../actions/comics";
import {Action} from "@ngrx/store";
import {createSelector} from "reselect";
/**
 * Created by vigohe on 09-01-17.
 */

export interface State{
  entities : any [],
  loading : boolean,
  complete : boolean,
  selectedComicId: number | null,
  offset : number,
  limit : number,
  loadingOffset : boolean,
  completeOffset : boolean,
  searchTitle : string | null,
  startYear: number | null,
  notFound: boolean,
  characters : any [],
  error : boolean,
  errorCharacters: boolean
}

const initialState : State = {
  entities: [],
  loading: false,
  complete: false,
  selectedComicId: null,
  offset : 0,
  limit : 5,
  loadingOffset : false,
  completeOffset : false,
  searchTitle : null,
  startYear : null,
  notFound: false,
  characters: [],
  error : false,
  errorCharacters : false
};

export function reducer(state = initialState, action : Action) : State {

  switch (action.type){

    case LOAD_COMICS:
      return Object.assign({}, state, {
        loading: true,
        complete: false,
        notFound: false
      });

    case LOAD_COMICS_SUCCESS:
      return {
        entities : action.payload,
        loading : false,
        complete : true,
        selectedComicId : null,
        offset : 1,
        limit : state.limit,
        loadingOffset: false,
        completeOffset: false,
        searchTitle : state.searchTitle,
        startYear: state.startYear,
        notFound: false,
        characters: [],
        error : false,
        errorCharacters: false
      };

    case LOAD_COMICS_OFFSET:
      return Object.assign({}, state, {
        loadingOffset : true,
        completeOffset : false,
        error : false,
        errorCharacters: false
      });

    case LOAD_COMICS_OFFSET_SUCCESS:
      return {
        entities : state.entities.concat(action.payload.entities),
        loading : state.loading,
        complete : state.complete,
        selectedComicId : state.selectedComicId,
        offset : action.payload.offset,
        limit : state.limit,
        loadingOffset: false,
        completeOffset: true,
        searchTitle: state.searchTitle,
        startYear: state.startYear,
        notFound: false,
        characters: [],
        error : false,
        errorCharacters: false
      };

    case SEARCH_COMICS:
      return Object.assign({}, state, {
        loading : true,
        complete : false,
        searchTitle : action.payload,
        notFound: false
      });

    case SEARCH_COMICS_SUCCESS:
      return {
        entities : action.payload,
        loading : false,
        complete : true,
        selectedComicId : null,
        offset : 1,
        limit : state.limit,
        loadingOffset: false,
        completeOffset: true,
        searchTitle: state.searchTitle,
        startYear: state.startYear,
        notFound: false,
        characters: [],
        error : false,
        errorCharacters: false
      };

    case SEARCH_COMICS_BY_YEAR:
      return Object.assign({}, state, {
        loading : true,
        complete : false,
        startYear : action.payload,
        notFound: false
      });

    case SEARCH_COMICS_BY_YEAR_SUCCESS:
      return {
        entities : action.payload,
        loading : false,
        complete : true,
        selectedComicId : null,
        offset : 0,
        limit : state.limit,
        loadingOffset: false,
        completeOffset: true,
        searchTitle: state.searchTitle,
        startYear: state.startYear,
        notFound: false,
        characters : [],
        error : false,
        errorCharacters: false
      };

    case SEARCH_COMICS_CLEAR:
      return Object.assign({}, state, {
        loading: true,
        complete: false,
        searchTitle : initialState.searchTitle,
        offset : initialState.offset,
        notFound: false
      });

    case SEARCH_COMICS_BY_YEAR_CLEAR:
      return Object.assign({}, state, {
        loading: true,
        complete: false,
        startYear : initialState.startYear,
        offset : initialState.offset,
        notFound: false
      });

    case COMICS_NOT_FOUND:
      return Object.assign({}, state, {
        loading: false,
        complete: true,
        entities: initialState.entities,
        notFound: true
      });

    case SELECTED_COMIC:
      return Object.assign({}, state, {
        selectedComicId: action.payload
      });

    case LOAD_COMIC_CHARACTERS:
      return Object.assign({}, state, {
        characters : []
      });

    case LOAD_COMIC_CHARACTERS_SUCCESS:
      return Object.assign({}, state, {
        characters : action.payload,
        error : false,
        errorCharacters: false
      });

    case LOAD_COMICS_FAIL:
      return Object.assign({}, state, {
        error : true,
        loading : false,
        complete : true
      });

    case LOAD_COMIC_CHARACTERS_FAIL:
      return Object.assign({}, state, {
        errorCharacters : true
      });

    default:
      return state;
  }

}

// SELECTORS
export const getLoading = (state: State) => state.loading;
export const getComplete = (state: State) => state.complete;
export const getEntities = (state: State) => state.entities;
export const getLimit = (state: State) => state.limit;
export const getOffset = (state: State) => state.offset;
export const getLoadingOffset = (state: State) => state.loadingOffset;
export const getCompleteOffset = (state: State) => state.completeOffset;
export const getSearchTitle = (state: State) => state.searchTitle;
export const getStartYear = (state: State) => state.startYear;
export const getNotFound = (state: State) => state.notFound;
export const getCharacters = (state: State) => state.characters;
export const getSelectedId = (state: State) => state.selectedComicId;
export const getError = (state: State) => state.error;
export const getErrorCharacters = (state: State) => state.errorCharacters;

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities , selectedId) => entities.find(comic => comic.id === selectedId)
);

