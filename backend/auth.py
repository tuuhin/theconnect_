from flask import Blueprint, jsonify,request
from flask_jwt_extended import create_access_token,set_access_cookies,unset_jwt_cookies,jwt_required,current_user
from werkzeug.security import generate_password_hash,check_password_hash
import re


auth = Blueprint('auth',__name__)
from .import db
from .models import User


def validate_email(email):
    if re.fullmatch( r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',email):
        return True
    else:
        return False


@auth.route('/current-user')
@jwt_required(locations='cookies')
def current():
    return jsonify({'username':current_user.username,'user_id':current_user.id})

@auth.route('/sign-in',methods=['POST'])
def sign_in():
    username = request.json.get('username',None)
    password = request.json.get('password',None)
    if not (username or password):
        res = jsonify({'error':'nothing has been provided'}),404
    user = User.query.filter_by(username=username).first()
    if not user:
        res = jsonify({'error':'user-not-exists'}),404
    else:
        if not check_password_hash(user.pword,password):
            res = jsonify({'error':'invalid-password'}),404
        else:
            token = create_access_token(identity=user)
            res = jsonify({'success':'user logged in '})
            set_access_cookies(res,token) 
            res = res,202

    return res

@auth.route('/sign-up',methods=['POST'])
def sign_up():

    first_name = request.json.get('firstname',None)
    last_name = request.json.get('lastname',None)
    email = request.json.get('email',None)
    username = request.json.get('username',None)
    password = request.json.get('password',None)
   
    if not (first_name and last_name and email and username and password):
       return  jsonify({'error':'data-was-found-missing'}),404
    elif not validate_email(email):
        return   jsonify({'error':'invalid-email'}),404
    if email:
        user = User.query.filter_by(email_id=email).first()
        if  user:
            return jsonify({'error':'email-already-taken'}),404
    if username and password:
        user = User.query.filter_by(username=username).first()
        if  user:
            return jsonify({'error':'username-already-taken'}),404
        else:
            new_user = User(first_name=first_name,
                last_name=last_name,
                email_id=email,
                username=username,
                pword=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            token = create_access_token(identity=new_user)
            res = jsonify({'success':'new-user-created'})
            set_access_cookies(res,token) 

            return res,201

@auth.route('/logout')
def logout():
    res = jsonify({'message':'logout'})
    unset_jwt_cookies(res)
    return res


