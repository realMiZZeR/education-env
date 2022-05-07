// initialize into className
// and set parameters - image and need classname for this element
function isEmptyUserImage(initialImage, initialClassName) {
    if(!initialImage) {
        return `${initialClassName} ${initialClassName}_empty`;
    }

    return initialClassName;
}

export default isEmptyUserImage;