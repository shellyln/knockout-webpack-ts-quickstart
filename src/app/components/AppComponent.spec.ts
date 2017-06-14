
import { AppComponent } from "./AppComponent";


describe("AppComponent", function() {
    let comp: AppComponent;

    beforeEach((done) => {
        done();
    });

    it("AppComponent#constructor", function() {
        comp = new AppComponent({firstName: "abc", lastName: "def"});
        expect(comp.fullName()).toEqual("abc def");
    });
});
