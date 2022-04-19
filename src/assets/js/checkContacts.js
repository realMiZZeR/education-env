// parameters of the function are contact and type of this contact
function getTypeOfContact(contact, type) {
    switch(type) {
        case 'tel':
            let result = '+';
            for(let i = 0 ; i < contact.length; i++) {
                switch(i) {
                    case 1 : result += `(${contact[i]}`; break;
                    case 3 : result += `${contact[i]})`; break;
                    case 6 : result += `${contact[i]}-`; break;
                    case 8 : result += `${contact[i]}-`; break;
                    default : result += contact[i]; 
                }
            }
            return result;
        case 'vk':
           return `/${contact}`;
        case 'inst':
            return `@${contact}`;
    }
}

export default getTypeOfContact;