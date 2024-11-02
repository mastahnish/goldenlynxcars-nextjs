export type Params<T extends string> = Promise<{
	readonly [K in T]: string;
}>;

export type QueryParam = string | readonly string[] | undefined;

export type SearchParams<T extends string> = Promise<{
	readonly [K in T]?: QueryParam;
}>;
