import React from 'react';

interface OverviewCardProps {
    color: string;
    icon: string;
    title: string;
    value: string | number;
}

const OverviewCard = ({ color, icon, title, value }: OverviewCardProps) => {
    return (
        <div className={`${color} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow flex items-center`}>
            <div className="bg-white bg-opacity-20 w-16 h-16 flex justify-center items-center rounded-full">
                <i className={`${icon} text-2xl`}></i>
            </div>
            <div className="ml-4">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-4xl font-bold">{value}</p>
            </div>
        </div>
    );
};

export default OverviewCard;