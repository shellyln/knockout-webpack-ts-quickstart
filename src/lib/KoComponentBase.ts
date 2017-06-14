

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
