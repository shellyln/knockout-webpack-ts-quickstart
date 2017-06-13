
import { KoComponent }     from "../../lib/KoDecorators";
import { KoComponentBase } from "../../lib/KoComponentBase";


@KoComponent("child", {
    template: require("./ChildComponent.html"),
})
export class ChildComponent extends KoComponentBase {
    public firstName: KnockoutObservable<string>;
    public fullName: KnockoutObservable<string>;
    public numberOfClicks = ko.observable(0);
    public hasClickedTooManyTimes = ko.pureComputed(() => {
        return this.numberOfClicks() >= 3;
    }, this);

    public constructor(params?: { firstName?: string, fullName?: string, context?: any }) {
        super(params);
        this.firstName = this.getObservable(params && params.firstName, "__first__");
        this.fullName = this.getObservable(params && params.fullName, "??? ???");
    }

    public registerClick(): void {
        this.numberOfClicks(this.numberOfClicks() + 1);
        this.firstName(this.firstName() + this.numberOfClicks());
    }
}
