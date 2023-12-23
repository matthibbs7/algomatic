"use client";

import { useCallback, useEffect, useState, Suspense } from 'react';
import { MonacoBinding } from 'y-monaco';
import { editor }from 'monaco-editor';
import { Editor, useMonaco } from '@monaco-editor/react';
import { useSelf, useUsers } from "y-presence";
import { awareness, provider, ydoc } from "../../utils/y";
import { UserAwareness } from '@/utils/types';
import { Cursors } from "@/components/Cursors";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from '../Avatars/Avatars';
import { Toolbar } from '../Toolbar/Toolbar';
import "monaco-themes/themes/Pastels on Dark.json";

const testUsers = [
  { name: "Jonnny", email: "test@gmail.com" },
  { name: "Jeff", email: "test2@gmail.com" },
  { name: "Tom", email: "test3@gmail.com" }
];

const USER_INFO = [
  {
    name: "Charlie Layne",
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  },
  {
    name: "Mislav Abha",
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    name: "Tatum Paolo",
    color: "#F0D885",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    name: "Anjali Wanda",
    color: "#85EED6",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },
  {
    name: "Jody Hekla",
    color: "#85BBF0",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
  },
  {
    name: "Emil Joyce",
    color: "#8594F0",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
  },
  {
    name: "Jory Quispe",
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
  },
  {
    name: "Quinn Elton",
    color: "#87EE85",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
  },
];

const InitializeEditor = () => {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>()
  const [initialRender, setInitialRender] = useState(true);
  const users = useUsers(awareness);
  const monaco = useMonaco();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    if (!editorRef) return;

    // const { ydoc, provider } = createYWebrtcProvider();

    const type = ydoc.getText("monaco");
    const binding = new MonacoBinding(type, editorRef?.getModel()!, new Set([editorRef!]), awareness);
    // if (initialRender) awareness?.setLocalState(testUsers[Math.floor(Math.random() * 3)]);
    // console.log(users)
    // setInitialRender(false);
    return () => {
      ydoc?.destroy();
      provider?.destroy();
      binding?.destroy();
    };
  }, [editorRef]);

  useEffect(() => {
    console.log("user movement detected", users)
  }, [users])

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    const localUser: UserAwareness["user"] = USER_INFO[Math.floor(Math.random() * 8)]
    awareness.setLocalStateField("user", localUser);
    setEditorRef(e);
  }, []);

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco isntance:", monaco);
      import("monaco-themes/themes/Pastels on Dark.json").then((data) => {
        monaco.editor.defineTheme(
          "P", 
          {...data as editor.IStandaloneThemeData, 
            colors: {
            "editor.background": '#1B1B1F',
            // "editor.selectionHighlightBorder": "#1B1B1F",
            "editor.lineHighlightBorder": "#1d1d21"
            }
          }
        );
        setIsThemeLoaded(true);
      });
    }
  }, [monaco])

  return (
    <>
      <div className={styles.container}>
        {provider ? <Cursors yProvider={provider} /> : null}
        <div className={styles.editorHeader}>
          <div>{editorRef ? <Toolbar editor={editorRef} /> : null}</div>
          <Avatars />
        </div>
        <div className={styles.editorContainer}>
          <Editor
            onMount={handleOnMount}
            height="100%"
            width="100hw"
            theme={isThemeLoaded ? "P" : "dark"}
            defaultLanguage="python"
            defaultValue=""
            options={{
              wordBasedSuggestions: "off",
              acceptSuggestionOnEnter: "off",
              quickSuggestions: {
                other: false,
                comments: false,
                strings: false
              },
              suggestOnTriggerCharacters: false,
              tabSize: 2,
              padding: { top: 20 },
              minimap: { enabled: false },
            }}
            
          />
        </div>
      </div>
      {users && Array.from(users.keys()).map((s: any, i: any) => {
          const u = users.get(s);
          if (!u || !u.user) return;
          return <p key={i} style={{color: u.user.color}}>{u.user.name}</p>
        })}
    </>
  )
}

const CollaborativeEditor = () => {
  return (
    <Suspense fallback={"Loading ..."}>
      <InitializeEditor />
    </Suspense>
    )
}

export default CollaborativeEditor;
