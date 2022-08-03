import { DataManager } from "../helpers/dataManager.helper.js";
import { BaseModel } from "./baseModel.model.js";

export class Reservation extends BaseModel{

    customer = "";
    nbPlace = 0;
    seance_id = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }

    getSeance(){
        const seance = DataManager.getOne("seance", this.seance_id);
        return seance;
    }
}