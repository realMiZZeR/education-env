import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import UserAchievements from '../components/UserAchievements';
import UserSettings from '../components/UserSettings';

// stats icons
import AvgIcon from '../assets/images/icons/profile/avg_mark.svg';
import PlaceIcon from '../assets/images/icons/profile/place.svg';
import AchievementIcon from '../assets/images/icons/profile/achievement.svg';
import TasksIcon from '../assets/images/icons/profile/tasks.svg';

// contacts logos
import TelephoneIcon from '../assets/images/icons/telephone.svg';
import VkLogo from '../assets/images/logos/vk.svg';
import InstagramLogo from '../assets/images/logos/instagram.svg';

// achievements icons
import StarIcon from '../assets/images/icons/achievements/star.svg';
import PrizeIcon from '../assets/images/icons/achievements/prize.svg';
import UserImage from '../assets/images/user_image.jfif';

// functions
import updateTitle from '../assets/js/updateTitle';

function Stats({ statsList }) {

    const statsItems = statsList.map( item => {
            return (
                <div key={item.id} className='stats__item'>
                    <div className='stats-counter'>
                        <h2 className='stats-counter__number'>
                        <span>{ item?.number }</span>
                        </h2>
                        <p className='stats-counter__descr'>{ item.descr }</p>
                    </div>
                    <div className='stats__image'>
                        <img src={item.img} alt='AVG Mark' />
                    </div>
                </div>
            );
        }
    );

    return (
        <div className='stats'> { statsItems } </div>
    )
}

export default function Profile(props) {

    const { id } = useParams();

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const user = {
        id: 101,
        stats: [
            {
                id: 1,
                number: 4.63,
                descr: 'Средняя оценка за весь семестр',
                img: AvgIcon
            },
            {
                id: 2,
                number: 7,
                descr: 'Место по рейтингу в группе',
                img: PlaceIcon
            },
            {
                id: 3,
                number: 18,
                descr: 'Количество полученных достижений',
                img: AchievementIcon
            },
            {
                id: 4,
                number: 38,
                descr: 'Количество выполненных заданий',
                img: TasksIcon
            },
        ],
        info: {
            userImage: UserImage,
            initials: 'Николаева Анастасия Максимовна',
            course: 4,
            group: 'ПР-18',
            phrase: 'пацанская фраза реально',
            contacts: [
                {id: 1, link: '79049124123', img: TelephoneIcon, type: 'tel'},
                {id: 2, link: 'beautygirl', img: VkLogo, type: 'vk'},
                {id: 3, link: 'beautygirl', img: InstagramLogo, type: 'inst'}
            ]
        },
        achievements: [
            {id: 101, img: StarIcon, rarity: 'legendary', title: 'Перфекционист', descr: 'Закончить семестр на «Отлично»', avg: 20.6, completed: true},
            {id: 102, img: StarIcon, rarity: 'epic', title: 'Хороший студент', descr: 'Закончить семестр на «Хорошо»', avg: 73.8, completed: true},
            {id: 315, img: PrizeIcon, rarity: 'mythical', title: 'Претендент', descr: 'Закончить 3 курса на «Отлично»', avg: 4.3, completed: false},
            {id: 317, img: PrizeIcon, rarity: 'mythical', title: 'Претендент', descr: 'Закончить 3 курса на «Отлично»', avg: 4.3, completed: false},
            {id: 319, img: PrizeIcon, rarity: 'mythical', title: 'Претендент', descr: 'Закончить 3 курса на «Отлично»', avg: 4.3, completed: false},
        ],
        settings: {
            idUser: 'nastenka',
            visible: false,
            notification: true,
            email: 'example@gmail.com',
            changedPasswordAgo: 4
        }
    };

    return (
        <article className='profile'>
            <Stats statsList={ user.stats } />
            <div className='user'>
                <UserInfo userInfo={ user.info } />
                <UserAchievements achievementsList={ user.achievements } />
                <UserSettings userSettings={ user.settings } />
            </div>
        </article>
    );
}