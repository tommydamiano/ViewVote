from flask import Flask, jsonify, request
from flask_cors import CORS
from mySQL_classes import User, Video
import re

app = Flask(__name__)
CORS(app)
 
@app.route('/api/create', methods=['POST'])
def create_account():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        profile_pic = data.get('profile_pic')
        print(profile_pic)
        email = data.get('email')
        regex_pattern = '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
        if not re.search(regex_pattern, email):
            return jsonify({'message': 'Not a valid email address ya dingus! Please try again'})
        password_hash = User.hash_password(password)
        user = User(username= username, password_hash= password_hash, email= email, profile_pic=profile_pic, high_score= 0, games_played= 0)
        user.insert()
        return jsonify({'message': 'Account Created! Sign in to start playing!'})
    except:
        return jsonify({'message': 'Username or Email is already taken, please try again!'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    password_hash = User.hash_password(password)
    user = User.login(email, password_hash)
    if user:
        return jsonify({'message': 'Login Successful! Return to the main menu to start a game, {}!'.format(user[1]), 'user': user[1]})
    return jsonify({'message': 'Sorry, no info associated with that account. Please try again!'})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    entries = User.get_leaderboard()
    return jsonify({'entrants': entries})

@app.route('/api/profile_picture', methods=['GET', 'POST'])
def profile_picture():
    data = request.get_json()
    username = data.get('username')
    pic = User.get_profile_pic(username)
    return jsonify({'pic': pic})

@app.route('/api/get_starting_videos', methods=['GET'])
def get_starting_videos():
    starting_videos = Video.get_initial_videos()
    return jsonify({'videos': starting_videos})

@app.route('/api/get_new_video', methods=['POST'])
def get_new_video():
    data = request.get_json()
    video_list = data.get('videoList')
    print(video_list)
    new_video = Video.get_another_video(video_list)
    return jsonify({'newVideo': new_video})

@app.route('/api/get_high_score', methods=['POST'])
def get_high_score():
    data = request.get_json()
    username = data.get('username')
    high_score = User.get_high_score(username)
    print(high_score)
    return jsonify({'highScore': high_score})

@app.route('/api/update_high_score', methods=['POST'])
def update_high_score():
    data = request.get_json()
    username = data.get('username')
    high_score = data.get('high_score')
    score = User.get_high_score(username)
    if high_score > score[0]:
        User.update_high_score(username, high_score)
        score = User.get_high_score(username)
    games_played = User.get_games_played(username)[0]
    games_played += 1
    User.update_games_played(username, games_played)
    return jsonify({'highScore': score})

if __name__ == '__main__':
    app.run(debug=True)
