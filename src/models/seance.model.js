import { DataManager } from "../helpers/dataManager.helper";
import { BaseModel } from "./baseModel.model";

export class Seance extends BaseModel{

    jour = "";
    heure = "";
    price = 0;
    film_id = -1;
    salle_id = -1;

    constructor(jsonObj){
        super();
        this.assign(jsonObj);
    }

    getFilm(){
        const film = DataManager.getOne("film", this.film_id);
        return film;
    }

    getSalle(){
        const salle = DataManager.getOne("salle", this.salle_id);
        return salle;
    }

    getReservationList(){
        const reservationList = DataManager.getAll("reservation").filter(reservation => reservation.seance_id == this.id);
        return reservationList;
    }
}