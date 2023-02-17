/**
 * You might want to use this template to display each new characters
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#examples
 * 
 */

const characterApi = axios.create({
  baseURL: 'http://localhost:5005/api/characters/',
})
const myUrl = 'http://localhost:5005/api/'


const characterTemplate = document.getElementById('template')
const charactersContainer = document.querySelector(".characters-container")
const nameInput = document.querySelector("[name=character-name]");

const deleteInput = document.querySelector("[name=character-id-delete]");
const deleteBtn = document.getElementById("delete-one")

const addForm = document.querySelector("#new-character-form");
const addNameInput = addForm.querySelector("[name=name]");
const addOccupationInput = addForm.querySelector("[name=occupation]");
const addWeaponInput = addForm.querySelector("[name=weapon]");
const addCartoonInput = addForm.querySelector("[name=cartoon]");

const updateForm = document.querySelector("#edit-character-form");
const updateIdInput = updateForm.querySelector("[name=chr-id]");
const updateNameInput = updateForm.querySelector("[name=name]");
const updateOccupationInput = updateForm.querySelector("[name=occupation]");
const updateWeaponInput = updateForm.querySelector("[name=weapon]");
const updateCartoonInput = updateForm.querySelector("[name=cartoon]");
const updateBtn = updateForm.querySelector("#send-data")




function createCharacter(character) {
  const clone = characterTemplate.content.cloneNode(true)
  clone.querySelector('.character-id span').textContent = character._id
  clone.querySelector('.name span').textContent = character.name
  clone.querySelector('.occupation span').textContent = character.occupation
  clone.querySelector('.cartoon span').textContent = character.cartoon
  clone.querySelector('.weapon span').textContent = character.weapon

  charactersContainer.append(clone)
}


document.getElementById('fetch-all').addEventListener('click', async function fetchAll(event) {
  charactersContainer.innerHTML = ''
  try {
    const { data } = await axios.get(`${myUrl}characters`)
    for (const character of data) {
      createCharacter(character)
    }
  } catch (error) {
    console.error(error)
  }
});

document.getElementById('fetch-one').addEventListener('click', async function (event) {
  charactersContainer.innerHTML = ''
  try {
    const { data } = await axios.get(`${myUrl}characters/${nameInput.value}`)
    createCharacter(data)

  } catch (error) {
    console.error(error)
  }
});

document.getElementById('delete-one').addEventListener('click', async function (event) {
  charactersContainer.innerHTML = ''
  try {
    const message = await axios.delete(`${myUrl}characters/${deleteInput.value}`)
    console.log(deleteBtn)
    deleteBtn.style.backgroundColor = "green";
    setTimeout(() => {
      deleteBtn.style.backgroundColor = null;
    }, 1000);
    await fetchAll()

  } catch (error) {
    console.error(error)
    deleteBtn.style.backgroundColor = "green";

  }
});

updateForm.addEventListener('submit', async function (event) {
  charactersContainer.innerHTML = ''
  event.preventDefault()
  try {
    const toUpdateCharacter = {
      name: updateNameInput.value,
      occupation: updateOccupationInput.value,
      weapon: updateWeaponInput.value,
      cartoon: updateCartoonInput.checked
    }
    const response = await axios({
      method: 'patch',
      url: `${myUrl}characters/${updateIdInput.value}`,
      data: toUpdateCharacter
    });

    const updatedCharacter = response.data;
    updateBtn.style.backgroundColor = "green";
    setTimeout(() => {
      updateBtn.style.backgroundColor = null;
    }, 1000);
  } catch (error) {
    console.error(error)
    updateBtn.style.backgroundColor = "green";


  }
});

addForm.addEventListener('submit', async function (event) {
  charactersContainer.innerHTML = ''
  event.preventDefault()
  try {
    const newCharacter = {
      name: addNameInput.value,
      occupation: addOccupationInput.value,
      weapon: addWeaponInput.value,
      cartoon: addCartoonInput.checked
    }
    const response = await axios({
      method: 'post',
      url: `${myUrl}characters/`,
      data: newCharacter
    });
    const createdCharacter = response.data;
    console.log(createdCharacter)
    createCharacter(createdCharacter)


  } catch (error) {
    console.error(error)

  }

});

