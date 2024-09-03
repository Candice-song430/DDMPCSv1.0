import os
from datetime import datetime, timedelta

from flask import Blueprint
from flask import jsonify, request, make_response

user = Blueprint('user', __name__)
import jwt
users = {
    'admin-token': {
        'roles': ['admin'],
        'introduction': 'I am a super administrator',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        'name': 'Super Admin'
    },
    'editor-token': {
        'roles': ['editor'],
        'introduction': 'I am an editor',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        'name': 'Normal Editor'
    }
}
tokens = {
    'admin': {
        'token': 'admin-token'
    },
    'editor': {
        'token': 'editor-token'
    }
}


@user.route('/user/login', methods=['POST'])
def login():
    username = request.json.get('username')

    params = {

        'exp': datetime.utcnow() + timedelta(hours=2)
    }

    token = {
        'token': jwt.encode(payload=params, key=os.urandom(16), algorithm='HS256')
    }
    if token is None:
        return {
                   'message': 'Account and password are incorrect.'
               }, 60204

    else:
        res = {
            'data': token
        }
        return res


@user.route('/user/info', methods=['GET'])
def info():
    token = request.args.get('token')

    info = {
        'roles': ['admin'],
        'introduction': 'I am a super administrator',
        'avatar': 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F41%2F23%2F581346f2da494_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663752829&t=97535be0170dfb0bca71fc31c5121c8e',
        'name': 'Super Admin'
    }

    if info is None:
        return {
                   'message': 'Account and password are incorrect.'
               }, 508

    else:
        return {
            'data': info
        }


@user.route('/user/logout', methods=['POST'])
def logout():
    return {
        'data': 'success'
    }
