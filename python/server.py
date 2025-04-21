from flask import Flask, request, jsonify, abort, make_response
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app, supports_credentials=True)
app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['game_DB']
collection = db['users']


# פונקציה שממריה אוביקיטים של מונגו לSTR פשוט
def serialize_object(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj


# פונקציית הרשמה - הוספת פריט לאוסף - המשתמש עדיין לא מחובר
# Create
@app.route('/add', methods=['POST'])
def add_item():
    item = request.json
    collection.insert_one(item)
    return jsonify({"message": "Item added"}), 201


# פונקצית כניסה - כאן נוצרת העוגיה שתוקפה 10 דקות- והמשתמש מחובר
# Read
@app.route('/login', methods=['POST'])
def login():
    user = request.json
    print(user)
    result = collection.find_one(
        {'user_name': user['user_name'], 'password': user['password']},
        {'user_name': 1, 'tz': 1, 'password': 1, 'times': 1, 'words': 1, 'times_of_win': 1}
    )

    if result:
        response = make_response(jsonify(result={k: serialize_object(v) for k, v in result.items()}), 201)
        response.set_cookie("user", user['user_name'], max_age=600, httponly=True, secure=False, samesite='None')
        return response
    else:
        return jsonify({"error": "Invalid credentials"}), 401


# הפונקציה להצגת פרטי ההסטוריה - המשתמש מחובר
@app.route('/history/<name>', methods=['POST'])
def history(name):
    user = request.json
    print(user)
    result = collection.find_one(
        {'user_name': name},
        {'_id': 0, 'user_name': 1, 'tz': 1, 'password': 1, 'times': 1, 'words': 1, 'times_of_win': 1}
    )
    return jsonify(result={k: serialize_object(v) for k, v in result.items()}), 200


# עדכון - כנ"ל
@app.route('/update/<item_id>', methods=['PUT'], endpoint='update_item')
def update_item(item_id):
    updated_item = request.json
    collection.update_one({'_id': ObjectId(item_id)}, {'$set': updated_item})
    return jsonify({"message": "Item updated"}), 200


@app.route('/play', methods=['GET'])
def play():
    user_name = request.cookies.get('user')
    if user_name is None:
        return jsonify({"error": "User not found"}), 403
    return jsonify({"message": f"Welcome Back, {user_name}!"}), 200


if __name__ == "__main__":
    app.run(debug=True)
