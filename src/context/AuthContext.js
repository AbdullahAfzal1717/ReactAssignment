import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
  // useState,
} from "react";
// import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";
// import { type } from "@testing-library/user-event/dist/type";
// import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: payload.user };
    case "SET_PROFILE":
      return { ...state, user: payload.user };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

function AuthContextProvider({ children }) {
  // const navigate = useNavigate('')
  // const navigate = useNavigate("");
  // const [message, setMessage] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const setuser = useCallback(() => {
    onAuthStateChanged(auth, (user) => {
      setIsAppLoading(true);
      if (user) {
        readProfile(user);
      } else {
        // setTimeout(() => {
        //   setIsAppLoading(false);
        // }, 3000);
        setIsAppLoading(false);
        console.log("User not found");
      }
    });
  }, []);

  useEffect(() => {
    setuser();
  }, [setuser]);

  const readProfile = async (user) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    setIsAppLoading(true);
    try {
      if (docSnap.exists()) {
        const user = docSnap.data();
        dispatch({ type: "LOGIN", payload: { user } });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    } finally {
      setIsAppLoading(false);
    }
  };

  // const register = (userdata) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   users.push(userdata);
  //   localStorage.setItem("users", JSON.stringify(userdata));
  // };
  // const login = (email, password) => {
  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const user = users.find(
  //     (user) => user.email === email && user.password === password
  //   );
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //     navigate("/menu");
  //   } else {
  //     setMessage("Invalid email or password");
  //   }
  // };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <AuthContext.Provider
      value={{ ...state, isAppLoading, setIsAppLoading, dispatch, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
