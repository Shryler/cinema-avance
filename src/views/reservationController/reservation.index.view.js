export class ReservationControllerView {
    models = null;
    constructor(models) {
        this.models = models;
        this.importCss();
    }

    importCss = async () => {
        const cssModule = await import('./reservation.index.view.css', {
            assert: { type: "css" },
        });
        document.adoptedStyleSheets = [cssModule.default];
    };


    async render() {

        const { seance, film } = this.models;
        const date = dateConverter(seance.jour);

        function dateConverter(date) {
            let newDate = new Date(date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            return newDate;
        }

        const viewHtml = `
        <br class="pt-5" >
        <div class="card m-auto" style="width: 25rem;">
        <div class="card-body text-center">
        <img src="${film.affiche}" class="card-img-top p-2 border" alt="${film.title}">
        <div class="card-body text-center">
        <h1 class="card-title">${film.title}</h1>
    </div>
        <p>Séance du <strong>${date}</strong> à <strong>${seance.heure}</strong></p>
        <p>Salle n°<strong>${seance.salle_id}</strong></p>
        <form>
            <div class="form-group row">
                <div class="col-12">
                <div class="input-group">
                    <div class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="fa fa-address-card"></i>
                    </div>
                    </div> 
                    <input id="name" name="name" placeholder="Nom" type="text" class="form-control" required="required">
                </div>
                </div>
            </div>
            <div class="form-group row">
                <label for="nbPlace" class="col-4 col-form-label"></label> 
                <div id="selectDiv" class="col-12">
                <select id="nbPlace" name="nbPlace" class="custom-select w-100 border text-center" aria-describedby="nbPlaceHelpBlock" required="required">
                <option value="0">Nombre de place(s)</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                </select>
                </div>
                <span id="emPrice" class="mt-2"></span>
            </div> 
            <div class="form-group row">
                <div class="col-12 mt-3">
                <button id="btnResa" name="submit" type="submit" class="btn btn-danger btn-sm w-100">Réserver</button>
                </div>
            </div>
            </form>
        </div>
        </div>
        `;

        const viewElement = document.createElement("div");
        viewElement.innerHTML = viewHtml;

        const selectDiv = viewElement.querySelector("#nbPlace");
        const emPrice = viewElement.querySelector("#emPrice");
        selectDiv.addEventListener("change", (e) => {
            const newPrice = seance.price * e.target.value;
            
            emPrice.innerHTML = `<span class="mt-2">TOTAL : <strong>${newPrice},00 €</strong></span>`;
            return emPrice;
        });
        
        const btnResa = viewElement.querySelector("#btnResa");
        const inputName = viewElement.querySelector("#name");
        btnResa.addEventListener("click", (e) => {
            e.preventDefault();
            let regexName = new RegExp(/^[^\d]+$/);
            let testName = regexName.test(inputName.value);
            if (testName == false || nbPlace.value == 0){
                console.log("faux");
                alert("Veuillez saisir votre nom correctement et/ou le nombre de place(s)");
            } else {
                console.log("OK ! ça marche");
            }
        })

        return viewElement;
    };
}
