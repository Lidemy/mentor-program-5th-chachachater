import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAddPost, fetchEditPost, fetchDeletePost } from "../../WebAPI";

const initialState = {
  data: null,
  status: "idle",
};

export const addPostAsync = createAsyncThunk(
  "post/addPost",
  async (postData) => {
    if (!postData.title || !postData.content) {
      alert("need title and content");
      return "";
    }
    const result = await fetchAddPost(postData);
    if (result.message) {
      console.log(result);
      alert("Error, please check console log");
      return "";
    }
    return result;
  }
);

export const editPostAsync = createAsyncThunk(
  "post/editPost",
  async (postData) => {
    if (!postData.title || !postData.content) {
      alert("need title and content");
      return "";
    }
    const addPostResult = await fetchEditPost(postData);
    return addPostResult;
  }
);

export const deletePostAsync = createAsyncThunk(
  "post/deletePost",
  async (id) => {
    const addPostResult = await fetchDeletePost(id);
    return addPostResult;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(editPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { logout } = userSlice.actions;

export const selectPost = (state) => state;

export default userSlice.reducer;
