import TopBar from "../TopBar";
import { ThemeProvider } from "../ThemeProvider";

export default function TopBarExample() {
  return (
    <ThemeProvider>
      <TopBar apiStatus="connected" />
    </ThemeProvider>
  );
}
