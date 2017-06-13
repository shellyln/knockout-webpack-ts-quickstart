
import { KoModule }       from "../lib/KoDecorators";
import { AppComponent }   from "./components/AppComponent";
import { ChildComponent } from "./components/ChildComponent";


@KoModule("KoApp", {
    declarations: [
        AppComponent,
        ChildComponent,
    ],
})
export class AppModule {
}
