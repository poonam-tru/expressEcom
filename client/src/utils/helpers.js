export const userValue = (variableName, value) => {
  localStorage.setItem(variableName, value);
};

export const fetchUserValue = (variableName) => {
  return localStorage.getItem(variableName);
};

export const saveLoginCred = (user) => {
  userValue("user", JSON.stringify(user));
};

export const removeStoredValue = (variableName) => {
  localStorage.removeItem(variableName);
};

export const removeCred = (storageKey) => {
  removeStoredValue(storageKey);
};

export const getUserCred = () => {
  try {
    return JSON.parse(fetchUserValue("user"));
  } catch (err) {
    return {};
  }
};
