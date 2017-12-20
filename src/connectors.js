export function getUserData(username) {
  return JSON.parse(localStorage.getItem(username));
}

export function saveUserData(username, data) {
  localStorage.setItem(username, JSON.stringify(data));
}

export function validateLogin(username, password) {
  if (username !== '' && password !== '') {
    return true;
  }
}