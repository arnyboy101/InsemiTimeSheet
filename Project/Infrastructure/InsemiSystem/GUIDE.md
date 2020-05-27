# Guide for building Site Infrastructure with **Django Rest-Framework and React** within InsemiSystem.

**Written by Arnav Sampigethaya**

[Inspiration - Valentino G](https://www.valentinog.com/blog/drf/#Django_REST_with_React_Django_and_React_together)

[Markdown Syntax](https://guides.github.com/features/mastering-markdown/)


## **FIRST-TIME ONLY**

Open Terminal
```
pip install django djangorestframework

```
# Backend

## **FOR EACH NEW INFRASTRUCTURE**

## Step 1: Initial Django Project and App Setup

Create New Django Project using -
```
django-admin startproject _______
```

Then go into that project by typing -
```
cd ___________
```

Next, type -
```
django-admin startapp _______
```
Now we need to add the App to our project so go to `YourProjectName/settings.py` and add your app in this manner - 
```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'your_apps_name_goes_here',
]
```

## Step 2: Model Creation 
This is self-explananatory. Don't forget to run the `python manage.py makemigrations _______ ` and `python manage.py migrate` when you're done!


## Step 3: Serialization
This is where the Django-Rest Framework comes in to play.
What we need to is Serialize our models.
For this you need to go to your app folder and create a `serializers.py`

```
from rest_framework import serializers
from .models import Lead

class ______Serializer(serizalizers.ModelSerializer):
    class meta:
        model = ______
        fields = ('the names of your various model fields')


```

Now you need to create a view to access the Serializer

```
from .models import *
from .serializers import *
from rest_framework import generics

class _____ListCreate(generics.ListCreateAPIView):
    queryset = ______.objects.all()
    serializer_class = YourModelsSerializer


```

Connect this to the `urls.py`

Add `rest_framework` to the afforementioned `settings.py`

Now when you enter that url into your runserver as you would customarily, you'll be able to see an interface to manage your Model.

# FRONTEND

## Step 4 : Setting up JavaScript and the GUI Django App

Now you need to integrate this project with the React.js frontend. Thankfully, since we're using Django-Rest Framework for APIs, we can easily communicate between our local SQLite database and the frontend using `POST`, `GET` and `fetch`.

Now we need to make a new parallel app for the frontend

We are using the following naming conventions -

```
django-admin startapp _______GUI
```

Next, go to Powershell (Terminal if you're using VS Code) and type in the following statements.

```
mkdir -p ./____GUI/src/components
mkdir -p ./____GUI/static/____GUI
mkdir -p ./____GUI/templates/____GUI
```

This should create some essential directories that we'll need to access while coding in React.js.

Next, enter the next few statements in Terminal 

```
cd ./___GUI
npm init -y
npm i webpack webpack-cli --save-dev
```

Now in your directories you'll find a file called `package.json`, add these two lines below the `"scripts":{` part of the file.

```
"dev": "webpack --mode development ./src/index.js --output ./static/_____GUI/main.js",
  "build": "webpack --mode production ./src/index.js --output ./static/_____GUI/main.js"

```
Save the file (You should have turned on AutoSave in VS Code by now anyways).

Next, go to terminal and install babel like this - 
```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Now we finally get to import `react`. Go to terminal and put in this bit - 

```
npm i react react-dom --save-dev
```

Now create a file called `.babelrc` inside the ____GUI App directory. 
Inside the file, put in this code -
```
{
    "presets": [
        "@babel/preset-env", "@babel/preset-react"
    ]
}
```

Now create a file called `webpack.config.js` and put in the following JavaScript code - 

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
# Step 5: Preparing the Django App for our React File

Create a view in the `____GUI/views.py`

Render a `index.html` from the `templates/____GUI` folder in your view. 

Now go create that `.html` file in that location. Fill it with this code, please note the areas where `___GUI` is used and replace those parts with the name of your app - 
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Django REST with React</title>
</head>
<body>
<div id="app">
    <!-- React will load here -->
</div>
</body>
{% load static %}
<script src="{% static "___GUI/main.js" %}"></script>
</html>
```

Don't worry about that `main.js`, it's auto-generated.
Add the GUI Urls to the main project `urls.py` file now.

Now, create a `urls.py` inside this GUI App and make the appropriate `urlpatterns`

Also add this GUI app into the `INSTALLED_APPS` section of the project's `settings.py`

To test whether you've been going on the right path you can test, the appropriate URL in the `runserver`

# Step 6: Working with React.js

Go insert some Model data in the Rest-Framework page to populate the database.

Once you've done that, create a new file called `App.js` in `___GUI/src/components`.

Don't blindly copy the code below, fill in the blanks wherever you need to, this is just the basic framework of what you need to do. Your React.js files will be much longer in reality. 

```
import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("___fill in your url here____")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

   render() {
    return (
        <div>
            <p>Enter Your React Code here</p>
        </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

```

Now create a file called `index.js` in the directory right above this a.k.a `src`

All you need to do is plop down this one line of code which brings `App.js` into the Webpack so it can be run.

```
import App from "./components/App";
```

If you've done everything right, here is the moment of truth. Go to terminal.

```
cd ____GUI

npm run dev

cd ..

python manage.py runserver
```
And upon testing, if your React module opens as intended, ***voila*** you've accomplished your task and created a *Django + REST-Framework + React* infrastructure!

 **GOOD JOB!**



















