'use strict'
const model = (function(){
   class MyFile {
        constructor(id, fileName, file){
            this.id = id;
            this.fileName = fileName;
            this.file = file;
        }
   }

   const data = {
       files : []
   }


    return{

        getData : () => data.files.length,

        addFile : (file)=> {
            let newItem, ID;
            if(data.files.length > 0){
                ID = data.files[data.files.length -1].id+1; 
            }else{
                ID = 0;
            }

            newItem = new MyFile(ID,file.name,file);
            data.files.push(newItem);
            return newItem;

        },

        deleteFile: id => {
            let ids = data.files.map(cur => cur.id);
            let index = ids.indexOf(id);


            if(index !== -1) {
                data.files.splice(index,1);
            }
        }
    }
})();
const view = (function(){
    var DOMstrings = {
        input : ".inputFile",
        container:".file-navigation",
        main_container:".drop-zone"

    }    

    return{
        getDomStrings : () => DOMstrings,
        addDragActive: () =>{
            document.querySelector(DOMstrings.main_container).classList.add('active');
        },
        addDragInactive: () =>{
            document.querySelector(DOMstrings.main_container).classList.remove('active');
        },

        addViewFile : obj => {
            let element = DOMstrings.container;
            let html = '<figure class="file" id="file-%id%"><figcaption class="file__name">%fileName%</figcaption><button type="button" class="button" title="delete file"><svg class="button__icon"><use xlink:href="../images/sprite.svg#icon-upload-to-cloud"></use></svg></button></figure>';

            let newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%fileName%',obj.fileName);
            
            document.querySelector(element).insertAdjacentHTML('afterbegin',newHtml);
            
        },

        deleteFile: (fileID)=>{
            const el = document.getElementById(fileID);
            el.parentNode.removeChild(el);
        }
    }
})();

const ctrl = (function(Model, View){

    function setUpEventListeners(){
        var DOM = View.getDomStrings();
        document.querySelector(DOM.input).addEventListener('change',ctrlAddItem);
        document.querySelector(DOM.container).addEventListener('click',ctrlDelItem);
        document.querySelector(DOM.main_container).addEventListener('dragover',addDragActive);
        document.querySelector(DOM.main_container).addEventListener('drop',ctrlDropAddItem);
    }

    const addDragActive = function(e){
        e.preventDefault();
        View.addDragActive();
    }
    const addDragInactive = function(){
        View.addDragInactive();
    }

    const ctrlDropAddItem = function(e){
        e.preventDefault();
        const file =e.dataTransfer.files[0];

        let fileReader = new FileReader();
 
        fileReader.onload = () => {
            let obj = Model.addFile(file);
            View.addViewFile(obj);
        }
        fileReader.readAsDataURL(file);
    }

    const ctrlAddItem = function(e){
       const file = this.files[0];

       let fileReader = new FileReader();
       const validFileTypes = ["application/pdf"];

       if (validFileTypes.includes(file.type)) {
           fileReader.onload = () => {
               let obj = Model.addFile(file);
               View.addViewFile(obj);
           }
           fileReader.readAsDataURL(file);
           View.addDragActive();
           console.log(file.type);
       }

    }

    const ctrlDelItem = function(e){
        
        const itemId = e.target.parentNode.parentNode.id;
        if (itemId) {
            const splitID = itemId.split('-');
            const ID = Number(splitID[1]);
            Model.deleteFile(ID);
            View.deleteFile(itemId);

            if (Model.getData() === 0) {
                View.addDragInactive();
            }

        }
    }

    return{
        init : function(){
            setUpEventListeners();
        }
    }
})(model,view);

ctrl.init();