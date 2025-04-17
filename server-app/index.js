import DHT from 'hyperdht';
import b4a from 'b4a';

const dht = new DHT();

const keyPair = DHT.keyPair();

const server = dht.createServer(conn => {
    console.log("got connection!");
    process.stdin.pipe(conn).pipe(process.stdout);
});

server.listen(keyPair).then(() => {
    console.log('listening on: ', b4a.toString(keyPair.publicKey, 'hex'));
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function shutdown(){
    console.log('shutting down...');
    try {
        await server.close();
        await dht.destroy();
        console.log('Shutdown complete.');
    } catch (error) {
        console.error(`Error during shutdown: ${error}`);
        process.exit(0);
    }
}