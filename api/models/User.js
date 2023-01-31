import mongoose from "mongoose";

const userModel = mongoose.Schema({

    first_name : {
        type : String,
        requried : true,
        trim : true
    },
    sur_name : {
        type : String,
        requried : true,
        trim : true
    },
    username : {
        type : String,
        trim : true,
        default : ''
    },
    secondary_name : {
        type : String,
        trim : true,
        default : ''
    },
    email : {
        type : String,
        trim : true,
    },
    password : {
        type : String,
        requried :  true,
        trim : true,
    },
    mobile : {
        type : String,
        trim : true
    },
    gender : {
        type : String,
        requried : true,
        enum : ['Male', 'Female', 'Custom']
    },
    profile_photo : {
        type : String,
        default : null
    },
    cover_photo : {
        type : String,
        default : null
    },
    birth_date : {
        type : String,
    },
    birth_month : {
        type : String,
    },
    birth_year : {
        type : String,
    },
    bio : {
        type : String,
        default : null
    },
    cat : {
        type : Array,
        default : []
    },
    work : {
        type : Array,
        default : []
    },
    edu : {
        type : Array,
        default : []
    },
    uni : {
        type : Array,
        default : []
    },
    living : {
        type : String
    },
    home_town : {
        type : String
    },
    relationShip : {
        type : String,
        enum : ['Single', 'Married', 'In a RelationShip']
    },
    jonied : {
        type : Date
    },
    social : {
        type : Array,
        default : []
    },
    isActivited : {
        type : Boolean,
        default : false
    },
    friends : {
        type : Array,
        default : []
    },
    folowing : {
        type : Array,
        default : []
    },
    folwers : {
        type : Array,
        default : []
    },
    request : {
        type : Array,
        default : []
    },
    blocks : {
        type : Array,
        default : []
    },
    posts : {
        type : Array,
        default : []
    },
    confirm : {
        type : Array,
        default : []
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    statue : {
        type : Boolean,
        default : true
    },
    trash : {
        type : Boolean,
        default : false
    },
    access_token : {
        type : String,
        default : ''
    }

}, {
    timestamps : true
});


// export default students model
export default mongoose.model( 'User', userModel )