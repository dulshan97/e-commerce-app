export interface UserDetails {
    id?:string,
    password?: string;
    email?: string;
    name?: string;
    isAuthenticated?: boolean;
    registeredAt:string
}