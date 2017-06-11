
import { ChildComponent, HelloComponent, KoModule } from "../index";


@KoModule("KoApp", {
    declarations: [
        HelloComponent,
        ChildComponent,
    ],
})
export class AppModule {
}
