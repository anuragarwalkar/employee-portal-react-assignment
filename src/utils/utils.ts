export const convertFormToArray = (form: any, condition = '') => {
    const formElements: any = [];

    for (const key in form) {
        if(key !== condition) {
            formElements.push({
               ...form[key]
            });
        }
    }

    return formElements;
}

export const cloneState = (state: any) => {
    return JSON.parse(JSON.stringify(state))
}

export const updateObject = (state: any, updateObject: any) => {
    return {
        ...cloneState(state),
        ...updateObject
    }
}