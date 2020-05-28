from selenium import webdriver 
from selenium.webdriver.common.keys import Keys
import pyautogui
from time import sleep

def get_video_pics(title):
    driver = webdriver.Chrome(executable_path='/Users/Driver/chromedriver')
    screenWidth, screenHeight = pyautogui.size()
    currentMouseX, currentMouseY = pyautogui.position()
    driver.get("https://www.google.com/imghp?hl=en")
    search_bar = driver.find_element_by_xpath('//*[@id="sbtc"]/div/div[2]/input')
    search_bar.send_keys(title)
    search_bar.send_keys(Keys.RETURN)
    tools = driver.find_element_by_xpath('//*[@id="yDmH0d"]/div[2]/c-wiz/div[1]/div/div[1]/div[2]/div[2]/div').click()
    sleep(0.5)
    size = driver.find_element_by_xpath('//*[@id="yDmH0d"]/div[2]/c-wiz/div[2]/c-wiz[1]/div/div/div[2]/div/div[1]').click()
    sleep(0.5)
    large = driver.find_element_by_xpath('//*[@id="yDmH0d"]/div[2]/c-wiz/div[2]/c-wiz[1]/div/div/div[3]/div/a[1]').click()
    sleep(0.5)
    pic = driver.find_element_by_xpath('//*[@id="islrg"]/div[1]/div[1]/a[1]/div[1]/img').click()
    # pic_to_click = driver.find_element_by_xpath('//*[@id="Sva75c"]/div/div/div[3]/div[2]/c-wiz/div[1]/div[1]/div/div[2]/a/img')
    sleep(0.5)
    pyautogui.moveTo(1000, 300)
    pyautogui.keyDown('ctrl')
    pyautogui.click()
    pyautogui.keyUp('ctrl')
    sleep(0.5)
    pyautogui.moveTo(1050, 430)
    sleep(0.5)
    pyautogui.click() 
    pyautogui.hotkey('option', 'command', 'right')
    sleep(0.5)
    window_after = driver.window_handles[1]
    sleep(0.5)
    driver.switch_to_window(window_after)
    url = driver.current_url
    driver.quit()
    print(url)
    return url
