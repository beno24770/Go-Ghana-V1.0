// Ghana Public Holidays 2025
export interface GhanaHoliday {
    name: string;
    date: string; // YYYY-MM-DD format
    month: number;
    day: number;
}

export const GHANA_HOLIDAYS_2025: GhanaHoliday[] = [
    { name: "New Year's Day", date: "2025-01-01", month: 1, day: 1 },
    { name: "Constitution Day", date: "2025-01-07", month: 1, day: 7 },
    { name: "Independence Day", date: "2025-03-06", month: 3, day: 6 },
    { name: "Good Friday", date: "2025-04-18", month: 4, day: 18 },
    { name: "Easter Monday", date: "2025-04-21", month: 4, day: 21 },
    { name: "May Day (Workers' Day)", date: "2025-05-01", month: 5, day: 1 },
    { name: "Eid al-Fitr", date: "2025-04-10", month: 4, day: 10 }, // Approximate (Islamic calendar)
    { name: "Eid al-Adha", date: "2025-06-17", month: 6, day: 17 }, // Approximate (Islamic calendar)
    { name: "Founders' Day", date: "2025-08-04", month: 8, day: 4 },
    { name: "Kwame Nkrumah Memorial Day", date: "2025-09-21", month: 9, day: 21 },
    { name: "Farmers' Day", date: "2025-12-05", month: 12, day: 5 }, // First Friday of December
    { name: "Christmas Day", date: "2025-12-25", month: 12, day: 25 },
    { name: "Boxing Day", date: "2025-12-26", month: 12, day: 26 },
];

/**
 * Get the next Ghana public holiday from today
 */
export function getNextGhanaHoliday(): GhanaHoliday | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingHolidays = GHANA_HOLIDAYS_2025.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate >= today;
    });

    if (upcomingHolidays.length === 0) {
        return null; // No upcoming holidays this year
    }

    // Return the closest upcoming holiday
    return upcomingHolidays[0];
}

/**
 * Get all Ghana holidays in a specific month
 */
export function getHolidaysByMonth(month: number): GhanaHoliday[] {
    return GHANA_HOLIDAYS_2025.filter(holiday => holiday.month === month);
}

/**
 * Check if a date is a Ghana public holiday
 */
export function isGhanaHoliday(date: Date): boolean {
    const dateStr = date.toISOString().split('T')[0];
    return GHANA_HOLIDAYS_2025.some(holiday => holiday.date === dateStr);
}
