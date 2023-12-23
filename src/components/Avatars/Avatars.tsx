
import { useSelf, useUsers } from "y-presence";
import styles from "./Avatars.module.css";
import { awareness } from "@/utils/y";

export function Avatars() {
  const users = useUsers(awareness);
  const currentUser = useSelf(awareness);

  return (
    <div className={styles.avatars}>
        {users && Array.from(users.keys()).map((s: any, i: any) => {
            const u = users.get(s);
            if (!u || !u.user) return;
            return (
                <Avatar key={i} picture={u.user.picture} name={u.user.name} />
            );
        })}


        {currentUser && currentUser.user && (
            <div className="relative ml-8 first:ml-0">
            <Avatar
                picture={currentUser.user.picture}
                name={currentUser.user.name}
            />
            </div>
        )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
        <img
            src={picture}
            className={styles.avatar_picture}
            data-tooltip={name}
            alt="avatar"
        />
    </div>
  );
}
