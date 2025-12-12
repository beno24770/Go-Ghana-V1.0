import React from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] p-4 max-w-7xl mx-auto">
            {children}
        </div>
    );
}
