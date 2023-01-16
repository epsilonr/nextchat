import { useState, useEffect } from "react";

export default function ({ message, owner, date }) {

    const [timeDiff, setTimeDiff] = useState(null);

    useEffect(() => setTimeDiff(new Date() - new Date(date)), []);

    function getTimeDifference() {
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        let timeString = "";
        if (years > 0) {
            timeString += years + (years > 1 ? " years " : " year ");
        } else if (months > 0) {
            timeString += months + (months > 1 ? " months " : " month ");
        } else if (days > 0) {
            timeString += days + (days > 1 ? " days " : " day ");
        } else if (weeks > 0) {
            timeString += weeks + (weeks > 1 ? " weeks " : " week ");
        } else if (hours > 0) {
            timeString += hours + (hours > 1 ? " hours " : " hour ");
        } else if (minutes > 0) {
            timeString += minutes + (minutes > 1 ? " minutes " : " minute ");
        } else if (seconds > 0) {
            timeString += seconds + (seconds > 1 ? " seconds " : " second ");
        }

        return timeString
    };

    return (
        <div className="flex gap-x-4 mb-8 relative group">
            <button className="font-mono font-thin absolute hidden group-hover:block text-gray-500 right-2">x</button>
            <div className="bg-gray-800 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full"></div>
            <div>
                <div>
                    <h4 className="font-bold inline-block mr-2">{owner}</h4>
                    <p className="text-sm inline-block text-gray-400">{getTimeDifference()}</p>
                </div>
                <p className="text-gray-200 flex-1">{message}</p>
            </div>
        </div>
    )
};