export declare class SqlExecService {
    execShowDatabase(body: any): Promise<any>;
    execTool(body: any): Promise<any>;
    getItemNums(body: any): Promise<any>;
    judgeIfHasNode(array: any, node: any): boolean;
    resortNodes(id: any): any[];
    getDataByField(body: any): Promise<any>;
    getSelectSqlByNodes(nodes: any): any;
    getSelectSqlByNode(node: any): any;
    getNodeByLine(node: any, portId: any): any;
    getSelectSqlByTable(table: any): {
        tableName: any;
        sqlstr: any;
    };
    getSelectSql(body: any): string;
    getInnerJoinSql(body: any): Promise<any>;
}