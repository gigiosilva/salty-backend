import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { Round } from './round.entity';
import { RoundsService } from './rounds.service';

@Injectable()
export class RoundSchedulerService {
  private logger = new Logger('RoundSchedulerService', { timestamp: true });

  constructor(
    private roundsService: RoundsService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleRound(round: Round) {
    const startRoundDate = new Date(round.startDate);
    const endRoundDate = new Date(round.endDate);

    const startRoundjob = new CronJob(startRoundDate, () => {
      this.roundsService.startRound(round);
    });
    const endRoundjob = new CronJob(endRoundDate, () => {
      this.roundsService.endRound(round);
    });

    this.schedulerRegistry.addCronJob(`start-${round.id}`, startRoundjob);
    this.schedulerRegistry.addCronJob(`end-${round.id}`, endRoundjob);

    if (round.startDate > new Date()) startRoundjob.start();
    if (round.endDate > new Date()) endRoundjob.start();
  }

  cancelScheduledRound(roundId: string) {
    const startJob: CronJob = this.schedulerRegistry.getCronJob(`start-${roundId}`);
    if (startJob) startJob.stop();

    const endJob: CronJob = this.schedulerRegistry.getCronJob(`end-${roundId}`);
    if (endJob) endJob.stop();
  }

  cancelAllScheduledRounds() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop();
    });
  }

  initRoundSchedules(activeRounds: Round[]) {
    activeRounds.forEach((round) => {
      this.scheduleRound(round);
    });
  }
}
