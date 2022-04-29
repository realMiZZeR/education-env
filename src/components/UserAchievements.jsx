import React from 'react';
import getRarityOfAchievement from '../assets/js/checkAchievements';

function AchievementsList({ achievementsList }) {
    const achievementsItems = achievementsList.map(item => {
        return (
            <li key={item.id} className='achievements-list__item'>
                <div className={`achievements-list__image ${getRarityOfAchievement(item.rarity, 'achievements-list__image')}`}>
                    <img src={item.img} alt='' />
                </div>
                <div className='achievements-list-info'>
                    <h4 className='achievements-list-info__title'>{ item.title }</h4>
                    <p className='achievements-list-info__descr'>{ item.descr }</p>
                    <small className='achievements-list-info__stats'>Есть у { item.avg }% студентов</small>
                </div>
            </li>
        );
    });

    return (
        <ul className='achievements-list'>{ achievementsItems }</ul>
    );
}

function UserAchievements({ achievementsList }) {

    return (
        <article className='user-achievements'>
            <h2 className='user-achievements__heading'>Достижения</h2>
            <AchievementsList achievementsList={achievementsList} />
        </article>

    );
}

export default UserAchievements;