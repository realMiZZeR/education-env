// key needs for change property in obj
// setHandler take setter from useState
function switchItemActive({initialValue, initialObject, modifyProperty, setHandler}) {

    // delete value if array has id or set if don't
    function changeValue(id) {
        let result = [];
    
        if(initialObject[modifyProperty].includes(id)) {
            result = initialObject[modifyProperty].filter(value => value !== id);
        } else {
            result = [
                ...initialObject[modifyProperty],
                id
            ];
        }
    
        return result;
    }    
    
    if(Array.isArray(initialObject[modifyProperty])) {
        setHandler({
            ...initialObject,
            [modifyProperty]: changeValue(initialValue)
        });
        return;
    }

    // unset value if the object has same property value
    if(initialObject[modifyProperty] === initialValue) {
        setHandler({
            ...initialObject,
            [modifyProperty]: null
        });
        return;
    }

    setHandler({
        ...initialObject,
        [modifyProperty]: initialValue
    });
}

export default switchItemActive;