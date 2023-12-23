"use client";

import { useCallback, useEffect, useState, Suspense } from 'react';
import { MonacoBinding } from 'y-monaco';
import { editor }from 'monaco-editor';
import { Editor } from '@monaco-editor/react';
import * as awarenessProtocol from "y-protocols/awareness";
import { useSelf, useUsers } from "y-presence";
import { awareness, provider, ydoc } from "../utils/y";
import { UserAwareness } from '@/utils/types';
import { Cursors } from "@/components/Cursors";
import dynamic from 'next/dynamic'
import styles from "./CollaborativeEditor.module.css";

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

  return (
    <>
      <div className={styles.container}>
        {provider ? <Cursors yProvider={provider} /> : null}
        <div className={styles.editorContainer}>
          <Editor
            onMount={handleOnMount}
            height="100%"
            width="100hw"
            theme="vs-light"
            defaultLanguage="typescript"
            defaultValue=""
            options={{
              tabSize: 2,
              padding: { top: 20 },
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
