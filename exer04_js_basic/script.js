// let funcNoname = function () {
//     alert('함수_01');
//     alert('함수_02');
// };

// // funcNoname();

// alert(typeof(funcNoname) + ' : ' + funcNoname);

// function funcName() {
//     alert('함수_01');
//     alert('함수_02');
// };

// alert(typeof(funcName) + ' : ' + funcName);


// function f(x) {
//     return x * x;
// };

// alert(f(3));

// let fun = function() {
//     alert('함수호출');
// };


// let fun = function() {
//     alert('함수호출');
// };

// function callTenTimes(callback_func) {
//     for(let i = 0; i < 10; i++) {
//         callback_func();
//     }
// }

// callTenTimes(fun);


let person = {
    name: '윤인성',
    eat: function (food) {
        alert(food + '을 먹습니다.');
    }
};

person.eat('밥');


