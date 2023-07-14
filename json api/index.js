const titleValue = document.querySelector('.title')
const description = document.querySelector('.description')
const addButton = document.querySelector('.add')

addButton.addEventListener('click', () => {
  fetch("http://localhost:3000/notes", {
    method: 'POST',
    body: JSON.stringify({
      title: titleValue.value,
      description: description.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
})

const container = document.querySelector('.container')
let allValuess = []
fetch('http://localhost:3000/notes')
  .then(jsonVal => jsonVal.json())
  .then(allValues => {
    allValuess.push(allValues)
    // console.log(allValuess)

    for (let i = 0; i < allValues.length; i++) {
      console.log(allValues[i].id)
      console.log(allValues[i].description)
      //here i created all the needed divs and lis
      let mainDiv = document.createElement('div')
      let firstDiv = document.createElement('div')
      let secondDiv = document.createElement('div')
      let thirddDiv = document.createElement('div')
      let thirdmainDiv = document.createElement('div')
      let title = document.createElement('li')
      let description = document.createElement('li')
      let date = document.createElement('li')
      let line = document.createElement('div')
      let more = document.createElement('span')

      //here i added attributes(classess and ids) to needed one
      mainDiv.setAttribute('class', 'notes')
      title.setAttribute('class', 'title')
      description.setAttribute('class', 'description')
      date.setAttribute('class', 'date')
      line.setAttribute('class', 'line')
      more.setAttribute('class', 'moreicon')
      thirddDiv.setAttribute('class', "thirddDiv")
      thirdmainDiv.setAttribute('class', "thirdmainDiv")

      //here i inserted the innertext and src to the needed
      title.innerText = allValues[i].title
      description.innerText = allValues[i].description
      const d = new Date()
      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      date.innerText = `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
      more.innerHTML ='<span class="material-symbols-outlined">more_vert</span>'

      //here i appended all the things into div
      firstDiv.append(title)
      firstDiv.append(description)
      secondDiv.append(line)
      thirddDiv.append(date)
      thirddDiv.append(more)
      mainDiv.append(firstDiv)
      mainDiv.append(secondDiv)
      thirdmainDiv.append(thirddDiv)
      mainDiv.append(thirdmainDiv)
      container.append(mainDiv)

      more.addEventListener('click', () => {
        const moreDiv = document.createElement('div')
        const editBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')
        editBtn.setAttribute('class', "editBtn")
        deleteBtn.setAttribute('class', "deleteBtn")

        editBtn.innerText = "edit"
        deleteBtn.innerText = "delete"

        deleteBtn.value = allValues[i].id
        editBtn.value = allValues[i].id

        moreDiv.append(editBtn)
        moreDiv.append(deleteBtn)
        thirddDiv.append(moreDiv)
        //deleeBtn here i used delete method
        deleteBtn.addEventListener('click', () => {
          fetch(`http://localhost:3000/notes/${deleteBtn.value}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: null
          })
        })
        console.log(allValues[i].description+'wer')

        editBtn.addEventListener('click', () => {
        
          fetch(`http://localhost:3000/notes/${editBtn.value}`)
            .then((response) => response.json())
            .then((json) => console.log(json));

            form.style.display = "block"
            addButton.innerText = "update"
            addButton.classList.add("update")

            titleValue.value = allValues[i].title
            description.value = allValues[i].description

            const updateBtn = document.querySelector('.update')
   
            form.style.display = "block"
            // container.style.filter = "blur(0px)"

            updateBtn.value = allValues[i].id
            updateBtn.addEventListener('click',()=>{
           
              fetch(`http://localhost:3000/notes/${updateBtn.value}`, {
                method: 'PATCH',
                body: JSON.stringify({
                  title: titleValue.value,
                  description: description.value,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((response) => response.json())
                .then((json) => console.log(json));
            })
            })
        })
    }
  })


// here i targeted todo form
const toDo = document.querySelector('.toDo')
const redBtn = document.querySelector('.red')
const form = document.querySelector('.form')

// todo + tasks
toDo.addEventListener('click', (e) => {
  form.style.display = "block"
  container.style.filter = "blur(10px)"
})

let close = document.querySelector("#close")
close.addEventListener('click', () => {
  form.style.display = "none"
  container.style.filter = "blur(0px)"
})