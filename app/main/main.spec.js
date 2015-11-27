// Named imports test
import { listSupportedComputers, listPorts } from './main';

describe("main", function () {

    it("lists supported computers", function () {
        var list = listSupportedComputers();
        expect(list.length).toBe(136);
    });

    it("lists ports", function () {
        var list = listPorts();
        expect(list.length).toBe(1);
    });

});
