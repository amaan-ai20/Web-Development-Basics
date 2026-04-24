const hitGymListItem = document.createElement('li');

hitGymListItem.textContent = 'Hit the Gym';

hitGymListItem.className = 'list-item';


const todos = document.querySelector('#todos');

todos.appendChild(hitGymListItem);

const drinkCoffeeListItem = document.createElement('li');
drinkCoffeeListItem.textContent = 'Drink Coffee';
drinkCoffeeListItem.className = 'list-item';

todos.prepend(drinkCoffeeListItem);


// Add a pre workoout meal after drinking coffee

const preWorkoutMeal = document.createElement('li');
preWorkoutMeal.textContent = 'Eat Pre Workout Meal';
preWorkoutMeal.className = 'list-item';


todos.insertBefore(preWorkoutMeal, hitGymListItem);

// select the class stupid-todo and remove it

const stupidTodo = document.querySelectorAll('.stupid-todo');


// loop and remove all the elements with the class name stupid-todo
stupidTodo.forEach(todo => {
    todo.remove();
});

