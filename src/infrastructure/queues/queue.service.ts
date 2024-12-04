import { Logger } from '@nestjs/common'
import { BulkJobOptions, Job, JobsOptions, Queue } from 'bullmq'

export abstract class AbstractQueueService {
  protected readonly logger: Logger

  abstract get queue(): Queue

  constructor() {}

  /**
   * Checks the connection to the queue server.
   *
   * @returns A promise that resolves if the connection is successful or throws an error if not.
   * @throws If the connection fails, an error is thrown.
   */
  protected async checkConnection(): Promise<void> {
    const client = await this.queue.client

    if (client.status !== 'ready') {
      const errorMessage = `❌ Queue "${this.queue.name}" is not connected. Current status: [${client.status.toUpperCase()}]`
      this.logger.error(errorMessage)
      throw new Error(errorMessage)
    }

    this.logger.log(`📦 Queue "${this.queue.name}" is connected.`)
  }

  /**
   * Adds event listeners to the queue.
   */
  protected async initEventListeners() {
    this.queue.on('error', (error: Error) => {
      this.logger.fatal(`Queue error: [${error.message}].`)
    })
  }

  /**
   * Drains all jobs from the queue.
   *
   * @param delayed - Whether to include delayed jobs in the drain operation. Defaults to `false`.
   * @returns A promise that resolves when the queue is fully drained.
   */
  protected async drain(delayed?: boolean): Promise<void> {
    return this.queue.drain(delayed)
  }

  /**
   * Removes all jobs from the queue, effectively obliterating its contents.
   *
   * @param options - Options for the obliteration process, including a `force` flag.
   * @returns A promise that resolves when the obliteration is complete.
   */
  protected async obliterate(options?: { force: boolean }): Promise<void> {
    return this.queue.obliterate(options)
  }

  /**
   * Closes the queue instance associated with this queue adapter.
   *
   * @returns A promise that resolves once the queue is closed.
   */
  protected closeQueue(): Promise<void> {
    return this.queue.close()
  }

  /**
   * Adds a single job to the queue for processing.
   *
   * @param name - The name of the job, used to identify the job type.
   * @param data - The data payload to pass to the job processor.
   * @param options - Optional configuration for the job, such as delay or priority.
   * @returns A promise that resolves to the created job instance.
   */
  protected async addJob<Data, Result>(name: string, data: Data, options?: JobsOptions): Promise<Job<Data, Result>> {
    this.logger.log(`📤 Adding job "${name}" to queue "${this.queue.name}".`)
    return this.queue.add(name, data, options)
  }

  /**
   * Adds multiple jobs to the queue in bulk.
   *
   * @param jobs - An array of job definitions, each containing `name`, `data`, and optional `options`.
   * @returns A promise that resolves to an array of created job instances.
   */
  protected async addBulk<Data, Result>(
    jobs: Array<{ name: string; data: Data; options?: BulkJobOptions }>
  ): Promise<Array<Job<Data, Result, string>>> {
    this.logger.log(`📤 Adding bulk jobs to queue "${this.queue.name}". Total jobs: ${jobs.length}.`)
    return this.queue.addBulk(jobs)
  }
}
