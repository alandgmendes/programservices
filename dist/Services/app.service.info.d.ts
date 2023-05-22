export declare class ServiceHub {
    getInfo: () => Promise<string>;
    postFile: (fileString: string) => Promise<string[]>;
}
