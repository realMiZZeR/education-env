import React from 'react';

const JournalStats = ({ image, title, value }) => {
    return (
        <div className='journal-stats'>
            <div className="journal-stats__image">
                <img src={image} alt={title} />
            </div>
            <p className='journal-stats__title'>{title}</p>
            <h2 className='journal-stats__value'>
                <span>{value}</span>
            </h2>
        </div>
    );
}

export default JournalStats;