/* eslint-disable */
/* eslint-env node, mocha */
var str1 = '你可以使用注释为文件指定 eslint 的环境 ↑';

/* global var1: true, var2: false */
var str2 = '你可以使用注释说明这两个变量是全局变量，并声明是否能被重写';

/* eslint eqeqeq: 0, curly: 2, "plugin1/rule1": 2  */
var str3 = '你可以使用注释让这些规则对你的文件进行特异性配置';

/* eslint-disable */ /* eslint-disable no-alert, no-console */
var str4 = "你可以使用注释让某段代码规避 eslint 的全部检测或指定项检测";
/* eslint-enable */ /* eslint-enable no-alert, no-console */

/* eslint-disable */
// Disables no-alert for the rest of the file
var str5 = '对下方所有代码都关闭全部检测或指定项检测';

var str6 = '对某一行关闭所有检测或指定项检测'; // eslint-disable-line no-alert, semi
// eslint-disable-next-line
alert('hahah, placeholder');
