# Insemi TimeSheet

Welcome to **Insemi TimeSheet**! This is an employee management solution for any corporate structure. 

## INSTRUCTIONS FOR INSTALLATION

Insemi TImeSheet is buit on a combination of Python's Django library to handle the full stack web development side and the JavaScript React.js library for the frontend development side. 

### Step One: Downloading the Code Base

[GitHub Repository for Insemi TimeSheet](https://github.com/arnyboy101/InsemiTimeSheet)

![Installation Options](./Planning/1.jpg)

If you regularly use, **GitHub Desktop** then choose the Open with GitHub Desktop option. 

If you do not use GitHub Desktop or are not comfortable with using that option, you can Download ZIP. Extract the compressed zip folder using your preferred decompression software. 

### Step Two: Programming Instructions

Get Microsoft's Visual Studio Code editor [here](https://code.visualstudio.com/)

Download the latest version of Python [here](https://www.python.org/downloads/)

Download your preferred version of Node.js [here](https://nodejs.org/en/download/)

Open Visual Studio Code and download the **JavaScript and Python extension**

![Terminal](./Planning/2.jpg)

Click on the terminal tab and select new terminal as shown above.

Type `python` in your terminal and if the below image shows up, the installation has been successful.

![Python Success](./Planning/3.jpg)

Type `Cntrl + Z` and click enter to re-enter the terminal.

Next type the following line into the terminal
```
py get-pip.py
```

Once pip in successfully installed, install `Django` using the following statement 
```
pip install django djangorestframework
```
Enter the following statements to install the remaining dependencies.
```
pip install mysqlclient
```
```
pip install django_mysql
```
```
pip install django-crispy-forms 
```
```
pip install django-cors-headers
```
```
pip install djangorestframework-jwt
```

**Here are the various facets of our program and where it can be improved**

## Login and Registration

### Registration
Can be found at http://127.0.0.1:8000/users/register/

![Registration Screen](./Planning/4.jpg)
 
 - Once registered, another user cannot use the same username or Employee ID
 - *Improvements* - Front-end needs to look more polished and approachable

 ### Login

 If not directly redirected from the registration page, you can directly login from http://127.0.0.1:8000/auth/

 ![Login](./Planning/5.jpg)

 The username will be authenticated and you will be redirected to the next navigation screen.

 ![Navigation](./Planning/6.jpg)
 
Home Screen


Calendar



TimeSheet


TimeTracker


Export Files



Hierarchy


Notice Board


Leave System


Client Customization



