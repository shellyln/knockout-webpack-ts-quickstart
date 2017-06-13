
import { KoModule }       from "../lib/KoDecorators";
import { ChildComponent } from "./components/ChildComponent";
import { AppComponent }   from "./components/AppComponent";


@KoModule("KoApp", {
    declarations: [
        AppComponent,
        ChildComponent,
    ],
})
export class AppModule {
}
