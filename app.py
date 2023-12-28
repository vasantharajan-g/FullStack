from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# from models import Employee, supabaseUser

app = Flask(__name__)
bcrypt = Bcrypt()
CORS(app)

# Set configurations
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Vasantharajan#00@db.dovsdgqpanrgzeieqgmd.supabase.co:5432/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize SQLAlchemy instance with the app
db = SQLAlchemy(app)
# db.init_app(app)

# User table
class supabaseUser(db.Model):
     
    __table_name__ = 'supabase_user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String)
    
# Employee table
class Employee(db.Model):

    __table_name__ = 'employee'

    employee_id = db.Column(db.Integer, primary_key=True)
    employee_name = db.Column(db.String)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    is_active = db.Column(db.String)
    aadhar_number = db.Column(db.String)
    mobile_number = db.Column(db.String)
    city = db.Column(db.String)

with app.app_context():
    db.create_all()

# Signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')

    try:
        new_user = supabaseUser(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully', 'user_id': new_user.id})
    except Exception as e:
        return jsonify({'error': str(e)})

# Signin endpoint
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    user = supabaseUser.query.filter((supabaseUser.email == username_or_email) | (supabaseUser.username == username_or_email)).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful', 'user_id': user.id})
    else:
        return jsonify({'error': 'Invalid Email or password'}), 500

# Create employee endpoint
@app.route('/create_employee', methods=['POST'])
def create_employee():
    data = request.get_json()
    new_employee = Employee(**data)

    try:
        db.session.add(new_employee)
        db.session.commit()
        return jsonify({'message': 'Employee created successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})

# Get all employees endpoint
@app.route('/get_all_employees', methods=['GET'])
def get_all_employees():
    employees = Employee.query.all()
    employee_list = [{'employee_id': emp.employee_id, 'employee_name': emp.employee_name, 'age': emp.age,
                      'gender': emp.gender, 'is_active': emp.is_active, 'aadhar_number': emp.aadhar_number,
                      'mobile_number': emp.mobile_number, 'city': emp.city} for emp in employees]
    return jsonify({'employees': employee_list})

# Get one employee endpoint
@app.route('/get_employee/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    employee = Employee.query.get(employee_id)

    if employee:
        return jsonify({'employee': {'employee_id': employee.employee_id, 'employee_name': employee.employee_name,
                                     'age': employee.age, 'gender': employee.gender, 'is_active': employee.is_active,
                                     'aadhar_number': employee.aadhar_number, 'mobile_number': employee.mobile_number,
                                     'city': employee.city}})
    else:
        return jsonify({'error': 'Employee not found'})

# Update one employee endpoint
@app.route('/update_employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    data = request.get_json()
    try:
        employee = Employee.query.get(employee_id)

        if employee:
            for key, value in data.items():
                setattr(employee, key, value)

            db.session.commit()
            return jsonify({'message': 'Employee updated successfully'})
        else:
            return jsonify({'error': 'Employee not found'})
    except Exception as e:
        return jsonify({'error': str(e)})

# Delete one employee endpoint
@app.route('/delete_employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    try:
        employee = Employee.query.get(employee_id)

        if employee:
            db.session.delete(employee)
            db.session.commit()
            return jsonify({'message': 'Employee deleted successfully'})
        else:
            return jsonify({'error': 'Employee not found'})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
