import React, { useEffect } from 'react';
import updateTitle from '../assets/js/updateTitle';

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
import getTypeOfContact from '../assets/js/checkContacts';
import getRarityOfAchievement from '../assets/js/checkAchievements';

function Stats({ statsList }) {

    const statsItems = statsList.map( item => {
            return (
                <div key={item.id} className='stats__item'>
                    <div className='stats-counter'>
                        <h2 className='stats-counter__number'>
                        <span>{ item.number }</span>
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

function ContactsList({ contactsList }) {

    const contactsItems = contactsList.map(item => {
        return (
            <li key={item.id} className='contacts-list__item'>
                <div className='contacts-list__image'>
                    <img src={item.img} alt='' />
                </div>
                <p className='contacts-list__contact'>{ getTypeOfContact(item.link, item.type)  }</p>
            </li>
        );
    });

    return(
        <ul className='contacts-list'>{ contactsItems }</ul>
    );
}

function UserInfo({ userInfo }) {
    const { userImage, initials, course, group, phrase, contacts } = userInfo;

    return (
        <article className='user-info'>
            <h2 className='user-info__heading'>Информация</h2>
            <div className='user-content'>
                <div className='user-content-main'>
                    <div className='user-content-main__image'>
                        <img src={userImage} alt='Аватарка' />
                    </div>
                    <div className='user-content-main__block'>
                        <h4 className='user-content-main__name'>{ initials }</h4>
                        <p className='user-content-main__student'>студент группы {group}, {course} курс</p>
                        <blockquote className='user-content-main__phrase'>
                            <span>{ phrase }</span>
                        </blockquote>
                    </div>
                </div>
                <div className='user-content-contacts'>
                    <h3 className='user-content-contacts__heading'>Контактные данные</h3>
                    <ContactsList contactsList={contacts} />
                </div>
            </div>
        </article>
    );
}

function UserAchievements({ achievementsList }) {

    function AchievementsList() {
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

    return (
        <article className='user-achievements'>
            <h2 className='user-achievements__heading'>Достижения</h2>
            <AchievementsList />
        </article>

    );
}

function UserSettings(props) {

    const { idUser, visible, notification, email, changedPasswordAgo } = props.userSettings

    return (
        <article className='user-settings'>
            <h2 className='user-settings__heading'>Настройки</h2>
            <div className='settings'>
                
            </div>
        </article>
    );

}

export default function Profile(props) {

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
            visible: 'teacher',
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