export const startOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };
  
  export const endOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };
  
  export const eachDayOfInterval = (start: Date, end: Date): Date[] => {
    const days: Date[] = [];
    const currentDate = new Date(start);
  
    while (currentDate <= end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };