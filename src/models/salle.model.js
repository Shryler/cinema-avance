import { DataManager } from "../helpers/dataManager.helper";
import { BaseModel } from "./baseModel.model";

export class Salle extends BaseModel{

    name = "";
    capacity = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }

    getSeanceList(){
        const seanceList = DataManager.getAll("seance").filter(seance => seance.salle_id == this.id);
        return seanceList;
    }
} 