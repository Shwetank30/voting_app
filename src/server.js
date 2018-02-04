import Server from 'socket.io';

export default function startServer() {
  const io = new Server().attach(8090);
  
  /* possible optimizations are sending only the relevant subset or
  sending diffs instead of snapshots */
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );
  
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}