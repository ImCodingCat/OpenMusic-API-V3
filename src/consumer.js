// Made by mdavap
// Consumer for message broker
require('dotenv').config();
const amqp = require('amqplib');
const PlaylistService = require('./services/PlaylistService');
const EmailService = require('./services/EmailService');
const Listener = require('./listener');

const { broker } = require('./config');

const runConsumer = async () => {
  const playlistService = new PlaylistService();
  const emailService = new EmailService();
  const listener = new Listener(playlistService, emailService);

  const connection = await amqp.connect(broker.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:playlists', listener.listen, { noAck: true });

  console.log('Consumer is running!');
};

runConsumer();
