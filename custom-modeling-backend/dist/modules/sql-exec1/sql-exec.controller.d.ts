import { SqlExecService } from './sql-exec.service';
export declare class SqlExecController {
    private readonly SqlExecService;
    constructor(SqlExecService: SqlExecService);
    execSql(body: any): Promise<any>;
    getItemNums(body: any): Promise<any>;
    getDataByField(body: any): Promise<any>;
    getUnionSql(body: any): Promise<{
        data: any;
        sqlstr: string;
    }>;
}
