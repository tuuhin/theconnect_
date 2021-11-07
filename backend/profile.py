from flask import Blueprint,jsonify, request
from flask_jwt_extended import jwt_required
from werkzeug.security import check_password_hash, generate_password_hash
from .models import User
from . import db
profile = Blueprint('profile',__name__)

@profile.route('password',methods=['POST'])
@jwt_required(locations='cookies')
def update_password():
    user_id = request.json.get('userId',None)
    oldpassword = request.json.get('oldpassword',None)
    newpassword =request.json.get('newpassword',None)
    if not(user_id and newpassword and oldpassword):
        return jsonify({'status':'error','helper':'missing user_id'})
    elif  not(newpassword and oldpassword):
        return jsonify({'status':'error','helper':'missing identities'})
    else:
        user = User.query.filter_by(id=user_id).first()
        print(user.pword,oldpassword,newpassword)
        if not user:
            return jsonify({'status':'error','helper':'user dont exist'})
        elif not check_password_hash(user.pword,oldpassword):
            return jsonify({'status':'error','helper':'invalid password'})
        else:
            user.pword = generate_password_hash(newpassword)
            db.session.commit()
            return jsonify({'status':'success','helper':'password changed'})
    
@profile.route('username',methods=['POST'])
@jwt_required(locations='cookies')
def update_username():
    username = request.json.get('oldusername',None)
    password =request.json.get('password',None)
    newusername = request.json.get('newusername',None)
    if not(username and password and newusername):
        return jsonify({'status':'error','helper':'missing identities'})
    else:
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'status':'error','helper':'user dont exist'})
        elif not check_password_hash(user.pword,password):
            return jsonify({'status':'error','helper':'invalid password'})
        else:
            user.username = newusername
            db.session.commit()
            return jsonify({'status':'success','helper':'user name changed'})