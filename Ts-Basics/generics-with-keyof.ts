function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[], key: KeyType
): DataType[KeyType][] {
    return items.map(item => item[key]);
}

const cats = [
    {name: "Harun", age: 6},
    {name: "Dalina", age: 2}
]

console.log(pluck(cats, "age"));
console.log(pluck(cats, "name"));

interface BaseEvent {
    time: number;
    user: string;
}
interface EventMap {
    addToCart: BaseEvent & { quantity: number; productId: string},
    checkout: BaseEvent
}

function sendEvent<Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void {
    console.log([name, data]);
}

sendEvent("addToCart", {productId: "foo", user: "baz", quantity: 1, time: 10});
sendEvent("checkout", {time: 20, user: "bob"});