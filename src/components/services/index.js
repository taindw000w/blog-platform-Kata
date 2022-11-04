import axios from 'axios';
// USERS
const BASE_URL = `https://blog.kata.academy/api/`;

export async function fetchSearch(url, token) {
  const urlResult = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return urlResult.data;
}


export const fetchArticlesList = async (page = 1, limit = 5, token) => {
  const articlesUrl = `articles`;
  const offset = (page - 1) * limit;
  const fullUrl = `${BASE_URL}${articlesUrl}?offset=${offset}&limit=${limit}`;
  return fetchSearch(`${fullUrl}`, token);
};

export const signUp = async(userData) => {
  const user = { user: userData };
  const response = await fetch(`${BASE_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const body = await response.json();
  return body;
}

export const signIn = async (userData) => {
  const user = { user: userData };
  const response = await fetch(`${BASE_URL}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  const body = await response.json();
  return body;
};

export const authorizeUser = async (token) => {
  return axios
    .get(`${BASE_URL}user`, {
      headers: { 
        Authorization: `Token ${token}` 
      },
    })
    .then((response) => response.data)
    .catch((data) => {
      throw data.response.data;
    });
};

export const updateUser = async (user) => {
  return axios.put(`${BASE_URL}user`,{user},{
    headers: { authorization: `Bearer ${localStorage.getItem("token")}`},
  })
  .then((response) => response.data)
  .catch((data) => {
    throw data.response.data;
  });
};

export const createPost = async (token, userData) => {
  const post = { article: userData };
  const response = await fetch(`${BASE_URL}articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(post),
  });

  const body = await response.json();

  return body;
};

export const favoriteArticle = async(token, slug ) => {
  const favoriteURL = `articles/${slug}/favorite`;
  const response = await fetch(`${BASE_URL}${favoriteURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Token ${token}`,
    },
   
  });

  const body = response.json();

  return body

}
export const unfavoriteArticle = async(token, slug ) => {
  const favoriteURL = `articles/${slug}/favorite`;
  const response = await fetch(`${BASE_URL}${favoriteURL}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Token ${token}`,
    },
  });

  const body = response.json();

  return body

}

export const updateArticle = async (token, article, slug) => {
  const updateArticleUrl = `articles/${slug}`;
  const fullUrl = `${BASE_URL}${updateArticleUrl}`;

  const request = {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  };

  const result = await fetch(`${fullUrl}`, request);

  if (!result.ok) {
    throw new Error(`Status: ${result.status}`);
  }

  return result.json();
};

export const deleteArticle = async (token, slug, article) => {
  const deleteArticleUrl = `articles/${slug}`;
  const fullUrl = `${BASE_URL}${deleteArticleUrl}`;
  const request = {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  const result = await fetch(`${fullUrl}`, request);

  if (result.ok) {
    return true;
  }

  return false;
};




