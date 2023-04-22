# ClassMate
ClassMate is a new feature that can be introduced to any social media application like GroupMe, Facebook, WhatsApp, etc. to simplify the process of joining class groups and connecting with peers for students. The feature allows students to select their US college and enter their Class Registration Numbers (CRN) to automatically join the corresponding class groups. Currently, the focus is on developing the feature for Georgia Tech. ClassMate makes it easier for students to access vital resources and stay up-to-date with course materials.

## System architecture
ClassMate's system architecture uses HTML, CSS, and React for the frontend, Ruby for the backend, and Firebase for the database.

## Requirements for local runs
1.	Ensure that git is installed on your local machine by checking ```git version```. If not, make sure to install it.
2.	Now, clone the ClassMate GitHub repository, ```git clone https://github.com/rohanbatra4/ClassMate.git```
3.	Replace the path of credential_file in line 7 of '/class-mate/src/backend/retrieval.rb with the path of the credential file provided once downloaded on your local machine.
4.	Now, make sure you have all required dependencies to run a React application. If not, please install them on your machine. Node.js and npm are required and you should try to create a dummy React app to see if it works. (```npx create-react-app my-app```)
5.	Now, in the project folder for ClassMate, you should be in the ‘class-mate’ directory. Install dependencies again by running ```npm install``` 
6.	You should be able to start the app by running ```npm start```.
7.	To ensure that the Ruby file also runs simultaneously (in a different terminal), check if Ruby is installed on your laptop.
8.	Once Ruby is installed, the next step is to ensure all gems required are installed.
9.	Installing rvm and setting it to version 3.0.0 was the best way to make this work before installing the gems. Make sure to use rvm 3.0.0 by doing ```rvm use 3.0.0```.
10.	Now, install the required gems using ```gem install sinatra sinatra-cross_origin json puma```.
11.	This specific version for firestore integration is required as well ```gem install google-cloud-firestore -v 2.11.0```
12.	You should be able to run the app through one terminal and run the Ruby script through another one, allowing you to use the application to its full potential. <br /><br />
Note: There may be some other issues that one may face if they have dependencies on their laptop, which interfere with new ones being installed. Make sure to then follow these steps in a virtual environment using ```conda``` or attempt to match versions. Instructions for React and Ruby installation are available online for both Mac and Windows (these are the basic installations we will need).

