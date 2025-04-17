import DHT from 'hyperdht';
import b4a from 'b4a';

const key = process.argv[2];

if(!key) throw new Error('provide a key');

console.log(`Connecting to ${key}`);
const publickKey = b4a.from(key, 'hex');

const dht = new DHT();
const conn = dht.connect(publickKey);

conn.once('open', () => console.log('Connected!'));

process.stdin.pipe(conn).pipe(process.stdout);