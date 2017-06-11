

export interface IKoComponentOptions {
    synchronous?: boolean | undefined;
    template: string | Node[] | DocumentFragment |
        KnockoutComponentTypes.TemplateElement | KnockoutComponentTypes.AMDModule;
}

export interface IKoComponentStatic {
    new (...param: any[]): IKoComponentInstance;
}

export interface IKoComponentInstance {
}

export function KoComponent(name: string, options: IKoComponentOptions) {
    return (clazz: IKoComponentStatic): any => {
        ko.components.register(name, { viewModel: clazz, ...options });
        return clazz;
    };
}

export class KoComponentBase {
    protected context: any;
    public constructor(params?: { context?: any }) {
        this.context = (params && params.context) ? params.context : {};
    }
    protected getObservable<T>(value: any, defaultValue: T): KnockoutObservable<T> {
        if (value === null || value === void 0) {
            return ko.observable(defaultValue);
        }
        if (ko.isObservable(value)) {
            return value;
        }

        const z = ko.observable(typeof value === "function" ? value() : value.toString());
        if (ko.isSubscribable(value)) {
            (value as KnockoutSubscribable<any>).subscribe((v) => {
                z(v.toString());
            });
        }
        return z;
    }
}



export interface IKoModuleOptions {
    /** Array of Components and/or Directives */
    declarations?: any[];
}

export interface IKoModuleStatic {
    new (): IKoModuleInstance;
}

export interface IKoModuleInstance {
}

export function KoModule(name: string, options: IKoModuleOptions) {
    return (clazz: IKoModuleStatic): any => {
        // if (options.declarations) {
        //     for (const d of options.declarations) {
        //     }
        // }
        return clazz;
    };
}
