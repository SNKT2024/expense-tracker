const useUser = () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) return null;
    return userData;
  } catch {
    return null;
  }
};

export const updateAccounts = (newAccId) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const updateAccount = {
    ...userData,
    accounts: [...userData.accounts, newAccId],
  };

  localStorage.setItem("user", JSON.stringify(updateAccount));
};
export default useUser;
