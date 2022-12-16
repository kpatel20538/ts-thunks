import { Button, ButtonGroup } from "@blueprintjs/core";
import { useDarkMode } from "./useDarkMode";

export default function DarkModeSelector() {
  const { colorScheme, setColorScheme } = useDarkMode();

  return (
    <ButtonGroup>
      <Button
        icon="flash"
        text="Light"
        active={colorScheme === "light"}
        onClick={() => setColorScheme("light")}
      />
      <Button
        icon="moon"
        text="Dark"
        active={colorScheme === "dark"}
        onClick={() => setColorScheme("dark")}
      />
      <Button
        icon="cog"
        text="System"
        active={colorScheme === "system"}
        onClick={() => setColorScheme("system")}
      />
    </ButtonGroup>
  );
}
