import { BetterDatePipe } from './betterdate.pipe';

describe('BetterdatePipe', () => {
  it('create an instance', () => {
    const pipe = new BetterDatePipe();
    expect(pipe).toBeTruthy();
  });
});
