# Project Name
Vendor Management System & Performance Metrics

## Introduction

--A Vendor Management System using Django and Django REST Framework. This
system will handle vendor profiles, track purchase orders, and calculate vendor performance
metrics.

### Prerequisites

- python3.7 +
- git
- any IDE 

### Installation

- Clone the Repository: Use the command git clone <repository_url> to clone the repository to your local machine.

Create a Virtual Environment: It’s a good practice to create a virtual environment for your Django project. You can do this with the following commands:

python3 -m venv env (This creates a new virtual environment named ‘env’)
source env/bin/activate (This activates the virtual environment)
Install Dependencies: Navigate to the directory where the requirements.txt file is located (usually the root directory of the project) and run pip install -r requirements.txt to install the necessary dependencies.

Apply Migrations: Django uses migrations to propagate changes you make to your models into the database schema. Run python manage.py makemigrations to create new migrations based on the changes detected on your models, and python manage.py migrate to apply the migrations and update the database schema.

Run the Server: Finally, you can start the Django development server with python manage.py runserver. You should now be able to access the application at http://127.0.0.1:8000/ (or another port if specified).

## API Endpoints

- List of API endpoints, HTTP methods, request/response formats
{
    "vendors": "http://127.0.0.1:8000/vendors/",
    "purchase_orders": "http://127.0.0.1:8000/purchase_orders/"
}

## Tests

- http://127.0.0.1:8000/ "built in drf ui mode"  or POSTMAN

## Deployment

- Running on Localhost post:8000

## Built With

- Django - The web framework used
- Other technologies, libraries, and services another
asgiref==3.7.2
Django==4.2.7
django-filter==23.4
djangorestframework==3.14.0
importlib-metadata==6.8.0
Markdown==3.5.1
mysqlclient==2.2.0
psycopg2-binary==2.9.9
pytz==2023.3.post1
sqlparse==0.4.4
typing_extensions==4.8.0
tzdata==2023.3
zipp==3.17.0


## Authors 

- "vasantharajan-g"

## License

- free

