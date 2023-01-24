# movie-lookup
<h3> A data and information visualization project written in Javacript and python, simillar to IMDB where you can look up for movies.</h3>

![movie-camera-svgrepo-com](https://user-images.githubusercontent.com/117464310/214378686-fcf3ef6e-9733-4292-b589-79bb2fe4e5c7.svg)

<h4>Introduction</h4>
<p>This project is simillar to IMDB. Box Office (BO) is build upon on a CSV file with data of over 40k movies, that I parsed on Jupyter Notebook by Python and moved to MySQL. The frontend is written in Javascript and for handling queries and REST APIs I have implemented node Express and Axios, and a secondary proxy to communicate with backend. The backend is writtn in Python and I have implemented Flask for handling queries and APIs.
</p>

<h4>Instructions</h4>
<p>Box Office is simillar to IMDB, where users can look for movies that are availbe thoguh database and search based on genre, location, language and any other data availbe to the movie itself.

<p>Box Office allows users to: </p><Li>Search though movies</li>
<Li>Checkout the details for their favourite movie</li>
<li>Rate movies they like and submit the results (interactive design)</li> 
<li>Select movies based on genre, production country or spoken language</li> 
<li>View top 10 movies on the main page and change the top 10 based on genre</li> 

</p>

<h4>User Installation</h4>
<p>
<ol>
  <li>Users can simply clone the project</li>
   <li>Go to the main page of the repository and on the top click on the green button <> Code and copy the URL</li>
   <li>Open your terminal and go to the directory you would like to clone the project</li>
   <li>Type git clone and paste the URL that you have copied and press enter </li>
     <li>Make sure to install Python3 for the program to run</li>
  <li>After cloning, open a new terminals in the directory that you have clonned the project and run the following command (cd movie-lookup/ npm install) to install all the packages</li>
  <li>Open 3 terminals and on all of them  move to the directory you clonned the project and run ( cd movie-lookup), in each terminal run the following commands seperatly(npm start), (sh run-cache.sh) and (sh run-backend.sh) </li>
  <li>Browser will bring up the application and it is ready for use</li>
</ol> 
</p>



<h4>Limitations</h4>
  <li>The data in database doesn't have images to represent the movies</li>
  <li>The data in database is immutable and users or program can't make changes unless they just change rating of the movie (doesn't crawl web for more movies to add)</li>
