export const getLastWeekRange = (weeksBack: number = 0) => {
    const today = new Date();
    const endDate = new Date(today.setDate(today.getDate() - weeksBack * 7));
    const startDate = new Date(today.setDate(today.getDate() - 6));
  
    const format = (date: Date) => date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
    return {
      startDate: format(startDate),
      endDate: format(endDate),
    };
  };