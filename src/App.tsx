import React from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  Tab,
  Tabs,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { PublicationsPage } from "./pages/publications";
import { Header } from "./common/components/Header";
import { ControlPanel } from "./common/components/ControlPanel";
import { LoginPage } from "./pages/login";
import { useAppDispatch, useAppSelector } from "./store";
import { Toast } from "./common/components/Toast/Toast";
import { closeRegistrationToast } from "./store/users/usersSlice";
import { TrackingsPage } from "./pages/trackings";
import { UserRoles } from "./store/users/types";
import { UsersPage } from "./pages/users";
import { openTab } from "./store/settings/settingsSlice";
import { AppTabs } from "./store/settings/types";

function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.users.authToken);
  const user = useAppSelector((state) => state.users.user);
  const isAdmin = user?.role === UserRoles.admin;
  const openedTab = useAppSelector((state) => state.settings.openedTab);

  const registrationToast = useAppSelector(
    (state) => state.users.registrationSuccessToast
  );

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        {typeof token === "string" && token ? (
          <>
            <Header />
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                paddingLeft: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Tabs
                value={openedTab}
                onChange={(event: React.SyntheticEvent, newValue: AppTabs) => {
                  dispatch(openTab(newValue));
                }}
              >
                <Tab
                  id={AppTabs.publications}
                  value={AppTabs.publications}
                  label="Публикации"
                />
                <Tab
                  id={AppTabs.trackings}
                  value={AppTabs.trackings}
                  label="Выдача"
                />
                {isAdmin && (
                  <Tab
                    id={AppTabs.users}
                    value={AppTabs.users}
                    label="Пользователи"
                  />
                )}
              </Tabs>
              <ControlPanel />
            </Box>
            {openedTab === AppTabs.publications && <PublicationsPage />}
            {openedTab === AppTabs.trackings && <TrackingsPage />}
            {isAdmin && openedTab === AppTabs.users && <UsersPage />}
          </>
        ) : (
          <LoginPage />
        )}
      </div>

      <Toast
        type="success"
        onClose={() => {
          dispatch(closeRegistrationToast());
        }}
        open={registrationToast}
      >
        Регистрация прошла успешно!
      </Toast>
    </ThemeProvider>
  );
}

export default App;
