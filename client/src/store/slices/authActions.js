import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://127.0.0.1:4000";

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log( { username, password });
      const { data } = await axios.post(
        `${backendURL}/login`,
        { username, password },
        config
      );
      console.log('data', data);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return {isLog: true, data};
    } catch (error) {
      return {islog: false}
    }
  }
);
