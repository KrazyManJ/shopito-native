import ShoppingItem from "@/model/ShoppingItem";
import ShoppingList from "@/model/ShoppingList";
import { SQLiteDatabase } from "expo-sqlite";

type DatabaseTable = "shopping_lists" | "shopping_items"

type DatabaseChangeListener = (table: DatabaseTable) => void

export default class ShopitoRepository {

    private readonly listeners: DatabaseChangeListener[] = [];

    constructor(private db: SQLiteDatabase) {}

    public async init() {
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS shopping_lists (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                description TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS shopping_items (
                id INTEGER PRIMARY KEY NOT NULL,
                listId INTEGER NOT NULL, 
                name TEXT NOT NULL,
                amount INT NOT NULL,
                checked BOOLEAN NOT NULL DEFAULT(FALSE),
                FOREIGN KEY(listId) REFERENCES shopping_lists(id)
            );
        `);

        this.seed()
    }

    private async seed() {
        const listCountResult = await this.db.getFirstAsync<{ count: number }>(
            'SELECT COUNT(*) as count FROM shopping_lists'
        );
        if (listCountResult && listCountResult.count === 0) {
            await this.db.execAsync(`
                INSERT INTO shopping_lists (id, name, description) VALUES
                    (1, 'General Shopping List', '')
                ;
                INSERT INTO shopping_items (listId, name, amount) VALUES 
                    (1, 'Milk', 2),
                    (1, 'Bread', 1)
                ;
            `);
        }
    }

    /**
     * Registers listeners for update of table
     * @param listener 
     * @returns Callback to unregister listener
     */
    public onChange(listener: DatabaseChangeListener) {
        this.listeners.push(listener);

        return () => {
            this.listeners.splice(this.listeners.indexOf(listener))
        }
    }

    private notifyChange(table: DatabaseTable) {
        this.listeners.forEach(listener => listener(table))
    }

    public async getAllShoppingLists() {
        return await this.db.getAllAsync<ShoppingList>("SELECT * FROM shopping_lists")
    }

    public async getAllShoppingItems() {
        return await this.db.getAllAsync<ShoppingItem>("SELECT * FROM shopping_items")
    }

    public async getShoppingItemsFromShoppingList(listId: number) {
        return await this.db.getAllAsync<ShoppingItem>("SELECT * FROM shopping_items WHERE listId=?", listId)
    }

    public async getShoppingListById(id: number) {
        return await this.db.getFirstAsync<ShoppingList>("SELECT * FROM shopping_lists WHERE id=?", id)
    }

    public async addItemToShoppingList(listId: number, item: ShoppingItem & {id?: null | undefined}) {
        await this.db.runAsync(`
            INSERT INTO shopping_items (listId, name, amount) VALUES (?, ?, ?);
        `, listId, item.name, item.amount)
        this.notifyChange("shopping_items")
    }
    
    public async changeItemCheckState(id: number, state: boolean) {
        await this.db.runAsync(`UPDATE shopping_items SET checked=? WHERE id=?`, state, id)
        this.notifyChange("shopping_items")
    }
    
    public async getShoppingItemById(id: number) {
        return await this.db.getFirstAsync<ShoppingItem>(`SELECT * FROM shopping_items WHERE id=?`, id)
    }
    
    public async updateShoppingItem(newItem: ShoppingItem) {
        if (!newItem.id) return
        await this.db.runAsync(`UPDATE shopping_items SET name=?, amount=?, checked=? WHERE id=?`, newItem.name, newItem.amount, newItem.checked, newItem.id)
        this.notifyChange("shopping_items")
    }
    
    public async deleteShoppingItem(id: number) {
        await this.db.runAsync(`DELETE FROM shopping_items WHERE id=?`, id)
        this.notifyChange("shopping_items")
    }
}