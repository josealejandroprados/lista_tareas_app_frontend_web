export class TaskModel{
    constructor(
        id:string,
        name:string,
        description:string,
        state:string
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.state = state;
    }

    id!:string;
    name!:string;
    description!:string;
    state!:string;
}