import { DataManager } from '../helpers/dataManager.helper';
// import { Reservation } from '../models/reservation.model';

export class ReservationController {

    index = async (params) => {
        const id = params[0];
        const seance = DataManager.getOne("seance", id);
        const film = seance.getFilm();
        if(!id || !seance){ 
            location.href = '/error';
        }

        const {ReservationControllerView} = await import('../views/reservationController/reservation.index.view.js');
        const view = new ReservationControllerView({seance, film});
        return view.render();
    }
}