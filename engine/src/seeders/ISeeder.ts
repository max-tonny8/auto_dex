export interface ISeeder {
    execute(): Promise<void>;
}