import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const ProtectRoute = ({ element: Element, ...rest }) => {
	const { loginToken } = useAuthContext();
	console.log(loginToken);

	return loginToken ? (
		<Routes>
			<Route {...rest} element={<Element />} />
		</Routes>
	) : (
		<Navigate to={`/login`} replace />
	);
};

export default ProtectRoute;
