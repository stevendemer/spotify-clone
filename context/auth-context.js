import { createContext, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
  });

  const setUserAuthInfo = ({ data }) => {
    // store the unique JWT token
    const token = localStorage.setItem("token", data.data);

    setAuthState({
      token,
    });
  };

  // check if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
