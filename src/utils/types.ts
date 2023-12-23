export type UserMeta = {
    id: string; // Accessible through `user.id`
    info: {
        name: string;
        color: string;
        picture: string;
    }; // Accessible through `user.info`
}

export type UserAwareness = {
    user?: UserMeta["info"];
}

export type AwarenessList = [number, UserAwareness][];