'use strict';
/*
MODAL
*/
// SECTION 1 EVENTS
{const selectorOuter = document.querySelector('.selector--outer');
const selectorInner = document.querySelector('.selector--inner');
const overLay = document.querySelector('.selector__overlay');
const closeModal = document.querySelector('.selector__close');
const options = document.querySelectorAll('.option');

let selectedValue = selectorInner.firstElementChild;






const exitModal = () => {
    
    if (selectedValue.textContent !== 'Select category & subcategory') {
        selectorOuter.firstElementChild.textContent = selectedValue.textContent;
    }else{
        const checked = document.querySelector('input[name="jobCategory"]:checked');
        
        if (checked) {
            selectorOuter.firstElementChild.textContent = checked.nextElementSibling.nextElementSibling.textContent;
        }else{
            const [subRadio] = Array.from(document.querySelectorAll('.selector__radio'));
            subRadio.checked = true;
        }
    }

    
    overLay.classList.add('hidden');
};


selectorInner.addEventListener('click', () =>{
    overLay.querySelector('.option-container').classList.toggle('option-container--open');
});

document.querySelectorAll('.selector__radio-btn').forEach(radio => {
    radio.addEventListener('click',()=>{
      selectedValue.textContent = 'Select category & subcategory';

    })
})

options.forEach(opt => {
    opt.addEventListener('click',()=>{
        let checked = overLay.querySelector('input[name="jobCategory"]:checked');
        if (checked) {
            checked.checked = false;
        }

        selectedValue.textContent = opt.textContent;
        overLay.querySelector('.option-container').classList.remove('option-container--open');
        exitModal();
    })
})





selectorOuter.addEventListener('click',() => overLay.classList.remove('hidden'));
closeModal.addEventListener('click', exitModal);
}








// TOGGLING FORM SECTIONS

{
    let index = 0;
    const progress = Array.from(document.querySelectorAll('.tip'));
    const sections = Array.from(document.querySelectorAll('.JPform__part'));
    const nextButtons = document.querySelectorAll('.JPform__btn--next');
    const prevButtons = document.querySelectorAll('.JPform__btn--prev');
    
    const nextSection = function(){
        changeView('next');
    }

    const prevSection = function(){
        changeView('prev');
    }
    
    const changeView = direction =>{
        let currentActive = 0;
        const active = document.querySelector('.JPform__part.JPform__part--active');
        currentActive = sections.indexOf(active);
        active.classList.remove('JPform__part--active');

        if (direction === 'next'){
            (currentActive !== sections.length -1) && currentActive++;

        }else if (direction === 'prev'){
            currentActive--;
        }

        sections[currentActive].classList.add('JPform__part--active');
        changeTip(currentActive);

    }

    const changeTip = index =>{
        let currentActive=0;
        const active = document.querySelector('.tip.tip--active');
        currentActive = progress.indexOf(active);
        active.classList.remove('tip--active');

        progress.forEach((tip,idx) =>{
            if (idx < index) {
                tip.classList.add('tip--done');
            }else if(idx > index){
                tip.classList.remove('tip--done');
            }
        })

        progress[index].classList.add('tip--active');

    }

    nextButtons.forEach(button => button.addEventListener('click', nextSection));
    prevButtons.forEach(button => button.addEventListener('click', prevSection));


    
}


// SECTION 2 EVENTS
{

    const descArea = document.querySelector('#desc-area');
    descArea.addEventListener('input',()=>{
        let descAreaLength = descArea.value.length;
        document.querySelector('#counter').textContent = `${descAreaLength}/5000 characters (minimum 50)`;
    })

}


// SECTION 4 EVENTS
{
    const skills = ["JavaScript", "Adobe Photoshop","HTML5","Angular JS","CSS", "MySql Administration","jQuery","Web Design","PHP","Kando UI", "WordPress", "Graphic Design",  "Node JS", "Bootstrap", "Python","MySql Programming", "React js", "Vue js"];

    const skillContainer = document.querySelector('.customCheck-group');

    let html = `<div class="customCheck %size%" id="customCheck-%idx%"><input type="checkbox" class="customCheck__input" name="skillSelect" id="check-%idx%" value="%skill%" hidden><label for="check-%idx%" class="customCheck__label"><span>%skill%</span></label></div>`;

    skills.forEach((skill ,index) => {
        populateView(html,index,skill);
    });

    function populateView(htmlText, index, skill){
        let isLongString = (skill.length > 10) && skill.indexOf(' ') >= 0;
        let newHtml = htmlText.replaceAll("%idx%",index);

        newHtml = newHtml.replaceAll("%skill%",skill);
        newHtml = isLongString ? newHtml.replace("%size%","grid-long") : newHtml.replace("%size%","grid-default");
        skillContainer.insertAdjacentHTML("beforeend",newHtml);
    }

    class Skill{
        constructor(ID, text){
            this.ID = ID;
            this.text = text;
        }
    }

    const addSkillBtn = document.querySelector('.customCheck__addBtn');
    const addSkillInput = document.querySelector('.customCheck__addInput');
    const customSkills = [];
    let customHtml = `<div class="customCheck  %size%" id="customCheck-%idx%"><input type="checkbox" class="customCheck__input" name="skillSelect" id="check-%idx%" value="%skill%" hidden><label class="customCheck__label"><span>%skill%</span><button class="customCheck__iconBtn" type="button"><svg class="customCheck__icon"><use xlink:href="/images/sprite.svg#icon-circle-with-plus"></use></svg></button></label></div>`;
    


    function addSkill(){
        const skillInpVal = addSkillInput.value;
        if (skillInpVal.length > 0) {
            addSkillModel(skillInpVal);
            addSkillView(skillInpVal);
        }

        addSkillInput.value = '';
    }

    function addSkillModel(text){
        let id = 0;
        if (customSkills.length > 0) {
          id = customSkills[customSkills.length -1].ID + 1;
        }
        customSkills.push(new Skill(id, text));
    }
    
    function getViewSkillID(){
        let skills = skillContainer.querySelectorAll('.customCheck');
        const lastSkillID = skills[skills.length -1].id;
        let [,id] = lastSkillID.split('-');
        id = Number(id)+1;

        return id;
    }

    function addSkillView(text){
       let id = getViewSkillID();

        populateView(customHtml,id,text);

        const skills = skillContainer.querySelectorAll('.customCheck');
        const lastSkill = skills[skills.length -1];
        lastSkill.firstElementChild.checked = true;
        
    }
    function removeSkillModel(ID){
        const [,id] = ID.split('-');
        const index = Number(id - skills.length);
        const skillGotten = customSkills[index];
        const skillGottenIndex = customSkills.indexOf(skillGotten);
        customSkills.splice(skillGottenIndex,1);

    }
        
        
     
    function removeSkill(e){
        if(e.target.classList.contains('customCheck__icon')){
            const element = e.target.parentNode.parentNode.parentNode;
            const parent = element.parentNode;
            const elementID = element.id;
            parent.removeChild(element);
            removeSkillModel(elementID);
        }
    }
    
    addSkillBtn.addEventListener('click',addSkill);
    addSkillInput.addEventListener('keypress',e=>{e.key==='Enter' && addSkill()});
    skillContainer.addEventListener('click', removeSkill);


}


// SECTION 6 EVENTS
{
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const payPerHour = document.querySelectorAll('.pay-per-hour');
    const payFixedPrice = document.querySelector('.pay-fixed-price');
    paymentMethods.forEach(paymentMethod => {
        paymentMethod.addEventListener('change',()=>{
            let ID = paymentMethod.id; 
           switch(ID){
               case "cr15":
                  payPerHour.forEach(PPH => {PPH.classList.remove('hidden')});
                  payFixedPrice.classList.add('hidden');
                   break;
                case  "cr16":
                    payPerHour.forEach(PPH => {PPH.classList.add('hidden')});
                    payFixedPrice.classList.remove('hidden');
                  break;
           }

        })
    })
}

// SECTION REVIEW EVENTS
{

    // let title, jobCategory, description, projType, expertise, jobVisibility, 
    // lancersNeeded, paymentType, lancerExpertise, projLife;
    
   const btns = document.querySelectorAll('.JPform__btn--next');
   let dataReview = null;
   const allReviewDesc = document.querySelectorAll('.revBox__desc');

   btns[btns.length -1].addEventListener('click',() => {
       
    const title = document.querySelector('.jp_name').value;
    
    const jobCategory = document.querySelector('.selector--outer').firstElementChild.textContent;
    
    const description =  document.querySelector('.jp_desc').value;
 
    const projType  = document.querySelector('input[name="projectType"]:checked')?.value;
 
    const projStage = document.querySelector('input[name="projectStage"]:checked')?.value;
 
    const skills = Array.from(
        document.querySelectorAll('input[name="skillSelect"]:checked'))
        .map(cur => cur.value);
 
    const jobVisibility = document.querySelector('input[name="jobVisibility"]:checked')?.value;
 
    const freeLancersNeeded = document.querySelector('input[name="freelancerNumber"]:checked')?.value;
    
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
 
    const lancerExperience = document.querySelector('input[name="freelancerExperience"]:checked')?.value;
 
    const projectLife = document.querySelector('input[name="timeExpectation"]:checked')?.value;

     dataReview = {
        project: {
            title : {
                name: title,
                category: jobCategory
            },
            description : description,
            type: projType,
            stage: projStage,
            timeExpectation: projectLife,
            visibility:{
                visibleTo: jobVisibility,
            }
        },
        lancer:{
            experience : lancerExperience,
            skills: skills,
            number: freeLancersNeeded
            
        },
        paymentMethod:{
            type:paymentMethod
        }
     }

     allReviewDesc[0].textContent = dataReview.project.title.name;
     allReviewDesc[1].textContent = dataReview.project.title.category;
     allReviewDesc[2].textContent = dataReview.project.description;
     allReviewDesc[3].textContent = dataReview.project.type;
     allReviewDesc[4].textContent = dataReview.project.stage;
    dataReview.lancer.skills.forEach(skill =>{
        allReviewDesc[5].insertAdjacentHTML("afterbegin",`<li>${skill}</li>`)
     });

     allReviewDesc[6].textContent = dataReview.project.visibility.visibleTo;
     allReviewDesc[7].textContent = dataReview.lancer.number;
     allReviewDesc[8].textContent = dataReview.paymentMethod.type;
     allReviewDesc[9].textContent = dataReview.lancer.experience;
     allReviewDesc[10].textContent = dataReview.project.timeExpectation;
   })




}