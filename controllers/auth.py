from flask import Blueprint, request, jsonify
from models.User import User, UserSchema
from datetime import datetime, timedelta
import jwt
from config.environment import secret

user_schema = UserSchema()

api = Blueprint('auth', __name__)


@api.route('/register', methods=['POST'])
def register():
    req_data = request.get_json()
    data, error = user_schema.load(req_data)

    if error:
        return jsonify({'error': error}), 422

    user = User(data)
    user.save()

    return jsonify({'message': 'Registation successful'})


@api.route('/login', methods=['POST'])
def login():
    req_data = request.get_json()
    data, error = user_schema.load(req_data)

    user = User.query.filter_by(email=data.get('email')).first()
    print(user.default_team_id)
    if not user or not user.validate_password(data.get('password', '')):
        return jsonify({'message': 'Unauthorized'}), 401

    payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'sub': user.id,
        'permission': user.permission,
        'default_wave_id': user.default_wave_id,
        'default_team_id': user.default_team_id,

    }

    token = jwt.encode(
        payload,
        secret,
        'HS256'
    ).decode('utf-8')

    return jsonify({
        'message': 'Welcome back {}!'.format(user.username),
        'permission': user.permission,
        'default_team_id': user.default_team_id,
        'default_wave_id': user.default_wave_id,

        'token': token
    })
