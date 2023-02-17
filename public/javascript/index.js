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


function createCharacter(character) {
  const clone = characterTemplate.content.cloneNode(true)
  clone.querySelector('.character-id span').textContent = character._id
  clone.querySelector('.name span').textContent = character.name
  clone.querySelector('.occupation span').textContent = character.occupation
  clone.querySelector('.cartoon span').textContent = character.cartoon
  clone.querySelector('.weapon span').textContent = character.weapon


  // clone
  //   .querySelector('button.delete')
  //   .addEventListener('click', () => deleteDuck(element._id))
  // clone
  //   .querySelector('button.update')
  //   .addEventListener('click', () => fillTheUpdateForm(element))
  charactersContainer.append(clone)
}


document.getElementById('fetch-all').addEventListener('click', async function (event) {
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

document.getElementById('delete-one').addEventListener('click', function (event) {

});

document.getElementById('edit-character-form').addEventListener('submit', function (event) {

});

document.getElementById('new-character-form').addEventListener('submit', function (event) {

});

