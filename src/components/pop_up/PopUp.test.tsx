import { vi, describe, it, expect, test } from "vitest";


test("1 should equal to 1", () => {
    expect(1).toBe(1);
})

describe("test PopUp", () => {
    it("test 1", () => {
        expect(1).toBe(1);
    })
})


describe("call FetchVal", () => {

    const FetchVal = vi.fn(() => 0);
    // call FetchVal once
    FetchVal();
    it("call FetchVal once", () => {
        expect(FetchVal).toHaveBeenCalledOnce();
    });
    

})



