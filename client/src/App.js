import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/constants/Theme";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home/LoginRegister";
import GlobalStyle from "./globalStyles";
import { ProtectedRoutes } from "./components/routing";
import CompleteProfile from "./views/CompleteProfile";
// import { Chat } from "@material-ui/icons";
import Profile from "./views/Profile/Profile";
import Browsing from "./views/Browsing/Browsing";
import Chat from "./views/Chat/Chat";

const App = () => {
    const [themeSelector, setThemeSelector] = useState(true);
    return (
        <ThemeProvider theme={themeSelector ? theme.light : theme.dark}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    {/* <Route path="/verifyProfil" element={<ComfirmAccount />} /> */}
                    {/* protected routes */}
                    {/* <Route element={<ProtectedRoutes />}> */}
                        <Route
                            path="/completeProfile"
                            element={<CompleteProfile />}
                        />
                        <Route path="/messages" element={<Chat />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/browsing" element={<Browsing />} />
                    {/* </Route> */}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
