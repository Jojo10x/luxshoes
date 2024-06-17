import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";


interface UserDetails {
  id: number;
  name: string;
  email: string;
}
interface AuthState {
  user: UserDetails | null;
  userId: number;
  token: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
}

const initialState: AuthState = {
  user: null,
  userId: 0,
  token: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (_, thunkAPI) => {
    try {
      const response = await authService.login({
        username: "user",
        password: "password",
      });
      return response.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/user",
  async (userId: number, thunkAPI) => {
    try {
      return await authService.getUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
     authService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.token = action.payload;
          localStorage.setItem("user", JSON.stringify(2));
          state.status = "idle";
          toast.success(state.status);
        }
      )
      .addCase(login.rejected, (state: AuthState,action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = "error";
        toast.error(action.payload as string)
      })
      .addCase(getUser.pending, (state: AuthState) => {
        state.isLoading = true;
        state.status = "loading";
      })
      .addCase(
        getUser.fulfilled,
        (state: AuthState, action: PayloadAction<UserDetails>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          localStorage.setItem("userDetails", JSON.stringify(action.payload));
          state.status ="idle";
          toast.success(state.status);
        }
      )
      .addCase(getUser.rejected, (state: AuthState,action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.status = "erorr";
        toast.error(action.payload as string)
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { authReset } = authSlice.actions;
export default authSlice.reducer;
