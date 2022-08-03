import { DataManager } from "../helpers/dataManager.helper.js";
import { BaseModel } from "./baseModel.model.js";

export class Film extends BaseModel{

    title = "";
    affiche = "";
    synopsis = "";

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }

    getSeanceList(){
        const seanceList = DataManager.getAll("seance").filter(seance => seance.film_id == this.id);
        return seanceList;
    }

}