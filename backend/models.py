from sqlalchemy.sql.operators import desc_op
from . import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    first_name = db.Column(db.String(255),nullable=False)
    last_name = db.Column(db.String(225),nullable=False)
    email_id = db.Column(db.String(255),unique=True,nullable=False)
    bio = db.Column(db.Text,nullable=True)
    username = db.Column(db.String(25),nullable=False,unique=True)
    pword = db.Column(db.String(255),nullable=False)
    resistered_at = db.Column(db.DateTime,default=datetime.utcnow )

    #relationship
    post = db.relationship('Post',backref='user',lazy=True)
    comment = db.relationship('Comment',backref='user',lazy=True)
   
    @classmethod
    def get_users_posts(cls,id):
        user_posts = User.query.filter_by(id=id).first().post
        all_post = list()
        for post in user_posts:
            all_post.append({'id':post.id,'content':post.content,'created_at':post.created_at,'author':post.creator})
        return all_post


class Post(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    creator = db.Column(db.Integer,db.ForeignKey('user.id',ondelete='CASCADE'),nullable=False)
    created_at =  db.Column(db.DateTime,default=datetime.utcnow )
    content = db.Column(db.Text,nullable=False)

    #relationship
    comment = db.relationship('Comment',backref='post',lazy=True,passive_deletes=True)
    likes = db.relationship('Likes',backref='post',lazy=True,passive_deletes=True)

    #passive_delete suggests that we can make any non-direct delete
    #as we are deleting via relationships thus deleting indirectly

    @classmethod
    def get_all_post(cls):
        posts= Post.query.order_by(desc_op(Post.created_at)).all()
        all_post = list()
        for post in posts:
            all_post.append({'id':post.id,
            'creator':post.user.username,
            'created_at':post.created_at,
            'content':post.content,
            'like':[ like.user_id for like in post.likes],
            'likeCount':len(post.likes),
            'comment': [ 
                {'username':comment.user.username,'comment':comment.comment} for comment in post.comment[::-1]]
            })
        return all_post

    @classmethod
    def get_users_post(cls,user_id):
        posts= Post.query.order_by(desc_op(Post.created_at)).all()
        user_post = list()
        for post in posts:
            if post.creator == user_id:
                user_post.append({'id':post.id,
                'creator':post.user.username,
                'created_at':post.created_at,
                'content':post.content,
                'like':[ like.user_id for like in post.likes],
                'likeCount':len(post.likes),
                'comment': [ 
                    {'username':comment.user.username,'comment':comment.comment} for comment in post.comment[::-1]]
                })
        return user_post


# class Friend(db.Model):
#     id = db.Column(db.Integer,primary_key=True)
#     source_id = db.Column(db.Integer,db.ForeignKey('user.id',ondelete='CASCADE'),nullable=False)
#     target_id = db.Column(db.Integer,db.ForeignKey('user.id',ondelete='CASCADE'),nullable=False)
#     status = db.Column(db.String(50),default='REQUESTED')
#     created_at = db.Column(db.DateTime,default=datetime.utcnow )
#     updated_at = db.Column(db.DateTime,nullable=True)

class Comment(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    comment = db.Column(db.Text)
    post_id = db.Column(db.Integer,db.ForeignKey('post.id',ondelete='CASCADE'),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id',ondelete='CASCADE'),nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)

class Likes(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    action = db.Column(db.Boolean,default=True)
    post_id = db.Column(db.Integer,db.ForeignKey('post.id',ondelete='CASCADE'),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id',ondelete='CASCADE'),nullable=False)