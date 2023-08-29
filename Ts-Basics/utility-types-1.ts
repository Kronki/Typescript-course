interface MyUser {
    name: string;
    id: number;
    email?: string;
}

type MyUserOptionals = Partial<MyUser>

// interface MyUserOptionals {
//     name?: string;
//     id?: string;
//     email?: string;
// }

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return {
        ...user,
        ...overrides
    }
}

console.log(merge({
    name: "Jack",
    id: 1,
    email: "dontemail@dontemail.com"
}, {
    email: "dontemailbaz@dontemail.com"
}))

type RequiredMyUser = Required<MyUser>;

type JustEmailAndName = Pick<MyUser, "email" | "name">;

type UserWithoutId = Omit<MyUser, "id">

const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutId> => {
    return users.reduce((a, v) => {
        const { id, ...other} = v;
        return {
            ...a,
            [id]: other,
        };
    }, {});
};

console.log(mapById([
    {
        id: 2,
        name: "Mr. Foo"
    },
    {
        id: 3,
        name: "Mr. Baz"
    }
]));