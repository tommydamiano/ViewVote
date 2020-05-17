from bs4 import BeautifulSoup
import requests
import re
from apiclient.discovery import build
from mySQL_classes import Video
from get_pics import get_video_pics
from youtube_playlists import get_playlist_videos

api_key = "AIzaSyCwqHjKdIq1ubrBr8Kv3XAOshyaePaZrWM"
youtube = build("youtube", "v3", developerKey= api_key)

videos = get_playlist_videos('PLH0OZUK8fu2ZzrCTGtC6R0upE3Di9h7bc')

for video in videos:
    request = youtube.videos().list(id= video['snippet']['resourceId']['videoId'], part= 'statistics').execute()
    video_id = video['snippet']['resourceId']['videoId']
    video_link = f'https://www.youtube.com/watch?v={video_id}'
    source = requests.get(video_link).text
    soup = BeautifulSoup(source, 'lxml') 
    try:
        title_tag = str(soup.find('meta'))
        views_tag = soup.find("div", class_="watch-view-count").text
        title = re.findall(r'content="(.*)" name', title_tag)[0]
        if title == 'noindex':
            continue
        views = re.findall(r'(.*[0-9])', views_tag)[0].replace(',', '')
        video_pic = get_video_pics(title)
        vid = Video(title=title, views=views, id=video_id, video_link=video_link, pic_link=video_pic)
        vid.insert()
    except:
        print('Data Not Available', '\n')
