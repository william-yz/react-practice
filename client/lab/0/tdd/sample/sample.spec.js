describe("样例", function() {
    var _foo = null;

    beforeEach(function() {
        _foo = new Foo();
    });

    it("样例", function() {
        expect(_foo.getNumber()).toBe(0);
    });
});