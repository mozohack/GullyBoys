// var PythonShell = require('python-shell');

// var options = {
//     scriptPath: '/py'
// };

// var pyshell = new PythonShell('test.py', options, {
//     mode: 'text'
// });

// pyshell.stdout.on('data', function(data) {
//     if (data == 'data') 
//     pyshell.send('OK').end(function(err){
//         if (err) console.log(err);
//         else console.log("SOMETHING");
//     });
//     else if (data == 'data2')
//         pyshell.send('OK').end(function(err){
//             if (err) {
//                 console.error(err); 
//             // ...
//             }
//         });
//     console.log(data);
//  });

// pyshell.end(function(err) {
//     if (err) throw err;
//     console.log('End Script');
// });