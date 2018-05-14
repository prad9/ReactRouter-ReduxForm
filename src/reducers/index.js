import { combineReducers } from 'redux';
import PostReducer from "./reducer_posts";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer //Really important to have this keyword "form" correct. This is what wires up forms state
});

export default rootReducer;
