const baseUrl = "https://student-json-api.lidemy.me";

export function getPosts(page = 1) {
  return fetch(
    `${baseUrl}/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=5`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
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

export function fetchAddPost(postData) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      body: postData.content,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function fetchEditPost(postData) {
  return fetch(`${baseUrl}/posts/${postData.id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: postData.title,
      body: postData.content,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function fetchDeletePost(id) {
  const token = localStorage.getItem("token");
  return fetch(`${baseUrl}/posts/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function getPageCount() {
  return fetch(`${baseUrl}/posts?_page=1`)
    .then((res) => {
      const pageCount = res.headers.get("x-total-count");
      return Math.ceil(parseInt(pageCount, 10) / 5);
    })
    .catch((err) => console.log(err));
}

export function fetchRegister(userData) {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname: userData.nickname,
      username: userData.username,
      password: userData.password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function fetchLogin(userData) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
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
