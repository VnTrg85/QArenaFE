import { createContext, useContext, useState } from "react";

// 1. Tạo Context
const UserContext = createContext();

// 2. Tạo Provider để bọc toàn bộ ứng dụng
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const setUserValue = user => setUser(user);
	const getUserValue = () => user;

	return <UserContext.Provider value={{ getUserValue, setUserValue }}>{children}</UserContext.Provider>;
};
// 3. Hook để dùng Context dễ dàng
export const useUser = () => {
	return useContext(UserContext);
};
