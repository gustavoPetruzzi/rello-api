const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // userOwner:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

module.exports = mongoose.model('Card', cardSchema);

// export interface Card{
//     id: string;
//     title: string;
//     content: string;
//     userOwner: User;
//     relatedUsers: User[];
// }