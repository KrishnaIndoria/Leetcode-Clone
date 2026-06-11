const mongoose = require('mongoose');
const {Schema} = mongoose;

const problemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:["Easy","Medium","Hard"],
        required:true
    },
    Tags:{
        type:String,
        enum:['Array','String','2D Array','Stack','Queue','Linked List','Trees','Graph','DP'],
        required:true
    },
    visibleTestCases:[
        {
            inputs:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],

    HiddenTestCases:[
        {
            inputs:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startCode:[
        {
            language:{
                type:String,
                required:trusted
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],
    referenceCode:[
        {
            language:{
                type:String,
                required:true
            },
            completeCode:{
                type:String,
                required:true,
            }
        }
    ],
    problemCreator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})

const Problem = mongoose.model('problem',problemSchema);
module.exports = Problem;