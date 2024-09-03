export declare class AllDatabasesService {
    getAllDatabases(): any;
    saveDatabases(databases: any): void;
    getInfoByDatabaseName(name: any): Promise<any>;
    getOidByDatabaseName(name: any): Promise<any>;
    getFieldsByDatabaseName(name: any): Promise<any>;
}
