function Foo(){
    var number = 0;
    this.increase = function () {
        number++;
    };
    this.getNumber = function () {
        return number;
    };
}