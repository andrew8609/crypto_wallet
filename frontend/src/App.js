import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./routes/BaseRoutes";
import { createContext, useState } from "react";

export const UserContext = createContext();

function App() {
    const [password, setPassword] = useState("");
    return (
        <UserContext.Provider
            value={{
                password,
            }}
        >
            <BrowserRouter>
                <BaseRoutes />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
