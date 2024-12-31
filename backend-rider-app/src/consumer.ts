import RabbitMQ from './rabbitMq/rabbitmq';
import * as amqplib from 'amqplib';

const consumeMessages = async (queue: string, callback: (message: any) => void): Promise<void> => {
    try {
        const rabbitMq = RabbitMQ.getInstance();
        await rabbitMq.connect();
        const channel = rabbitMq.getChannel();

        // Ensure the queue exists
        await channel.assertQueue(queue, { durable: true });

        console.log(`Waiting for messages in ${queue}...`);

        // Consume messages
        channel.consume(
            queue,
            (message: amqplib.Message | null) => {
                if (message) {
                    const content = JSON.parse(message.content.toString());
                    console.log(`Received message from ${queue}:`, content);

                    // Process the message using the callback
                    callback(content);

                    // Acknowledge the message
                    channel.ack(message);
                }
            },
            { noAck: false } // Set noAck to false to manually acknowledge messages
        );
    } catch (error) {
        console.error(`Failed to consume messages from ${queue}:`, error);
        throw error;
    }
};

export default consumeMessages;