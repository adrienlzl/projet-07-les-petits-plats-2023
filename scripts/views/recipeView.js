import {Observable} from '../utils/Observable.js';

export class RecipeView extends Observable {
    constructor() {
        super();
        this.ingredients = [];
        this.appliance = [];
        this.ustensils = [];
        this.ingredientsTag = [];
        this.ustensilsTag = [];
        this.applianceTag = [];
    }

    render({recipes}) {
        const ingredientArrow = document.getElementById('arrow-ingredient');
        const applianceArrow = document.querySelector('.arrow-appliance');
        const ustensilArrow = document.querySelector('.ustensil-arrow');

        const resultIngredient = document.querySelector('.result-ingredient');
        const resultAppliance = document.querySelector('.result-appliance');
        const resultUstensil = document.querySelector('.result-ustensil');

        const ingredientTags = document.querySelector('.ingredient-tags');
        const applianceTag = document.querySelector('.appliance-tags');
        const ustensilTag = document.querySelector('.ustensil-tags');

        const inputIngredient = document.getElementById("ingredient");
        const inputAplliance = document.getElementById('appliance');
        const inputUstensil = document.getElementById('ustensil');

        const resultTagsSearch = document.querySelector('.result-tags-search');
        const mainArticle = document.querySelector('.result-search');

        const badResearch = document.querySelector('.bad-research');

        // faire le vide des elements
        mainArticle.textContent = '';
        this.ingredients.splice(0, this.ingredients.length);
        this.appliance.splice(0, this.appliance.length);
        this.ustensils.splice(0, this.ustensils.length);
        resultIngredient.innerHTML = '';
        resultUstensil.innerHTML = '';
        resultAppliance.innerHTML = '';

        if (recipes.length === 0) {
            badResearch.classList.remove('display-none');
            badResearch.classList.add('display-block');
        } else {
            badResearch.classList.remove('display-block');
            badResearch.classList.add('display-none');
        }

        //  Création et affichage du DOM ***************************************************************

        //  création des tableaux pour les TAG
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                const formattedIngredient =
                    ingredient.ingredient.charAt(0).toUpperCase() +
                    ingredient.ingredient.slice(1);
                if (!this.ingredients.includes(formattedIngredient)) {
                    this.ingredients.push(formattedIngredient);
                }
            }
            const formattedAppliance =
                recipe.appliance.charAt(0).toUpperCase() +
                recipe.appliance.slice(1);
            if (!this.appliance.includes(formattedAppliance)) {
                this.appliance.push(formattedAppliance);
            }
            for (let k = 0; k < recipe.ustensils.length; k++) {
                const ustensil = recipe.ustensils[k];
                const formattedUstensil =
                    ustensil.charAt(0).toUpperCase() + ustensil.slice(1);
                if (!this.ustensils.includes(formattedUstensil)) {
                    this.ustensils.push(formattedUstensil);
                }
            }

            // creation du DOM
            const article = createNewElement('article');
            const imgDiv = createNewElement('div', ['recipes-img']);
            const textRecipe = createNewElement('div', ['recipe-text']);
            const titleAndTime = createNewElement('div', ['title-time']);
            const titleRecipe = createNewElement('h2', ['title-recipe'], [], [recipe.name]);
            const timeAndClock = createNewElement('div', ['div-time']);
            const clock = createNewElement('i', ['far', 'fa-clock', 'recipe-cloak']);
            const timer = createNewElement('p', ['time-recipe'], [], [recipe.time + ' min']);
            const ingredientAndRecipe = createNewElement('div', ['ingredient-recipe-description']);
            const allIngredient = createNewElement('ul', ['all-ingredients']);

            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i];
                const quantity = ingredient.quantity ? `${ingredient.quantity}` : '';
                const unit = ingredient.unit ? ` ${ingredient.unit}` : '';
                const separator = ingredient.unit ? ':' : '';
                const listIngredient = createNewElement('li', ['list-ingredient'], [], [`${ingredient.ingredient}${separator} ${quantity}${unit}`]);
                allIngredient.appendChild(listIngredient);
            }

            const description = createNewElement('p', ['description'], [], [recipe.description]);

            article.appendChild(imgDiv);
            article.appendChild(textRecipe);
            textRecipe.appendChild(titleAndTime);
            textRecipe.appendChild(ingredientAndRecipe);
            titleAndTime.appendChild(titleRecipe);
            titleAndTime.appendChild(timeAndClock);
            timeAndClock.appendChild(clock);
            timeAndClock.appendChild(timer);
            ingredientAndRecipe.appendChild(allIngredient);
            ingredientAndRecipe.appendChild(description);
            mainArticle.appendChild(article);

            if (description.innerText.length >= 220) {
                const text = description.innerText.trim();
                const truncatedText = text.substring(0, 220);
                const reversedText = truncatedText.split('').reverse().join('');
                const firstPunctuation = reversedText.search(/[.,]/);
                const substring = text.substring(0, truncatedText.length - firstPunctuation);
                description.textContent = substring;
            }
        };
        // création des tags ****************************************************************const
        const ingredientsTries = this.ingredients.sort();
        for (let i = 0; i < ingredientsTries.length; i++) {
            const ingredient = ingredientsTries[i];
            const liIngredient = createNewElement('li', ['ingredient'], [{
                attribute: 'data-ingredient',
                content: ingredient
            }], ingredient);
            resultIngredient.appendChild(liIngredient);
        }

        const applianceTries = this.appliance.sort();
        for (let i = 0; i < applianceTries.length; i++) {
            const appliance = applianceTries[i];
            const liAppliance = createNewElement('li', ['appliance'], [{
                attribute: 'data-appliance',
                content: appliance
            }], appliance);
            resultAppliance.appendChild(liAppliance);
        }

        const ustensilsTries = this.ustensils.sort();
        for (let i = 0; i < ustensilsTries.length; i++) {
            const ustensil = ustensilsTries[i];
            const liUstensil = createNewElement('li', ['ustensils'], [{
                attribute: 'data-ustensil',
                content: ustensil
            }], ustensil);
            resultUstensil.appendChild(liUstensil);
        }

        this.ingredients.sort();
        this.appliance.sort();
        this.ustensils.sort();

        // Ouvrir les Tags
        ingredientArrow.addEventListener('click', (event) => {
            if (!ingredientArrow.classList.contains('rotate')) {
                ingredientArrow.classList.add('rotate');
                resultIngredient.classList.add('display-block');
                ingredientTags.classList.add('tag-opened-ingredient');
            } else {
                ingredientArrow.classList.remove('rotate');
                resultIngredient.classList.remove('display-block');
                ingredientTags.classList.remove('tag-opened-ingredient')
            }
            event.stopImmediatePropagation()
        });
        applianceArrow.addEventListener('click', (event) => {
            if (!applianceArrow.classList.contains('rotate')) {
                applianceArrow.classList.add('rotate');
                resultAppliance.classList.add('display-block');
                applianceTag.classList.add('tag-opened-appliance');

            } else {
                applianceArrow.classList.remove('rotate');
                resultAppliance.classList.remove('display-block');
                applianceTag.classList.remove('tag-opened-appliance');
            }
            event.stopImmediatePropagation()
        });
        ustensilArrow.addEventListener('click', (event) => {
            if (!ustensilArrow.classList.contains('rotate')) {
                ustensilArrow.classList.add('rotate');
                resultUstensil.classList.add('display-block');
                ustensilTag.classList.add('tag-opened-ustensils');
            } else {
                ustensilArrow.classList.remove('rotate');
                resultUstensil.classList.remove('display-block');
                ustensilTag.classList.remove('tag-opened-ustensils');
            }
            event.stopImmediatePropagation()
        });

        // Pour faire les recherches et la gestion des Tags
        const addTagResearch = (data) => {
            const resultTagIngredient = createNewElement('div', ['icone-result-ingredient']);
            const pIngredientResult = createNewElement('p', ['p-icone-result'], [], [data]);
            pIngredientResult.dataset.value = data;
            const circleIcone = createNewElement('i', ['far', 'fa-times-circle', 'circle-icone-result']);


            circleIcone.addEventListener('click', () => {
                resultTagIngredient.parentNode.removeChild(resultTagIngredient);
                const removedValue = pIngredientResult.dataset.value;
                const index = this.ingredientsTag.indexOf(removedValue);
                if (index !== -1) {
                    this.ingredientsTag.splice(index, 1);
                    this.notifyObservers('searchTag', {
                        ingredientsTag: this.ingredientsTag,
                        ustensilsTag: this.ustensilsTag,
                        applianceTag: this.applianceTag
                    });

                }
            });
            resultTagIngredient.appendChild(pIngredientResult);
            resultTagIngredient.appendChild(circleIcone);
            resultTagsSearch.appendChild(resultTagIngredient);

            this.ingredientsTag.push(data);
            this.notifyObservers('searchTag', {
                ingredientsTag: this.ingredientsTag,
                ustensilsTag: this.ustensilsTag,
                applianceTag: this.applianceTag
            });
        };

        inputIngredient.addEventListener('input', () => {
            const searchTerm = inputIngredient.value.trim().toLowerCase();
            if (searchTerm.length >= 1) {
                const matchingIngredients = [];
                for (let i = 0; i < this.ingredients.length; i++) {
                    const ingredient = this.ingredients[i];
                    if (ingredient.toLowerCase().includes(searchTerm)) {
                        matchingIngredients.push(ingredient);
                    }
                }
                resultIngredient.innerHTML = '';
                for (let i = 0; i < matchingIngredients.length; i++) {
                    const ingredient = matchingIngredients[i];
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    resultIngredient.appendChild(li);
                }
            } else {
                resultIngredient.innerHTML = '';
                for (let i = 0; i < this.ingredients.length; i++) {
                    const ingredient = this.ingredients[i];
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    resultIngredient.appendChild(li);
                }
            }
        });

        const ingredients = document.querySelectorAll('.ingredient');
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            ingredient.addEventListener('click', (event) => {
                const data = event.target.getAttribute('data-ingredient');
                addTagResearch(data);
                event.stopPropagation();
            });
        }

        const addTagUstensil = (data) => {
            const resultTagUstensil = createNewElement('div', ['icone-result-ustensil']);
            const pUstensilResult = createNewElement('p', ['p-icone-result'], [], [data]);
            pUstensilResult.dataset.value = data;
            const circleIconeUstensil = createNewElement('i', ['far', 'fa-times-circle', 'circle-icone-result']);

            circleIconeUstensil.addEventListener('click', () => {
                resultTagUstensil.parentNode.removeChild(resultTagUstensil);
                const removedValue = pUstensilResult.dataset.value;
                const index = this.ustensilsTag.indexOf(removedValue);
                if (index !== -1) {
                    this.ustensilsTag.splice(index, 1);
                    this.notifyObservers('searchTag', {
                        ingredientsTag: this.ingredientsTag,
                        ustensilsTag: this.ustensilsTag,
                        applianceTag: this.applianceTag
                    });
                }
            });


            resultTagUstensil.appendChild(pUstensilResult);
            resultTagUstensil.appendChild(circleIconeUstensil);
            resultTagsSearch.appendChild(resultTagUstensil);

            this.ustensilsTag.push(data);
            this.notifyObservers('searchTag', {
                ingredientsTag: this.ingredientsTag,
                ustensilsTag: this.ustensilsTag,
                applianceTag: this.applianceTag
            });

        }

        inputUstensil.addEventListener('input', () => {
            const searchUstensil = inputUstensil.value.trim().toLowerCase();
            if (searchUstensil.length >= 1) {
                const matchingUstensil = [];
                for (let i = 0; i < this.ustensils.length; i++) {
                    const ustensil = this.ustensils[i];
                    if (ustensil.toLowerCase().includes(searchUstensil)) {
                        matchingUstensil.push(ustensil);
                    }
                }
                resultUstensil.innerHTML = '';
                for (let i = 0; i < matchingUstensil.length; i++) {
                    const ustensil = matchingUstensil[i];
                    const li = document.createElement('li');
                    li.textContent = ustensil;
                    resultUstensil.appendChild(li);
                }
            } else {
                resultUstensil.innerHTML = '';
                for (let i = 0; i < this.ustensils.length; i++) {
                    const ustensil = this.ustensils[i];
                    const li = document.createElement('li');
                    li.textContent = ustensil;
                    resultUstensil.appendChild(li);
                }
            }
        });

        const ustensilsList = document.querySelectorAll('.ustensils');
        for (let i = 0; i < ustensilsList.length; i++) {
            const ustensil = ustensilsList[i];
            ustensil.addEventListener('click', (event) => {
                const data = event.target.getAttribute('data-ustensil');
                addTagUstensil(data);
            });
        }
        const addTagAppliance = (data) => {
            const resultTagAppliance = createNewElement('div', ['icone-result-appliance']);
            const pApplianceResult = createNewElement('p', ['p-icone-result'], [], [data]);
            pApplianceResult.dataset.value = data;
            const circleIcone = createNewElement('i', ['far', 'fa-times-circle', 'circle-icone-result']);

            circleIcone.addEventListener('click', () => {
                resultTagAppliance.parentNode.removeChild(resultTagAppliance);
                const removedValue = pApplianceResult.dataset.value;
                const index = this.applianceTag.indexOf(removedValue);
                if (index !== -1) {
                    this.applianceTag.splice(index, 1);
                    this.notifyObservers('searchTag', {
                        ingredientsTag: this.ingredientsTag,
                        ustensilsTag: this.ustensilsTag,
                        applianceTag: this.applianceTag
                    });
                }
            });

            resultTagAppliance.appendChild(pApplianceResult);
            resultTagAppliance.appendChild(circleIcone);
            resultTagsSearch.appendChild(resultTagAppliance);

            this.applianceTag.push(data);
            this.notifyObservers('searchTag', {
                ingredientsTag: this.ingredientsTag,
                ustensilsTag: this.ustensilsTag,
                applianceTag: this.applianceTag
            });
        };

        inputAplliance.addEventListener('input', () => {
            const searchTerm = inputAplliance.value.trim().toLowerCase();
            if (searchTerm.length >= 1) {
                const matchingAppliance = [];
                for (let i = 0; i < this.appliance.length; i++) {
                    const appliance = this.appliance[i];
                    if (appliance.toLowerCase().includes(searchTerm)) {
                        matchingAppliance.push(appliance);
                    }
                }
                resultAppliance.innerHTML = '';
                for (let i = 0; i < matchingAppliance.length; i++) {
                    const appliance = matchingAppliance[i];
                    const li = document.createElement('li');
                    li.textContent = appliance;
                    resultAppliance.appendChild(li);
                }
            } else {
                resultAppliance.innerHTML = '';
                for (let i = 0; i < this.appliance.length; i++) {
                    const appliance = this.appliance[i];
                    const li = document.createElement('li');
                    li.textContent = appliance;
                    resultAppliance.appendChild(li);
                }
            }
        });
        const applianceElements = document.querySelectorAll('.appliance');
        for (let i = 0; i < applianceElements.length; i++) {
            const appliance = applianceElements[i];
            appliance.addEventListener('click', (event) => {
                const data = event.target.getAttribute('data-appliance');
                addTagAppliance(data);
            });
        }

        document.getElementById('recherche').addEventListener('input', (e) => {
            let value = e.target.value;
            if (value.length >= 3) {
                this.notifyObservers('search', {value});
            }
        });

    }
}

