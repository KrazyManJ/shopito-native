export type ArrayToObject<T extends readonly string[]> = { [K in T[number]]: string }

export type Prettify<T> = {[K in keyof T]: T[K]} & {}
