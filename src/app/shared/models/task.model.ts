export class TaskModel{
    constructor(
        _id:string='',
        name:string,
        description:string,
        state:string,
        user_id:string,
        createdAt:string='',
        updatedAt:string=''
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.state = state;
        this.user_id = user_id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    _id!:string;
    name!:string;
    description!:string;
    state!:string;
    user_id!:string;
    createdAt:string;
    updatedAt:string;
}