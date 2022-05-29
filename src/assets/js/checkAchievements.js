export function getRarityOfAchievement(avg, className) {
    avg = Number(avg);
    if(avg <= 5) {
        return `${className}_myth`;
    }
    if(avg <= 15) {
        return `${className}_leg`;
    }
    if(avg <= 50) {
        return `${className}_epic`;
    }
    if(avg > 50) {
        return `${className}_common`;
    }
}

export function getImageOfAchievement(title) {
    
}