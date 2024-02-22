import { NullAble } from "shared/types";

export interface UserSchema {
    id?: NullAble<string>;
    email?: NullAble<string>;
    token?: NullAble<string>;
    error?: string;
}
