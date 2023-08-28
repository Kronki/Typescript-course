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