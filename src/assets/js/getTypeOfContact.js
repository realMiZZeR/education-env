// parameters of the function are contact and type of this contact
// example: '7999999999', 'tel'
function getTypeOfContact(contact, type) {
    switch(type) {
        case 'tel':
            const regEx = /\+\\d([0-9]{3})[0-9]{3]-[0-9]{2}-[0-9]{2}/gi;
            return contact.replace(regEx, '$1');
        case 'vk':
           return `/${contact}`;
        case 'inst':
            return `@${contact}`;
        default:
            return;
    }
}

export default getTypeOfContact;