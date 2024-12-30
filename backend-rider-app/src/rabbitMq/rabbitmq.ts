import amqp, { Connection, Channel } from 'amqplib';
import { RABBITMQ_URL } from '../config';

class RabbitMQ {
  private static instance: RabbitMQ;
  private connection!: Connection;
  private channel!: Channel;

  private constructor() {}

  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(RABBITMQ_URL); // RabbitMQ URL
        this.channel = await this.connection.createChannel();
        console.log('Connected to RabbitMQ');
      } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
      }
    }
  }

  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connect() first.');
    }
    return this.channel;
  }

  public async close(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    console.log('RabbitMQ connection closed');
  }
}

export default RabbitMQ;
