import { useContext, createContext, useState } from "react";

const UserContext= createContext();

export  const useUser = () => {
	return useContext(UserContext);
}

export  const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const [userPhone, setUserPhone] = useState(localStorage.getItem("userPhone") || "");

    return (
        <UserContext.Provider value={{
            userId, setUserId,
            userName, setUserName,
            userEmail, setUserEmail,
            userPhone, setUserPhone
        }}>
            {children}
        </UserContext.Provider>
    );
};

