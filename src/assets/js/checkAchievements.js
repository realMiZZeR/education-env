// rarity - string, classname - string
function getRarityOfAchievement(rarity, className) {
    switch(rarity) {
        case 'epic':
            return `${className}_epic`;
        case 'legendary':
            return `${className}_leg`;
        case 'mythical':
            return `${className}_myth`;
        default:
            return '';
    }
}

export default getRarityOfAchievement;