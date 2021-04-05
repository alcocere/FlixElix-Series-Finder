# FlixElix Series Finder

![Preview-web](https://user-images.githubusercontent.com/75808414/113590789-5d6f3600-9633-11eb-873c-7efd9a237255.png)

* #### About 
This is the final assessment of module 2 (JavaScript) during Adalab's bootcamp. It's a series finder, which through the TV Maze API allows us to search series by title and save them in favorites.


* #### How it works:
When the user enters a serie name in the search field, and click on the button, or hit the 'enter' key, it produces a call to the TV Maze API, which returns a JSON object with the search results. 

* #### Favorite side bar:
When the user click on a tv-show, the background color is inverted, and it is added to the favorites section. When the page is reloaded, the favorites are kept, as they are stored in the browser's local storage. To delete the favorites tv-shows, you can do it with the button at the bottom of each favorite, by clicking on the selected series in the results area, or by deleting them all with the 'Delete all' button.

### Installation
This is what you have to do:

* Download or clone the project repository.
* Install dependencies with `$ npm install`.
* Run the project with `$ npm start`.
