export class FilmDetailIndexView {
  models = null;
  constructor(models) {
    this.models = models;
    this.importCss();
  }

  importCss = async () => {
    const cssModule = await import("./filmDetail.index.view.css", {
      assert: { type: "css" },
    });
    document.adoptedStyleSheets = [cssModule.default];
  };

  render = () => {

    const { film, seances } = this.models;

    function dateConverter(date) {
      let newDate = new Date(date).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      });
      return newDate;
    }

    const sortedSeances = seances.sort((s1, s2) => s1.heure < s2.heure ? -1 : 1).sort((s1,s2) => s1.jour < s2.jour ? -1 : 1);

    let memory = "2022-08-01";
    
    const resaLinks = sortedSeances.map((seance) => {
      const date = dateConverter(seance.jour);
          if(memory !== seance.jour){
            memory = seance.jour;
            return `
            <br>
            </div>
            <div class="horaires">
            <h4>${date}</h4>
            <a href="/reservation/${seance.id}" class="btn btn-danger mb-2 spa-link">${seance.heure}</a>
            `
          }
          return `
          <a href="/reservation/${seance.id}" class="btn btn-danger mb-2 spa-link">${seance.heure}</a>
            `;
    }).join('');

    const viewHtml =  `
        <div class="card m-auto p-2 d-flex flex-sm-row flex-wrap align-items-center container">
            <img src="${film.affiche}" class="card-img-top p-2 border w-50" alt="${film.title}">
            <div class="card-body text-center w-50">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">${film.synopsis}</p>
            </div>
            <div class="d-flex flex-wrap w-100">
            <div class="horaires">
            <h4>lundi 1 août 2022</h4>
            ${resaLinks}
            </div>
            </div>
            </div>
        </div>
              `;
              const viewElement = document.createElement("div");
              viewElement.innerHTML = viewHtml;
              return viewElement;
  };
}
