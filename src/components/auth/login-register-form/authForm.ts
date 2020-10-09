export default {
    fullName: {
        key: 3,
        variant:"outlined",
        margin:"normal",
        required: true,
        fullWidth: true,
        id:"fullName",
        label:"Full Name",
        name:"fullName",
        autoComplete: "",
        autoFocus: true,
        value: ''
    },
    email: {   
        key: 1,
        variant:"outlined",
        margin:"normal",
        required: true,
        fullWidth: true,
        id:"email",
        label:"Email Address",
        name:"email",
        autoComplete:"email",
        autoFocus: false,
        value: ''
    },
    password: {   
        key: 2,
        variant:"outlined",
        margin:"normal",
        required: true,
        fullWidth: true,
        id:"Password",
        label:"Passowrd",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        autoFocus: false,
        value: ''
    }
};