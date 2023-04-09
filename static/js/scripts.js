let myDict = {
    "1": {
      "question": "For what period you need a workout plan?",
      "answers": {
        "1":"day",
        "2":"week",
        "3":"month",
      }
    },
    "2": {
        "question": "What is your fitness level?",
        "answers": {
          "1":"Sedentary",
          "2":"Beginner",
          "3":"Intermediate",
          "4":"Advanced",
        }
    },
    "3": {
        "question": "What is your fitness goal?",
        "answers": {
          "1":"Weight loss",
          "2":"Muscle gain",
          "3":"Stress reduction",
          "4":"Increased Flexibility",
        }
    },
    "4": {
        "question": "What body part you want to focus on?",
        "answers": {
          "1":"Upper body",
          "2":"Lower body",
          "3":"Full body",
          "4":"Any",
        }
    },
    "5": {
        "questions": {
            "1":"How long each day you are willing to train?(in minutes)"
        },
        "names":{
            "1":"wo_time"
        },
        "form_name":"/submit_form_time"
    },
    "6": {
        "questions": {
            "1":"Your height:",
            "2":"Your weight:"
        },
        "names":{
            "1":"height",
            "2":"weight"
        },
        "form_name":"/submit-form-height-weight"
        

    },
  };
let choices_list = []
var res = ""
var question_number = 1
let button_div = document.getElementById("btns_div")
let quest_div = document.getElementById("question_div")
let self_info_container = document.getElementById("self_info_container")
function display_question(){
    button_div.innerHTML = ""
    quest_div.innerHTML = ""
    if (question_number<=4){
        let question_field = document.createElement("p")
        question_field.setAttribute("id","questions")
        question_field.setAttribute("class","main_text")
        
        let question = myDict[question_number.toString()].question;
        question_field.innerHTML = question
        let answers = myDict[question_number.toString()].answers;
        for (let key in answers) {
            let button = document.createElement("button");
            button.addEventListener("click",handleClick)
            button.textContent = answers[key];
            button.setAttribute("id", key);
            button.setAttribute("class", "button");
            button_div.appendChild(button)
        }question_number+=1
            quest_div.appendChild(question_field)
    }
    else if(question_number<=6){
        button_div.remove();
        // quest_div.classList.remove("col-6")

        let btn = document.createElement("button");
        
        btn.setAttribute("type","submit")
        btn.setAttribute("id","submitButton")

        var form = document.createElement('form');
        form.setAttribute("width","100%")
        
        btn.addEventListener('click', function(event) {
            // Prevent the default form submission behavior
            event.preventDefault();
        
            // Make an AJAX request to the server
            var xhr = new XMLHttpRequest();
            xhr.open('POST', myDict[question_number.toString()].form_name);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    if(question_number == 6){
                        let xhr = new XMLHttpRequest();
                        xhr.open("POST", "/mylist");
                        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4 && xhr.status === 200) {
                                console.log(xhr.responseText);
                            }
                        };
                        xhr.send(JSON.stringify(choices_list));
                    }
                    if(question_number==7){
                        var pre = document.createElement('pre');
                        pre.innerHTML = xhr.responseText;
                        pre.classList.add("workout_plan")
                        quest_div.appendChild(pre);
                        quest_div.classList.add("main_text");
                    }
                } else {
                    console.log('Request failed.  Returned status of ' + xhr.status);
                }
            };
            xhr.send(new URLSearchParams(new FormData(form)));

            question_number+=1
            display_question()
        });
        form.setAttribute("display","flex")
        form.setAttribute('method', 'POST');
        form.setAttribute('action', myDict[question_number.toString()].form_name);
        
        let questions = myDict[question_number.toString()].questions;
        let names = myDict[question_number.toString()].names;

        quest_div.classList.remove("col-6")
        quest_div.setAttribute("width","100%")
        self_info_container.setAttribute("align-items","center")

        count = 1
        for(let key in questions){
            let form_label = document.createElement("label");
            let form_input = document.createElement("input");
            
            form_label.setAttribute("for",names[count.toString()])
            form_label.innerHTML = questions[key]
            form_label.setAttribute("class","main_text")
            
            form_input.setAttribute("type","number")
            form_input.setAttribute("min","5")
            form_input.setAttribute("max","150")
            form_input.setAttribute("name",names[count.toString()])
            
            form.appendChild(form_label)
            form.appendChild(form_input)
            quest_div.appendChild(form)
            count++
        }
        form.appendChild(btn)   
    } 
}
function handleClick(event) {
    const buttonText = event.target.textContent;
    console.log(`Button ${buttonText} was clicked`);
    choices_list.push(buttonText)
  }
button_div.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName == "BUTTON") {
        display_question()
    }
  });
      

var button = document.getElementById("hellotxt");
button.addEventListener("click", animation_to_main_page);

function number_generator() {
    let n = -1;
    return {
      next: function() {
        n += 1;
        return {value:n};
      }
    };
  }

function texting_effect(x,word,relative_time,delay) {
    const n = number_generator();
    let len = word.length 
    var interval_name = setInterval(function(){
        if(relative_time<=rel_time){
            x.textContent+=word[n.next().value];
            rel_time+=60
            if(x.textContent.length>=len){
                clearInterval(interval_name)
            }
        }
    },delay)
}

function deleting_effect(id_of_element,delay){
    var txt = document.getElementById(id_of_element).textContent;
    var duration = txt.length
        i=0;
        interval = setInterval(function(){
        txt = txt.slice(0,-1);
        document.getElementById(id_of_element).textContent = txt
        i++;
        if (i>=duration){
            document.getElementById(id_of_element).remove();
            clearInterval(interval);
        }},delay)
}

function animation_to_main_page() {
    deleting_effect("hellotxt",60)
    document.getElementById("self_info_container").style.display = "flex"

    rel_time = 0;
    const words = ["Portfolio","About","Name","Shop","Contact","Cart"]
    const time_stamp = [0,320,360,720,1440,1680,0] //поиграться с параметрами позже
    const width = ['93px','55px','113px','46px','74px','46px']

    for(let i = 0; i<words.length-1;i++){
        var x = document.getElementById(words[i]);
        x.style.width = width[i];}
    for(let i = 0; i<words.length;i++){
        var x = document.getElementById(words[i])
        if(i==2){
            texting_effect(x,"GETFIT",time_stamp[i],60)
        }
        else{
            texting_effect(x,words[i],time_stamp[i],60)
        }
    }

    display_question()
}

function edit_effect(x){
    j=0
    edit_effect_interval = setInterval(function(){
        console.log(x.innerHTML)
        if(j==0){
            x.innerHTML += "_";j++;
            x.style.paddingRight = "0px";
        }
        else{
            x.innerHTML = x.innerHTML.slice(0,-1);j--;
            x.style.paddingRight = "9px";
        }
    },500)
}

function clear_edit_effect(x){
    let txt = x.textContent
    if(txt.substring(txt.length - 1)=='_'){
        x.textContent = x.textContent.slice(0,-1);
        x.style.paddingRight = "9px";
    }
    clearInterval(edit_effect_interval);
}
