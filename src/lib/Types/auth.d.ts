import {User} from "next-auth"
export type LoginResponse=pick<User,"token"|"user">
export type RegisterResponse=pick<User,"token"|"user">
