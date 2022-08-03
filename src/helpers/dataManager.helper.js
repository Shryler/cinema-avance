import * as Models from "../models/index";

export class DataManager {
  
  static folder = "data";
  static files = [];

  static initDataStorage = async (folder = "data") => {
    for(const modelName in Models){
      DataManager.files.push(modelName.toLowerCase());
    }
    DataManager.folder = folder;
    const dataStorage = {};
    for (const file of DataManager.files) {
      dataStorage[file] = await DataManager.readJsonFile(file);
    }
    localStorage.setItem("data-cinema", JSON.stringify(dataStorage));
  };

  static readJsonFile = async (fileName) => {
    let jsonDataArray = [];
    await fetch(`./src/${DataManager.folder}/${fileName}.json`)
      .then((resp) => {
        return resp.text();
      })
      .then((text) => {
        jsonDataArray = JSON.parse(text);
      });
    return jsonDataArray;
  };

  static getJsonDataTable = (tableName) => {
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    return allData[tableName];
  };

  static getModelClass = (tableName) => {
    const modelName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
    return Models[modelName];
  };

  static getAll = (tableName, withDeletedRows = false) => {
    let jsonDataTable = DataManager.getJsonDataTable(tableName);
    if(!withDeletedRows){
      jsonDataTable = jsonDataTable.filter(item => !item.isDeleted)
    }
    return jsonDataTable.map((row) => {
        return new (DataManager.getModelClass(tableName))(row);
    });
  };

  static getOne = (tableName, id, whereIsDeleted = false) => {
    const jsonRow = DataManager.getJsonDataTable(tableName).find((item) => item.id == id);
    if(!jsonRow || !whereIsDeleted && jsonRow.isDeleted){
      return;
    }
    return new (DataManager.getModelClass(tableName))(jsonRow);
  };

  // insertOne = (model) => {
  //   const tableName = model.constructor.name.toLowerCase();
  //   const allData = JSON.parse(localStorage.getItem("data-cinema"));
  //   const jsonDataTable = allData[tableName];
  //   const nextId = Math.max(...jsonDataTable.map((obj) => obj.id)) + 1;
  //   model.id = nextId;
  //   jsonDataTable.push(model);
  //   localStorage.setItem('data-cinema', JSON.stringify(allData));
  // };

  static insert = (...modelsArray) => {
    const tableName = modelsArray[0]?.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    let nextId = Math.max(...jsonDataTable.map((obj) => obj.id)) + 1;
    for(const model of modelsArray){
      model.id = nextId++;
      jsonDataTable.push(model);
    }
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  // updateOne = (model) => {
  //   const tableName = model.constructor.name.toLowerCase();
  //   const allData = JSON.parse(localStorage.getItem("data-cinema"));
  //   const jsonDataTable = allData[tableName];
  //   let row = jsonDataTable?.find((item) => item.id == model.id);
  //   Object.assign(row, model);
  //   localStorage.setItem('data-cinema', JSON.stringify(allData));
  // };

  static update = (...modelsArray) => {
    const tableName = modelsArray[0]?.constructor.name.toLowerCase();
    const allData = JSON.parse(localStorage.getItem("data-cinema"));
    const jsonDataTable = allData[tableName];
    for(const model of modelsArray){
      let row = jsonDataTable?.find((item) => item.id == model.id);
      Object.assign(row, model);
    }
    localStorage.setItem('data-cinema', JSON.stringify(allData));
  };

  // deleteOne = (model) => {
  //   model.isDeleted = true;
  //   DataManager.updateOne(model);
  // };

  static delete = (...modelsArray) => {
    for(const model of modelsArray){
      model.isDeleted = true;
    }
    DataManager.update(...modelsArray)
  };

}
