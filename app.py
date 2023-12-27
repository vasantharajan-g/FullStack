from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
bcrypt = Bcrypt()
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Replace these variables with your own Supabase database credentials
DATABASE_URL = "postgresql://postgres:Vasantharajan#00@db.dovsdgqpanrgzeieqgmd.supabase.co:5432/postgres"
conn = psycopg2.connect(DATABASE_URL, sslmode='require')
cursor = conn.cursor()


# Signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')

    try:
        cursor.execute("INSERT INTO supabase_user (username, email, password) VALUES (%s, %s, %s) RETURNING id;",
                       (username, email, password))
        conn.commit()
        user_id = cursor.fetchone()[0]
        print("user_id", user_id, username)
        return jsonify({'message': 'User registered successfully', 'user_id': user_id})
    except Exception as e:
        return jsonify({'error': str(e)})


# Signin endpoint
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username_or_email = data.get('username_or_email')
    password = data.get('password')

    # Check if the input is an email or a username
    if '@' in username_or_email:
        # Input is an email
        query = "SELECT id, password FROM supabase_user WHERE email = %s;"
    else:
        # Input is a username
        query = "SELECT id, password FROM supabase_user WHERE username = %s;"

    cursor.execute(query, (username_or_email,))
    user_data = cursor.fetchone()

    if user_data and bcrypt.check_password_hash(user_data[1], password):
        print("user_id", user_data[0])
        return jsonify({'message': 'Login successful', 'user_id': user_data[0]})
    else:
        return {'error': 'Invalid Email or password'},500


# Get all users endpoint
@app.route('/get_all_users', methods=['GET'])
def get_all_users():
    cursor.execute("SELECT * FROM supabase_user;")
    users = cursor.fetchall()

    user_list = [{'id': user[0], 'username': user[1], 'email': user[2]} for user in users]
    return jsonify({'users': user_list})


# Get one user endpoint
@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cursor.execute("SELECT * FROM supabase_user WHERE id = %s;", (user_id,))
    user = cursor.fetchone()

    if user:
        return jsonify({'user': {'id': user[0], 'username': user[1], 'email': user[2]}})
    else:
        return jsonify({'error': 'User not found'})


# Update one user endpoint
@app.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    new_username = data.get('username')
    new_email = data.get('email')

    try:
        cursor.execute("UPDATE supabase_user SET username = %s, email = %s WHERE id = %s;",
                       (new_username, new_email, user_id))
        conn.commit()
        return jsonify({'message': 'User updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})


# Delete one user endpoint
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        cursor.execute("DELETE FROM supabase_user WHERE id = %s;", (user_id,))
        conn.commit()
        return jsonify({'message': 'User deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
