export class TaskModel{
    constructor(
        _id:string,
        name:string,
        description:string,
        state:string,
        createdAt:string,
        updatedAt:string
    ){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.state = state;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    _id!:string;
    name!:string;
    description!:string;
    state!:string;
    createdAt!:string;
    updatedAt!:string;
}