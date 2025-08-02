import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import store from "./Store";
import AppRoutes from "./Pages/AppRoutes";
function App() {
  const theme = createTheme({
    focusRing: "never",
    fontFamily: "Poppins,sans-serif",
    primaryColor: "bright-sun",
    primaryShade: 4,
    colors: {
      "mine-shaft": [
        "#121212",
        "#1F1F1F",
        "#2B2B2B",
        "#3A3A3A",
        "#4D4D4D",
        "#606060",
        "#757575",
        "#8C8C8C",
        "#A0A0A0",
        "#B5B5B5",
      ],
      "bright-sun": [
        "#FFEA00",
        "#FFE600",
        "#FFE200",
        "#FFDD00",
        "#FFD800",
        "#FFD400",
        "#FFCF00",
        "#FFC900",
        "#FFC400",
        "#FFC000",
      ],
    },
  });
  return (
    <div className="overflow-x-hidden min-h-[100vh]">
      <Provider store={store}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <Notifications position="top-center" zIndex={1000} />
          <AppRoutes/>
        </MantineProvider>
      </Provider>
    </div>
  );
}

export default App;
