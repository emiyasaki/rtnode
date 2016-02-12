function printHelp() {
    console.log('2.js (c) Edmilson Miyasaki');
    console.log('');
    console.log('usage:');
    console.log('--help          print this help');
    console.log('--file={NAME}   read and print {NAME}');
    console.log('');
}

var args = require('minimist')(process.argv.slice(2), {
    string: 'file'
});

if (args.help || !args.file) {
    printHelp();
    process.exit(1);
}

var hello = require('./helloworld2.js');

hello.say(args.file)
    .val(function(contents) {
        console.log(contents.toString());
    })
    .or(function(err) {
        console.error(err);
    });
