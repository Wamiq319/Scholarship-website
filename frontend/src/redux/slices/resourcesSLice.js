import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

// --- Helper ---
const handleApiResponse = async (response) => {
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "An error occurred");
  return result;
};

// --- Thunks ---


// --- Register User ---
export const registerUser = createAsyncThunk(
  "resources/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const { data, success, message } = await handleApiResponse(res);
      return { data, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);




// Login
export const login = createAsyncThunk(
  "resources/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      const { data, success, message } = await handleApiResponse(res);
      if (success) localStorage.setItem("admin", JSON.stringify(data));
      return { data, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk("resources/logout", async () => {
  localStorage.removeItem("admin");
});

// Fetch resources
export const fetchResources = createAsyncThunk(
  "resources/fetch",
  async ({ resource }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/${resource}`, {
        credentials: "include",
      });
      const { data, success, message } = await handleApiResponse(res);
      return { resource, data, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create resource
export const createResource = createAsyncThunk(
  "resources/create",
  async ({ resource, body }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const { data, success, message } = await handleApiResponse(res);
      return { resource, data, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Update resource
export const updateResource = createAsyncThunk(
  "resources/update",
  async ({ resource, id, body }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/${resource}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const { data, success, message } = await handleApiResponse(res);
      return { resource, id, data, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Delete resource
export const deleteResource = createAsyncThunk(
  "resources/delete",
  async ({ resource, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/api/${resource}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const { success, message } = await handleApiResponse(res);
      return { resource, id, success, message };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --- Slice ---
const storedAdmin = JSON.parse(localStorage.getItem("admin") || "null");

const initialState = {
  admin: storedAdmin,
  data: {},
  status: "idle",
  message: null,
  error: null,
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(login.fulfilled, (state, action) => {
        state.admin = action.payload.data;
        state.message = action.payload.message;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
        state.status = "idle";
      })
      // Fetch
      .addCase(fetchResources.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.data[action.payload.resource] = action.payload.data || [];
        state.message = action.payload.message;
        state.status = "succeeded";
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Create
      .addCase(createResource.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createResource.fulfilled, (state, action) => {
        const { resource, data } = action.payload;
        if (!state.data[resource]) state.data[resource] = [];
        state.data[resource].push(data);
        state.status = "succeeded";
      })
      .addCase(createResource.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update
      .addCase(updateResource.fulfilled, (state, action) => {
        const { resource, id, data } = action.payload;
        state.data[resource] = state.data[resource].map((item) =>
          item.id === id ? { ...item, ...data } : item
        );
        state.status = "succeeded";
      })
      // Delete
      .addCase(deleteResource.fulfilled, (state, action) => {
        const { resource, id } = action.payload;
        state.data[resource] = state.data[resource].filter(
          (item) => item.id !== id
        );
        state.status = "succeeded";
      });
  },
});

export default resourcesSlice.reducer;
