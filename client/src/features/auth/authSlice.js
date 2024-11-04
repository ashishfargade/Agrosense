import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../app/api/axios";

const initialState = {
    user: null,
    token: null,
    loading: false, // Track loading state for UI feedback (optional)
    error: null,
};

export const signup = createAsyncThunk("user/signup", async (user) => {
    const { name, email, password } = user;

    console.log(user);

    try {
        const response1 = await axios.post(
            "/user/new",
            JSON.stringify({ name, email, password }),
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        if (response1.status !== 200) {
            throw new Error("Signup failed: " + response1.statusText);
        }
        console.log("Signup Success");
        const token = response1.data.token;

        const response2 = await axios.get("/user/auth", {
            headers: { "x-auth-token": token },
        });
        if (response2.status !== 200) {
            throw new Error("Authentication failed: " + response2.statusText);
        }

        console.log(response2.data)

        return {
            token: response1.data.token,
            user: response2.data,
        };
    } catch (err) {
        console.log(err);
    }
});

export const login = createAsyncThunk(
    "user/login",
    async (useremailandpass) => {
        const { email, password } = useremailandpass;

        console.log(email, password);

        try {
            const response1 = await axios.post(
                "/user/auth",
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response1.status !== 200) {
                throw new Error("Login failed: " + response1.statusText);
            }

            const token = response1.data.token;

            const response2 = await axios.get("/user/auth", {
                headers: { "x-auth-token": token },
            });

            if (response2.status !== 200) {
                throw new Error(
                    "Authentication failed: " + response2.statusText
                );
            }

            const user = response2.data; 

            return {
                token,
                user,
            };
        } catch (err) {
            console.log(err.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: {
            reducer(state, action) {
                state.user = null;
                state.token = null;
                state.loading = false;
                state.error = null;

                localStorage.removeItem("token");
            },
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                sessionStorage.setItem("user", JSON.stringify(action.payload.user));
                sessionStorage.setItem("token", action.payload.token);
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;

                sessionStorage.setItem("user", JSON.stringify(action.payload.user));
                sessionStorage.setItem("token", action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
