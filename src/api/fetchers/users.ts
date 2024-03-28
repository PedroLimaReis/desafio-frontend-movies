import { client } from "../client";

type TUser = {
    id: string
    name: string
    email: string
    password: string
    role: "ADMIN" | "MEMBER"
    enabled: boolean
};

export type TUserWithoutId = Omit<TUser, 'id'>;

export type TUserWithoutPassword = Omit<TUser, 'password'>;

export async function login(payload: {email: string, password: string}) {
    const { data } = await client.post<{token: string}>('/sessions', payload);
    return data;
}

export async function profile() {
    const { data } = await client.get<{user: TUserWithoutPassword}>('/me');
    return data;
}

export async function create(user: Partial<TUserWithoutId>) {
    const { data } = await client.post<void>('/users', user);
    return data;
}

export async function update(id: string, user: Partial<TUserWithoutId>) {
    const { data } = await client.put<void>(`/users/${id}`, user);
    return data;
}

export async function enable(id: string, enabled: boolean) {
    const { data } = await client.patch<void>(`/users/${id}/enable`, {enabled});
    return data;
}

