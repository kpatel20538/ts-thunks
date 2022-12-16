import Head from "next/head";
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  ResizeSensor,
} from "@blueprintjs/core";
import Editor from "@monaco-editor/react";
import DarkModeSelector from "../src/dark-mode/DarkModeSelector";
import { useDarkMode } from "../src/dark-mode/useDarkMode";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const EXAMPLE_TYPES = `export type Action = {
  kind: 'add' | 'remove';
};
`


const EXAMPLE_CODE = `import { Action } from './types.ts';

const alpha = {
  kind: 'add'
};

const beta = {
  kind: 'remove'
};

const gamma = {
  kind: 'not-an-action'
};

// ---

type IsAction<T> = T extends Action ? true : false;

export const isAlphaAnAction: IsAction<typeof alpha> = true;
export const isBetaAnAction: IsAction<typeof beta> = true;
export const isGammaAnAction: IsAction<typeof gamma> = false;
`

export default function Home() {
  const { isDark } = useDarkMode();
  const [{ height, width }, setSize] = useState({
    height: "auto",
    width: "100%",
  });

  return (
    <div className={styles.root}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading> TS Thunks </Navbar.Heading>
          <Navbar.Divider />
          <Button className={Classes.MINIMAL} icon="home" text="Home" />
          <Button className={Classes.MINIMAL} icon="document" text="Files" />
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <DarkModeSelector />
        </Navbar.Group>
      </Navbar>
      <div className={styles.main}>
        <div className={styles.item}>
          <Editor
            theme={isDark ? "vs-dark" : "light"}
            defaultLanguage="typescript"
            defaultValue={EXAMPLE_TYPES}
            height="auto"
          />
        </div>
        <div className={styles.item}>
          <Editor
            options={{ readOnly: true, domReadOnly: true }}
            theme={isDark ? "vs-dark" : "light"}
            defaultLanguage="typescript"
            defaultValue={EXAMPLE_CODE}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}
