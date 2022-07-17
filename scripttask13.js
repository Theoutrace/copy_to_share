// step 1
//to target whole form
const form = document.getElementById('my-form')
//step 2
//to target whole input tag ehich is collecting name /// we do a .value to this to get value inside the inputbox of name 
const name = document.getElementById('name')
//step 3
//same as step 2 for email.
const email = document.getElementById ('email')
//step 4 
//target submit button
const button = document.getElementById('form-button')
// console.log(name);

// step 21
//we need the content in the local storage to be loaded in the frontend 
//when we open the application and window gets loaded

document.addEventListener('DOMContentLoaded', function(){
    console.log('windows loaded');                             //working
    //step 22
    //

})

//step 5 
//use form button to submit details in the form //
//we use eventlistener
//we define when to do and where to do


// when to do -> when button is clicked, where to do -> on function //
button.addEventListener('click', onsubmit)

function onsubmit(e){
    e.preventDefault()
    //what to do after function 'onsubmit' gets called is wrtten under this //
    // console.log('submitted'); // working

    //step 6
    //creating a combined object for saving as a value of key being its email, after making it as a string we will save in local //
    obj = {
        'name': name.value,
        'email':email.value
    }
    // console.log(obj.name);
    ///////////////////////////////////////////////
    // step 9
    // Because we need to store multiple user's date, we have to take email as a key which will keep on changing with different users //
    // now, bec. localStorage can store data in the form of stings and not objects, we need to convert our object to a string 
    // and save it as a value for the email provided in the local, keeping email as a key too.

    // we stringify the object and save it in a variable
    let stringfiedDetails = JSON.stringify(obj)
    // console.log(stringfiedDetails);

    //now we put this stringified data as values for each email provided which will be saved in the local.
    ///////////////////////////////////////////////


    ///////////////////////////////////////////////
    // step 10
    //create elemets to show these datas which we got after checking from the localStorage //
    const innerDiv = document.createElement('div')
    const nameContainerH4 = document.createElement('h4')
    const emailContainerH4 = document.createElement('h4')

    // step 11
    // Assigning ids and classes to each elements created //
    innerDiv.classList.add('single-item')    //we dont need to provide classes to h4

    //step 12
    // creating buttons Edit and Delete 
    const editButton = document.createElement('button')
    const deleteButton = document.createElement('button')

    //step 13
    // assignig classes and ids to the buttons created in step 12 //
    editButton.classList.add('editBtn')
    deleteButton.classList.add('deleteBtn')

    // step 13 (a)
    //Inner html of buttons
    editButton.innerHTML = 'Edit'
    deleteButton.innerHTML = 'Delete'

    // step 13 (b)
    //Add class to the email
    emailContainerH4.classList.add('email-h4-class')

    // step 14
    // we need to select the parent elements of the elements created
    const parentDiv = document.getElementById('div-containing-items')
    parentDiv.appendChild(innerDiv)

    // step 15
    //assignig values of name and email to be printed in the frontend
    nameContainerH4.innerHTML = name.value
    emailContainerH4.innerHTML = email.value

    //now we need to append all items in the innerDiv and assign function to each
    // we can do this in forEach of allKeysInLocalStorage of step 7 /// 
    //////////////////////////////////////////////
    //now we need to check of the inserted email is already present in the localStorage
    //if not present then we will insert the email in the local and append the values in front end.
    //if present -> we will update the localStorage and delete the old values in frontend and print the newone.

    //step 6
    //assigning value of current email to a variable to check in localStorage using for each 
    let checkEmail = email.value
    // console.log(checkEmail);

    //step 7
    //iterate through all keys in localStorage
    let allKeysInLocalStorage = Object.keys(localStorage)
    // allKeysInLocalStorage is the array of all keys present in local
    // console.log(allKeysInLocalStorage);                //gives array of keys present, keys are emails here
    if(allKeysInLocalStorage.length >0){
        allKeysInLocalStorage.forEach(function(key){
            // console.log(key);                          //gives email
            if (checkEmail == key){
                // console.log('yes it key was present and we need to delete previous div from frontend in step 17')                  //working
                //step 8 (b)
                //we update the value of the email
                //we need to update the frontend data from here <---replace old data with newone by deleting old & appending new----

                /////////////////////////////////////////////////////////////
                // step 17
                //delete by targetting the div with email in it //
                const Duplicate_Data = document.querySelectorAll('.email-h4-class')
                // console.log(Duplicate_Data);
                for(i=0; i<Duplicate_Data.length; i++ ) {
                    // console.log(Duplicate_Data[i].innerHTML);
                    // console.log(checkEmail);
                    if(Duplicate_Data[i].innerHTML == checkEmail){
                        // console.log(Duplicate_Data[i]);
                        const parentDiv = Duplicate_Data[i].parentElement
                        // console.log(parentDiv);
                        parentDiv.remove()
                    } 
                }

                ///////////////////////////////////////////////////////////////
                //step 16 (a)
                //appending values in respective cases
                innerDiv.appendChild(nameContainerH4)
                innerDiv.appendChild(emailContainerH4)
                innerDiv.appendChild(editButton)
                innerDiv.appendChild(deleteButton)
                localStorage.setItem(checkEmail,stringfiedDetails)
            }else{
                // step 16 (b)
                innerDiv.appendChild(nameContainerH4)
                innerDiv.appendChild(emailContainerH4)
                innerDiv.appendChild(editButton)
                innerDiv.appendChild(deleteButton)
                //step 8 (c)
                // console.log('no');
                localStorage.setItem(checkEmail,stringfiedDetails)
            }
        })
    }else{
        // step 16 (c)
        innerDiv.appendChild(nameContainerH4)
        innerDiv.appendChild(emailContainerH4)
        innerDiv.appendChild(editButton)
        innerDiv.appendChild(deleteButton)
        //step 8 (a)
        //if length of the array of keys from local is 0. add the data in it and print in frontend
        localStorage.setItem(checkEmail,stringfiedDetails)
    }

    //step 20
    // making input field empty for other users to input data again
    name.value = ''
    email.value = ''


    //step 18
    //targeting delete btn if every div //

    deleteButton.addEventListener('click', function(){
        // console.log('clicked');              //working
        
        //step 18 (a)
        //remove the div from local storage
        // step 18(a) -> (1)
        // get the email part out of the html in the div to target the values in the local storage
        const targetElementEmailThroughEditBtn = deleteButton.previousSibling
        // console.log('targetElementEmailThroughEditBtn',targetElementEmailThroughEditBtn);       //will give us edit button
        const targetKeyEmailElement = targetElementEmailThroughEditBtn.previousSibling
        // console.log(targetKeyEmailElement);
        // we need to fetch inner html for the value of key
        // console.log(targetKeyEmailElement.innerHTML);
        const targetElemetInnerHtml = targetKeyEmailElement.innerHTML
        //now perform step 18 (a) -> (2)

        // step 18(a) -> (2)
        //remove the key:value pair from local storage
        localStorage.removeItem(targetElemetInnerHtml)

        //step 18 (b)
        // target the parent div of this delete button
        const parent_div_of_this_delete_button = deleteButton.parentElement
        // console.log(parent_div_of_this_delete_button);         //working

        //remove the div from the frontend
        parent_div_of_this_delete_button.remove()

        

    })

    //step 19
    //target edit button and fetch->insert in input box -> delete from frontend ->delete from local
    editButton.addEventListener('click', function(){
        // console.log('clicked Edit');
        //step 19 (a)
        //fetch inner html of name and email elements and assign to a variable
        //create 2 variables to target name and email elemets respectively
        const nameElement = editButton.previousSibling.previousSibling
        // console.log(nameElement);
        const emailElement = editButton.previousSibling
        // console.log(emailElement);

        //fetching value of name and email
        const nameElementInnerHtml = nameElement.innerHTML         
        // console.log(nameElementInnerHtml);
        const emailElementInnerHtml = emailElement.innerHTML
        // console.log('emailElementInnerHtml',emailElementInnerHtml);

        //step 19 (b)
        //insert values in the input box respectively
        //step 19 (b) ->(1)
        //target input box of name and email and assign to a variable
        const nameInputBox = document.getElementById('name')
        const emailInputBox = document.getElementById('email')

        //step 19 (b) ->(2)
        //we inser the calues if respective name and email in the input box
        nameInputBox.value = nameElementInnerHtml
        emailInputBox.value = emailElementInnerHtml

        // step (19) -> (3)
        //delete from local targetting the email as a key from 'step 19(a)'  //
        localStorage.removeItem(emailElementInnerHtml)

        //step (19) -> (4)
        //delete the div constaining the edit button which was click
        const targetButtonParent=editButton.parentElement
        // console.log(targetButtonParent);
        targetButtonParent.remove()
        ////////=================== step 21 is to load previous data in local storage ==============================
        

    })



}






