import RabbitMQ from "./rabbitMq/rabbitmq";

const consumeMessages = async (
    queue: string,
    onMessage: (message: any) => void
): Promise<void> => {
    try {
        const rabbitMq = RabbitMQ.getInstance();
        await rabbitMq.connect();
        const channel = rabbitMq.getChannel();

        await channel.assertQueue(queue, { durable: true });

        console.log(`Waiting for messages in ${queue}...`);

        // settingup consumer
        channel.consume(
            queue,
            (message) => {
                if (message) {
                    const content = JSON.parse(message.content.toString());
                    console.log(`Received message from ${queue}:`, content);

                    onMessage(content);

                    // Acknowledging msg
                    channel.ack(message);
                }
            },
            { noAck: false } // Ensure manual acknowledgment
        );
    } catch (error) {
        console.error(`Failed to consume messages from ${queue}:`, error);
        throw error;
    }
};

export default consumeMessages;