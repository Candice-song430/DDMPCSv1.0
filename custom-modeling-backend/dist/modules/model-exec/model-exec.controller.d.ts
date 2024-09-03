import { ModelExecService } from './model-exec.service';
export declare class ModelExecController {
    private readonly ModelExecService;
    constructor(ModelExecService: ModelExecService);
    saveModel(body: any): Promise<any>;
    test(): Promise<any>;
    getAllPortsById(body: any): Promise<any[]>;
    deleteModel(body: any): Promise<any>;
}
