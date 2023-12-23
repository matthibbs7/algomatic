import { useEffect, useMemo, useState } from "react";
import {
  useSelf, useUsers,
} from "y-presence";
import { WebrtcProvider } from "y-webrtc";
import * as awarenessProtocol from "y-protocols/awareness";
import { awareness, provider } from "@/utils/y";
import { AwarenessList } from "@/utils/types";

type Props = {
  yProvider: WebrtcProvider;
};

export function Cursors({ yProvider }: Props) {
  // Get user info from Liveblocks authentication endpoint
    const userInfo = useSelf(awareness, (me) => me?.info);
    const users = useUsers(awareness);
    const [awarenessUsers, setAwarenessUsers] = useState<AwarenessList>([]);

    useEffect(() => {
        setAwarenessUsers([...provider.awareness.getStates()] as AwarenessList);
    }, [users])
    // useEffect(() => {
    //     // Add user info to Yjs awareness
    //     // const localUser: UserAwareness["user"] = userInfo;
    //     // yProvider.awareness.setLocalStateField("user", localUser);

    //     // On changes, update `awarenessUsers`
    //     function setUsers() {
    //     setAwarenessUsers([...yProvider.awareness.getStates()] as AwarenessList);
    //     }

    //     yProvider.awareness.on("change", setUsers);
    //     setUsers();

    //     return () => {
    //     yProvider.awareness.off("change", setUsers);
    //     };
    // }, [yProvider]);

    // Insert awareness info into cursors with styles
    const styleSheet = useMemo(() => {
        let cursorStyles = "";

        for (const [clientId, client] of users) {
            if (client?.user) {
                cursorStyles += `
                .yRemoteSelection-${clientId}, 
                .yRemoteSelectionHead-${clientId}  {
                    --user-color: ${client.user.color};
                }
                
                .yRemoteSelectionHead-${clientId}::after {
                    content: "${client.user.name}";
                }
                `;
            }
        }

        return { __html: cursorStyles };
    }, [users]);

    return <style dangerouslySetInnerHTML={styleSheet} />;
}
