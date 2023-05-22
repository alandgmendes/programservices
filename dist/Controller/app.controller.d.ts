import { ServiceHub } from '../Services/app.service.info';
import { FileCreateDto } from 'src/DTO/fileCreate.Dto';
export declare class AppController {
    private readonly serviceHub;
    constructor(serviceHub: ServiceHub);
    getInfo(): Promise<string>;
    getHello(fileCreateDto: FileCreateDto): Promise<string[]>;
}
