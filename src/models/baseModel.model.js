export class BaseModel{

    id = -1;
    isDeleted = false;

    assign(jsonObj){
        for(const key in jsonObj){ 
            if(!this.hasOwnProperty(key)){
                delete jsonObj[key];
            }
        }
        Object.assign(this, jsonObj);
    }

}