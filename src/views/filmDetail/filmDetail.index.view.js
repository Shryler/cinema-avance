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
      });
      return newDate;
    }
    
    const sortedSeances = seances.sort((s1, s2) => s1.heure < s2.heure ? -1 : 1).sort((s1,s2) => s1.jour < s2.jour ? -1 : 1);

    const resaLinks = sortedSeances.map((seance) => {
      const date = dateConverter(seance.jour);
      return `
        <a href="/reservation/${seance.id}" class="btn btn-danger mb-2 spa-link">Le ${date} à ${seance.heure}</a>
        `;
    }).join('');

    const viewHtml =  `
        <div class="card m-auto mt-5 pt-2 d-flex flex-sm-row flex-wrap align-items-center container">
            <img src="${film.affiche}" class="card-img-top p-2 border w-50" alt="${film.title}">
            <div class="card-body text-center w-50">
                <h5 class="card-title">${film.title}</h5>
                <p class="card-text">${film.synopsis}</p>
            </div>
            <div class="card-body text-center w-100">
            ${resaLinks}
            </div>
            </div>
        </div>
              `;
              const viewElement = document.createElement("div");
              viewElement.innerHTML = viewHtml;
              return viewElement;
  };
}
