
interface Login {
  username: string;
  password: string;
}
const login = async (userData: Login) => {
  const { username, password } = userData;
  if (username === "user" && password === "password") {
    const fakeToken = "fake-jwt-token";
    localStorage.setItem("user", JSON.stringify(fakeToken));
    return { token: fakeToken };
  } else {
    throw new Error("Unauthorized");
  }
};

const getUser = async (userId: number) => {
  const userDetails = {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
  };
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  return userDetails;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userDetails");
};

const authService = {
  getUser,
  logout,
  login,
};

export default authService;
