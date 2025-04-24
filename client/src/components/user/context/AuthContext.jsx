import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loginToken, setLoginToken] = useState(null);

	useEffect(() => {
		const cookie = Cookies.get("LoginToken");
		return () => {
			setLoginToken(cookie);
		};
	}, [setLoginToken]);

	return <AuthContext.Provider value={{ loginToken }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
