function getInitials(fullname) {
    let initials = fullname.split(' ');
    if(initials.length === 3) {

        let firstLetterName = Array.from(initials[1]).shift();
        let firstLetterPatronymic = Array.from(initials[2]).shift();

        return `${initials[0]} ${firstLetterName}. ${firstLetterPatronymic}.`;
    }

    return fullname;
}

export default getInitials;