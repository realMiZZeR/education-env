import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from '../components/UserInfo';
import UserAchievements from '../components/UserAchievements';
import UserSettings from '../components/UserSettings';
import LoadingPage from '../components/LoadingPage';
import CircleProgressBar from '../components/CircleProgressBar';

// stats icons
import avgIcon from '../assets/images/icons/profile/avg_mark.svg';
import placeIcon from '../assets/images/icons/profile/place.svg';
import achievementIcon from '../assets/images/icons/profile/achievement.svg';
import tasksIcon from '../assets/images/icons/profile/tasks.svg';
import groupIcon from '../assets/images/icons/group.png';

// functions
import updateTitle from '../assets/js/updateTitle';
import { useAuth } from '../hooks/useAuth';

function getStatImage (name) {
    switch(name) {
        case 'avg_mark':
            return avgIcon;
        case 'group':
            return groupIcon;
        case 'group_place':
            return placeIcon;
        case 'achievements':
            return achievementIcon;
        case 'completed_tasks':
            return tasksIcon;
        default:
            return;
    }
}

const StatsItem = ({ stats }) => {

    return (
        <div key={stats.id} className='stats__item'>
            <div className='stats-counter'>
                {(stats.name === 'achievements') ? (
                    <CircleProgressBar 
                        current={stats.value[0]} 
                        max={stats.value[1]} 
                        progressClass='stats-counter__progress'
                    />
                ) : (
                    <h2 className='stats-counter__number'>
                        <span>{ stats.value ? stats.value : 0 }</span>
                    </h2>
                )}
                
                <p className='stats-counter__descr'>{ stats.title }</p>
            </div>
            <div className='stats__image'>
                <img src={getStatImage(stats.name)} alt={stats.name} />
            </div>
        </div>
    );
}

const Profile = (props) => {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const params = useParams();

    const { user } = useAuth();

    const [ userProfile, setUserProfile ] = useState([]);
    const [ userIsLoading, setUserIsLoading ] = useState(true);

    useEffect(() => {
        setUserIsLoading(true);
        const fetchProfile = async () => {
            await axios.get(
                `http://server.selestia.ru/api/getUserUrlId`,
                {
                    params: {urlId: params.id},
                    headers: {token: user.token}
                }
            ).then(response => setUserProfile(response.data)
            ).catch(error => console.dir(error)
            ).finally(() => setUserIsLoading(false));
        }

        fetchProfile();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <>
            {userIsLoading ? (
                <LoadingPage />
            ) : (
                <article className='profile'>
                    <div className='stats'>
                        {userProfile.stats.map(item => {
                            return (
                                <StatsItem key={item.id} stats={item} />
                            );
                        })}
                    </div>
                    <div className='user'>
                        <UserInfo info={ userProfile.info } />
                        <UserAchievements achievements={ userProfile.achievements } />
                        {userProfile.isYou ? (
                            <UserSettings settings={ userProfile.settings } />
                        ) : (
                            <div className='user-controls'>
                                <h2 className='user-controls__heading'>&nbsp;</h2>
                                <button type='button' className='user-controls__button button'>
                                    <span>Отправить сообщение</span>
                                </button>
                            </div>
                        )}
                    </div>
                </article>
            )}
        </>
    );
}

export default Profile;