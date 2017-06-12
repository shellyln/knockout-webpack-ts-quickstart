
import { KoComponent, KoComponentBase } from "../../lib/KoDecorators";


@KoComponent("app", {
    template: require("./AppComponent.html"),
})
export class HelloComponent extends KoComponentBase {
    public firstName: KnockoutObservable<string>;
    public lastName: KnockoutObservable<string>;
    public fullName: KnockoutComputed<string>;

    public constructor(params?: { firstName?: string, lastName?: string, context?: any }) {
        super(params);
        this.firstName = this.getObservable(params && params.firstName, "Planet");
        this.lastName = this.getObservable(params && params.lastName, "Earth");
        this.fullName = ko.computed(() => {
            // Knockout tracks dependencies automatically.
            // It knows that fullName depends on firstName and lastName,
            // because these get called when evaluating fullName.
            return this.firstName() + " " + this.lastName();
        }, this);
    }
}
