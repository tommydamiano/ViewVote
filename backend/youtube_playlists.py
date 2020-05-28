from apiclient.discovery import build
from mySQL_classes import Video
from get_pics import get_video_pics
# https://www.youtube.com/playlist?list=PL8A83124F1D79BD4F

api_key = "-vraSjsdTNLtFmt03Vw4hXnDE"
youtube = build("youtube", "v3", developerKey= api_key)

# api_search = "AIzaSyC8WJDbuDjAzv8wBwHQyI_vob8Nh6s_HTg"
# custom_search = build('customsearch', 'v1', developerKey= api_search).cse()

def get_playlist_videos(playlist_id):
    videos = []
    next_page_token = None
    while True:
        request = youtube.playlistItems().list(playlistId= playlist_id, part= "snippet", maxResults= 50, pageToken = next_page_token).execute()
        videos += request['items']
        next_page_token = request.get('nextPageToken')
        if next_page_token is None:
            break
    return videos


if __name__ == '__main__':
    videos = get_playlist_videos('PL3KSpSIN4bbsd-g9DHBp7x2cHW_Sjt-EZhu')
    for video in videos:
        request = youtube.videos().list(id= video['snippet']['resourceId']['videoId'], part= 'statistics').execute()
        title = video['snippet']['title']
        views = request['items'][0]['statistics']['viewCount']
        video_id = video['snippet']['resourceId']['videoId']
        video_link = f'https://www.youtube.com/watch?v={video_id}'
        video_pic = get_video_pics(title)
        print(title)

        vid = Video(title=title, views=views, id=video_id, video_link=video_link, pic_link=video_pic)
        vid.insert()
