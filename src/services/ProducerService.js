const amqp = require('amqplib');
const { InternalError } = require('../exceptions');
const { broker } = require('../config');

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(broker.server);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    if (!channel.sendToQueue(queue, Buffer.from(message))) {
      throw new InternalError('Failed to send message to broker');
    }

    setTimeout(() => {
      connection.close();
    }, 1000);
  },
};

module.exports = ProducerService;
