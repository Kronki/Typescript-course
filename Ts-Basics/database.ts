interface Database<T, K> {
    get(id: K): T;
    set(id: K, value: T): void;
}

interface Persistable {
    saveToString(): string;
    restoreFromString(storedState: string): void;
}

type DbKeyType = string | number | symbol;

class InMemoryDatabase<T, K extends DbKeyType> implements Database<T, K> {
    protected db: Record<K, T> = {} as Record<K, T>;
    get(id: K): T {
        return this.db[id];
    }
    set(id: K, value: T): void {
        this.db[id] = value;
    }
}

class PersistenMemoryDB<T, K extends DbKeyType> extends InMemoryDatabase<T, K> implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db);
    }
    restoreFromString(storedState: string): void {
        this.db = JSON.parse(storedState);
    }
}

const myDB = new PersistenMemoryDB<number, number>();
myDB.set(1, 22);
//myDB.db["foo"] = "baz";
console.log(myDB.get(1));
const saved = myDB.saveToString();
myDB.set(2, 23);

const myDB2 = new PersistenMemoryDB<number, string>();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));