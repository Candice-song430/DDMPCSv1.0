import { AllDatabasesService } from './all-databases.service';
export declare class AllDatabasesController {
    private readonly AllDatabasesService;
    constructor(AllDatabasesService: AllDatabasesService);
    getAllDatabases(): any;
    saveDatabases(body: any): void;
    getInfoByDatabasesName(): Promise<any[]>;
}
