import { AllModelsService } from './all-models.service';
export declare class AllModelsController {
    private readonly AllModelsService;
    constructor(AllModelsService: AllModelsService);
    getModelsBasicInfo(): Promise<any>;
    getModelById(body: any): Promise<any>;
}
