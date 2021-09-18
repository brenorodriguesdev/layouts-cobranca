var buffer = new Buffer(150);

buffer.write('A', 0, 1)
buffer.write('1', 1, 1)
buffer.write('00333403002500026207', 2, 20)
buffer.write('FUNDACAO REAL GRANDE', 22, 20)
buffer.write('033', 42, 3)
buffer.write('     BANCO SANTANDER', 45, 20)
buffer.write('20210701', 65, 8)
buffer.write('145', 76, 6)
buffer.write('05', 79, 2)
buffer.write('DÉBITO AUTOMÁTICO', 81, 19)
buffer.write('', 149, 52)

for (let i = 0; i < 150; i++) {
    if (buffer[i] === 0)
        buffer[i] = 32;
}

for (let i = 73; i < 78; i++) {
    if (buffer[i] === 32)
        buffer[i] = 48;
}

var buffer2 = new Buffer(150);
buffer2.write('E', 0, 1)
buffer2.write('1148199', 1, 25)
buffer2.write('0529', 26, 4)
buffer2.write('00000010106484', 30, 14)
buffer2.write('20210712', 44, 8)
buffer2.write('000000000014877', 52, 15)
buffer2.write('03', 67, 2)
buffer2.write('0000001428670000000000                                      ', 69, 49)
buffer2.write('', 118, 10)
buffer2.write('', 128, 1)
buffer2.write('2000059062282849', 129, 20)
buffer2.write('0', 149, 1)

for (let i = 0; i < 150; i++) {
    if (buffer2[i] === 0)
        buffer2[i] = 32;
}


var buffer3 = new Buffer(400);

buffer3.write('0', 0, 1)
buffer3.write('1', 1, 1)
buffer3.write('REMESSA', 2, 7)
buffer3.write('01', 9, 2)
buffer3.write('COBRANCA', 11, 15)
buffer3.write('       00000000000004000632', 26, 20)
buffer3.write('FUNDACAO REAL GRANDEZA', 46, 30)
buffer3.write('237', 76, 3)
buffer3.write('BRADESCO', 79, 15)
buffer3.write('030921', 94, 6)
buffer3.write('MX', 108, 2)
buffer3.write('0004422', 110, 7)
buffer3.write('000001', 394, 6)

for (let i = 0; i < 400; i++) {
    if (buffer3[i] === 0)
        buffer3[i] = 32;
}


fs = require('fs');
async function teste() {
    await fs.appendFile('xd.txt', buffer + "\n", (err) => { if (err) throw err; });
    await fs.appendFile('xd.txt', buffer2 + "\n", (err) => { if (err) throw err; });
}
teste()