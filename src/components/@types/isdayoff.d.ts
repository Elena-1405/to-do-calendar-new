declare module 'isdayoff' {
    interface IsDayOffOptions {
      country?: string;
      region?: string;
      year?: number;
      month?: number;
    }
  
    function isDayOff(date: string, options?: IsDayOffOptions): Promise<boolean>;
  
    export default isDayOff;
  }