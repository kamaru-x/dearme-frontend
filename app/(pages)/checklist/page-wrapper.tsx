'use client';

import { Suspense } from 'react';
import ChecklistPage from './page';

export default function ChecklistPageWrapper() {
    return (
        <Suspense fallback={
            <div className="min-h-screen mx-5 flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        }>
            <ChecklistPage />
        </Suspense>
    );
}
