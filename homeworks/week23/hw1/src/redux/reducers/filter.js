import { SET_FILTER } from "../actionTypes";

const initialState = {
  filter: ["all"],
};
export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return {
        filter: [action.payload.filter],
      };
    }
    default: {
      return state;
    }
  }
}
