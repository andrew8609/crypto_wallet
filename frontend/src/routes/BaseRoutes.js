import { Route, Routes } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import MainPage from "../pages/main/MainPage";
import PasswordPage from "../pages/create/PasswordPage";

const BaseRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/password-page" element={<PasswordPage />} />
            </Routes>
        </>
    );
};

export default BaseRoutes;
