const baseUrl = "https://student-json-api.lidemy.me";

export function getPosts(page = 1) {
  return fetch(
    `${baseUrl}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`
  ).then((res) => res.json());
}

export function getAllPosts() {
  return fetch(`${baseUrl}/posts`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getOnePost(id) {
  return fetch(`${baseUrl}/posts?id=${id}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function post(title, body) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => {
      if (res.status < 200 || res.status >= 400) {
        console.log(res.status);
        console.log(res);
        alert("Error, please check console log");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function register(nickname, username, password) {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function login(username, password) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getMe() {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
