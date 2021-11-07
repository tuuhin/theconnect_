from flask import Blueprint,jsonify, request
from flask_jwt_extended import jwt_required,current_user
from .models import  Comment, Likes, Post,User
from . import db
view = Blueprint('view',__name__)

@view.route('/all-posts',methods=['GET'])
@jwt_required(locations='cookies')
def home():
    return jsonify({ 'status':'success','helper':Post.get_all_post()})

@view.route('/current-user')
@jwt_required(locations='cookies')
def current():
    return jsonify({'username':current_user.username})

@view.route('/create-post',methods=['POST'])
@jwt_required(locations='cookies')
def create_post():
    content = request.json.get('content',None)
    user_id = request.json.get('user_id',None)
    if not user_id:
        return jsonify({'status':'error','helper':'user_id-missing'}),401
    else:
        if not content:
            return jsonify({'status':'error','helper':'content-cannot-be-blank'}),404
        else:
            user = User.query.filter_by(id=user_id).first()
            if not user:
                return jsonify({'status':'error','helper':'user-not-found'}),404
            else:
                post = Post(creator = user_id,content=content)
                db.session.add(post)
                db.session.commit()
                return jsonify({'status':'success','helper':'post-added'}),201

@view.route('user-posts/<int:user_id>',methods=['GET'])
@jwt_required(locations='cookies')
def user_posts(user_id):
    if not user_id:
        return jsonify({'status':'error','helper':'user_id-missing'})
    else:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'status':'error','helper':'user-dont-exists'})
        else:
            return jsonify({'status':'success','helper':Post.get_users_post(user_id)})

@view.route('/delete-post/<int:post_id>',methods=['DELETE'])
@jwt_required(locations='cookies')
def delete_post(post_id):
    
    post = Post.query.filter_by(id=post_id ,creator=current_user.id).first()
    if not post:
        return jsonify({'status':'error','helper':'post-dont-exists'})
    else:
       
        db.session.delete(post)
        db.session.commit()
        return jsonify({'status':'success','helper':'post has been deleted successfully'})

@view.route('/like-post',methods=['POST'])
@jwt_required(locations='cookies')
def liked_post():
    action = request.json.get('action',None)
    user_id =request.json.get('userId',None)
    post_id =request.json.get('postId',None)
    if not (user_id or post_id):
        return jsonify({'status':'error','helper':'invalid'})
    else:
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'status':'error','helper':'user-dont-exists'})
        else:
            like = Likes.query.filter_by(user_id=user_id,post_id=post_id).first()
            if like:
                db.session.delete(like)
                db.session.commit()
                return jsonify({'status':'success','helper':'remove'})
            else:    
                like =Likes(user_id =user_id,post_id=post_id)
                db.session.add(like)
                db.session.commit()
                return jsonify({'status':'success','helper':'add'})
           
                


@view.route('/add-comment',methods=['POST'])
@jwt_required(locations='cookies')
def add_comment():
    post_id = request.json.get('postId',None)
    comment = request.json.get('comment',None)
    user_id = request.json.get('userId',None)
    if not (user_id or comment or post_id):
        return jsonify({'status':'error','helper':'invalid'})
    else: 
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({'status':'error','helper':'user-dont-exists'})
        if post_id:
            post = Post.query.filter_by(id=post_id).first()
            if not post:
                return jsonify({'status':'error','helper':'post-dont-exists'})
            else:
                comment = Comment(comment=comment,user_id=user_id,post_id=post_id)
                db.session.add(comment)
                db.session.commit()
                return jsonify({'status':'success','helper':'comment-added'})