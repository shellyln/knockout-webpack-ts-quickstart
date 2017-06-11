
import { KoComponent, KoComponentBase } from "../../lib/KoDecorators";


@KoComponent("child", {
    template: require("./ChildComponent.html"),
})
export class ChildComponent extends KoComponentBase {
    public fullName: KnockoutObservable<string>;

    public constructor(params?: { fullName?: string, context?: any }) {
        super(params);
        this.fullName = this.getObservable(params && params.fullName, "??? ???");
    }
}
