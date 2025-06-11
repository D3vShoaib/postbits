import axios from "axios";

export interface Post {
  id: string;
  title: string;
  description?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Get a single post by ID
export const getPostById = async (id: string): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

// Create a new post
export interface CreatePostData {
  title: string;
  description?: string;
  content: string;
}

export const createPost = async (postData: CreatePostData): Promise<Post> => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Update an existing post
export interface UpdatePostData {
  title?: string;
  description?: string;
  content?: string;
}

export const updatePost = async (
  id: string,
  updateData: UpdatePostData
): Promise<Post> => {
  try {
    const response = await api.put(`/posts/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id: string): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} successfully deleted`);
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};


// add a link 
export const addLink = async (link: string): Promise<any> => {
  try {
    const response = await api.post("/links", { link });
    return response.data;
  } catch (error) {
    console.error("Error adding link:", error);
    throw error;
  }
};
// Get all links
export const getLinks = async (): Promise<any[]> => {
  try {
    const response = await api.get("/links");
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};

// Get a link by ID
export const getLinkById = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`/links/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching link with ID ${id}:`, error);
    throw error;
  }
};

// Update a link
export const updateLink = async (id: string, link: string): Promise<any> => {
  try {
    const response = await api.patch(`/links/${id}`, { link });
    return response.data;
  } catch (error) {
    console.error(`Error updating link with ID ${id}:`, error);
    throw error;
  }
};

// Delete a link
export const deleteLink = async (id: string): Promise<void> => {
  try {
    await api.delete(`/links/${id}`);
    console.log(`Link with ID ${id} successfully deleted`);
  } catch (error) {
    console.error(`Error deleting link with ID ${id}:`, error);
    throw error;
  }
};
