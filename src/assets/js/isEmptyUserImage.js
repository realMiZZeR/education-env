function isEmptyUserImage(initialImage, initialClassName) {
    if(!initialImage) {
        return `${initialClassName} ${initialClassName}_empty`;
    }

    return initialClassName;
}

export default isEmptyUserImage;