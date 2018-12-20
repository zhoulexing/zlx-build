import { createAction } from "redux-actions";
import { expect } from "chai";


describe("models -> example", () => {
    it("should create an action", () => {
        const keywords = "Hello Wrold";
        const oneAction = createAction("test");
        const testAction = {
            type: "test",
            payload: keywords
        };
        expect(oneAction(keywords).type).equal(testAction.type);
    });
});