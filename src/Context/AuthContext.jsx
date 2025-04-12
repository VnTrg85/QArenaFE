import { createContext, useCallback, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const storedUser = JSON.parse(localStorage.getItem("user"));

	const [user, setUser] = useState(storedUser || { email: "", role: "" });

	const setUserValue = useCallback(user => {
		setUser(user);
	}, []);

	const getUserValue = () => user;

	return <UserContext.Provider value={{ getUserValue, setUserValue }}>{children}</UserContext.Provider>;
};

// 3. Hook để dùng Context dễ dàng
export const useUser = () => {
	return useContext(UserContext);
};
