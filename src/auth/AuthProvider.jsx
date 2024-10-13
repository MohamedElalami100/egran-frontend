import * as React from "react";

const authContext = React.createContext();

export function useAuth() {
  // Retrieve initial auth status and role from localStorage, if available
  const [authed, setAuthed] = React.useState(() => {
    const storedAuth = localStorage.getItem("authed");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [role, setRole] = React.useState(() => {
    console.log(localStorage.getItem("role"));
    return localStorage.getItem("role") || null;
  });

  // Persist auth status and role to localStorage on state change
  React.useEffect(() => {
    localStorage.setItem("authed", JSON.stringify(authed));
    localStorage.setItem("role", role);
  }, [authed, role]);

  return {
    authed,
    role,
    login(username, password) {
      // Simulate login with hardcoded credentials for testing
      if (username === "admin" && password === "admin123") {
        return new Promise((res) => {
          setAuthed(true);
          setRole("ADMIN");
          res({ authed: true, role: "ADMIN" });
        });
      }
      if (username === "Mohamed" && password === "mohamed123") {
        return new Promise((res) => {
          setAuthed(true);
          setRole("FARMER");
          res({ authed: true, role: "FARMER" });
        });
      }
      throw new Error("Login Failed");
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        setRole(null);
        localStorage.removeItem("authed");
        localStorage.removeItem("role");
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
