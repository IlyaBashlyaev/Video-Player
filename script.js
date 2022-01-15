const video = document.querySelector('video'),
      link = document.createElement('a')

var isPlayButtonClicked = false,
    currentTime = 0,
    currentVolume = 1,
    archivedVolume

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function checkOverflow(el) {
    var curOverflow = el.style.overflow

    if (!curOverflow || curOverflow === "visible")
        el.style.overflow = "hidden"

    var isOverflowing = el.clientWidth < el.scrollWidth 
        || el.clientHeight < el.scrollHeight

    el.style.overflow = curOverflow
    return isOverflowing
}

function checkSize() {
    const video = document.querySelector('video'),
          preview = document.querySelector('.preview')

    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight
    
    if (windowWidth > windowHeight / 0.5625) {
        video.style.height = '100vh'
        video.style.width = '177.778vh'

        preview.style.height = '100vh'
        preview.style.width = '177.778vh'
    }

    else {
        video.style.width = '100vw'
        video.style.height = '56.25vw'

        preview.style.width = '100vw'
        preview.style.height = '56.25vw'
    }
}
checkSize()

function showVideo() {
    var preview = document.querySelectorAll('section')[1]
    preview.classList.add('hid')

    var title = document.querySelector('title')
    title.innerText = 'ШКОЛЬНИК НЕЧЕГО НЕ СНИМАЛ И СТАЛ ПОПУЛЯРНЫМ! КАК ПРОЙТИ МАЙНКРАФТ БЕЗ МОЗГОВ? НЕ ВЫЖИВАНИЕ БОМЖА'

    var footer = document.querySelector('footer')
    footer.classList.add('showed')
}

var header_text = document.querySelector('.header_text'),
    headerSpan = document.querySelector('header > span'),
    isOverflowed = checkOverflow(header_text)

if (isOverflowed) {headerSpan.style.display = 'block'}
else {headerSpan.style.display = 'none'}

function showAccount() {
    const accountInfo = document.querySelector('.account_info')
    accountInfo.classList.add('active')
}

function hideAccount() {
    const accountInfo = document.querySelector('.account_info')
    accountInfo.classList.remove('active')
}

function getAccount() {
    link.href = 'https://www.youtube.com/channel/UCWp-5ZH1E444uZi_eLgiNcg'
    link.target = '_blank'
    link.click()
}

function playButtonClick() {
    const video = document.querySelector('video'),
          controlButton = document.querySelector('.control_button > div')

    if (controlButton.className == 'play_button') {
        video.play()
        controlButton.className = 'pause_button'
        controlButton.title = 'Pause (k)'
    }

    else if (controlButton.className == 'pause_button') {
        video.pause()
        controlButton.className = 'play_button'
        controlButton.title = 'Play (k)'
    }
}

async function volumeButtonClick(volume = null) {
    const video = document.querySelector('video'),
          volumeButton = document.querySelector('.volume_button > div'),
          volumeButtonPath = volumeButton.querySelector('path'),
          volumeSliderActive = document.querySelector('.volume_slider_active'),
          volumeAlert = document.querySelector('.inner_volume_alert'),
          volumeAlertText = volumeAlert.querySelector('span')
    volumeSliderActive.style.width = currentVolume * 100 + '%'

    volumeAlertText.innerText = Math.round(currentVolume * 100) + ' %'
    volumeAlert.classList.remove('hid')
    
    if (!currentVolume) {
        video.volume = 0
        volumeButton.className = 'volume_passive_button'
        volumeButton.title = 'Unmute (m)'
    }

    else {
        video.volume = currentVolume
        volumeButton.className = 'volume_active_button'
        volumeButton.title = 'Mute (m)'
    }

    if (currentVolume <= 0)
        volumeButtonPath.style.d = "path('M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z')"
    else if (currentVolume > 0 && currentVolume <= 0.5)
        volumeButtonPath.style.d = "path('M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z')"
    else if (currentVolume > 0.5)
        volumeButtonPath.style.d = "path('M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z')"

    await sleep(750);
    volumeAlert.classList.add('hid')
}

function preVolumeButtonClick() {
    if (currentVolume) {
        archivedVolume = currentVolume
        currentVolume = 0
    }
    
    else
        currentVolume = archivedVolume
    volumeButtonClick()
}

function resizeButtonClick() {
    const resizeButton = document.querySelector('.resize_button > div')

    if (resizeButton.className == 'resize_active_button') {
        document.documentElement.requestFullscreen()
        resizeButton.className = 'resize_passive_button'
        resizeButton.title = 'Exit full screen (f)'
    }
    
    else if (resizeButton.className == 'resize_passive_button') {
        document.exitFullscreen()
        resizeButton.className = 'resize_active_button'
        resizeButton.title = 'Full screen (f)'
    }
}

function createTime(allTime) {
    var dividers = [60, 60, 24],
        timeArray = [],
        breakСycle = false

    while (allTime && dividers.length) {
        if (dividers.length == 1) {var item = allTime}
        else {var item = allTime % dividers[0]}
        item = Math.floor(item)
    
        if (item < 10 && dividers.length > 1) {item = '0' + item}
        else if (item == 0 && dividers.length == 1) {break}
        else {item += ''}
    
        timeArray.push(item)
        allTime /= dividers[0]
        dividers.splice(0, 1)
    }
    
    while (timeArray.length < 2) {
        timeArray.push('00')
        timeArray.push('00')
    }

    timeArray.reverse()
    return timeArray
}
const durationArray = createTime(video.duration)

function setTimelineText() {
    const timelineContentText = document.querySelector('.timeline_content_text')
    var currentTimeArray = createTime(video.currentTime),
        result = ''

    for (var index = 0; index < currentTimeArray.length; index++) {
        result += currentTimeArray[index]
        if (index == currentTimeArray.length - 1) {break}
        result += ':'
    }

    result += ' / '
    for (var index = 0; index < durationArray.length; index++) {
        result += durationArray[index]
        if (index == durationArray.length - 1) {break}
        result += ':'
    }

    timelineContentText.innerText = result
}
setTimelineText()

function showTitleMessage(el) {
    const titleBlock = document.querySelector('.title_block'),
          titleMessage = titleBlock.querySelector('.title_message'),
          span = titleMessage.querySelector('span')
    
    titleBlock.style.zIndex = '2'
    span.innerText = el.title

    const elWidth = el.offsetWidth,
          {left} = el.getBoundingClientRect(),
          titleMessageWidth = span.offsetWidth + 20

    titleMessage.style.width = titleMessageWidth + 'px'
    const titleMessageLeft = left - (titleMessageWidth - elWidth) / 2

    if (titleMessageLeft < 20)
        titleMessage.style.marginLeft = '20px'
    else if (titleMessageLeft + titleMessageWidth > window.innerWidth - 20)
        titleMessage.style.marginLeft = window.innerWidth - titleMessageWidth - 20 + 'px'
    else
        titleMessage.style.marginLeft = titleMessageLeft + 'px'
}

function hideTitleMessage() {
    const titleBlock = document.querySelector('.title_block'),
          titleMessage = titleBlock.querySelector('.title_message')
    
    titleBlock.style.zIndex = '-1'
    titleMessage.style.width = '0px'
}

function moveTimeline(e) {
    const timelineWidth = timeline.offsetWidth,
          timelineGrey = timeline.querySelector('.timeline_grey'),
          percent = (e.clientX - 20) / timelineWidth
    timeline.classList.add('active')

    if (isMouseDown || e.pointerId) {
        const activeTimeline = timeline.querySelector('.active_timeline'),
              video = document.querySelector('video')

        timelineGrey.style.zIndex = '-1'
        activeTimeline.style.width = percent * 100 + '%'
        video.currentTime = percent * video.duration
    }

    else {
        timelineGrey.style.zIndex = '0'
        timelineGrey.style.width = percent * 100 + '%'
    }
}

function moveVolumeSliderBlock(e) {
    if (isMouseDown || e.pointerId) {
        const volumeSliderWidth = volumeSlider.offsetWidth,
              volumeSliderActive = volumeSlider.querySelector('.volume_slider_active'),
              {left} = volumeSlider.getBoundingClientRect()
              percent = (e.clientX - left) / volumeSliderWidth

        if (percent >= 0 && percent < 1) {
            currentVolume = percent
            percent == 0 ? volumeButtonClick(0) : volumeButtonClick(1)
            volumeSliderActive.style.width = percent * 100 + '%'
        }
        
        else if (percent >= 1) {
            currentVolume = 1
            volumeButtonClick(1)
            volumeSliderActive.style.width = '100%'
        }
    }
}

async function showCenterAlert(key) {
    const controlButton = document.querySelector('.control_button > div'),
          volumeButton = document.querySelector('.volume_button > div'),
          centerAlert = document.querySelector('.inner_center_alert'),
          centerAlertSvg = centerAlert.querySelector('svg')
          centerAlertPath = centerAlertSvg.querySelector('path')

    if (key == 'k') {
        if (controlButton.className == 'play_button')
            centerAlertPath.setAttribute('d', 'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z')
        
        else if (controlButton.className == 'pause_button')
            centerAlertPath.setAttribute('d', 'M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z')
    }

    if (key == 'm') {
        if (volumeButton.className == 'volume_active_button')
            centerAlertPath.setAttribute('d', 'M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z M19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z')

        else if (volumeButton.className == 'volume_passive_button')
            centerAlertPath.setAttribute('d', 'M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z')
    }

    centerAlert.classList.remove('active')
    await sleep(50)
    centerAlert.classList.add('active')
}

video.addEventListener('timeupdate', e => {
    const activeTimeline = document.querySelector('.active_timeline'),
          currentTime = e.target.currentTime

    activeTimeline.style.width = currentTime / video.duration * 100 + '%'
    e.target.ended ? playButtonClick() : null

    setTimelineText()
})

document.addEventListener('mousemove', e => {
    const header = document.querySelector('header'),
          footer = document.querySelector('footer')

    if (e.clientX <= 10 || e.clientX >= window.innerWidth - 11) {
        document.body.style.cursor = 'none'
        header.style.opacity = '0'
        footer.style.opacity = '0'
    }

    else {
        document.body.style.removeProperty('cursor')
        header.style.opacity = '1'
        footer.style.opacity = '1'
    }
})

const timeline = document.querySelector('.timeline')
var isMouseDown = false

document.addEventListener('mousedown', () => {
    isMouseDown = true
})

document.addEventListener('mouseup', () => {
    isMouseDown = false
})

timeline.addEventListener('mouseout', () => timeline.classList.remove('active'))
timeline.addEventListener('mousemove', moveTimeline)
timeline.addEventListener('click', moveTimeline)

const volumeSliderBlock = document.querySelector('.volume_slider_block')
      volumeSlider = volumeSliderBlock.querySelector('.volume_slider')

volumeSliderBlock.addEventListener('mousemove', moveVolumeSliderBlock)
volumeSliderBlock.addEventListener('click', moveVolumeSliderBlock)

const volumeParentBlock = document.querySelector('.volume_parent_block')
volumeParentBlock.addEventListener('mousemove', () => {
    const volumeParentBlock = document.querySelector('.volume_parent_block'),
          volumeSliderBlock = volumeParentBlock.querySelector('.volume_slider_block'),
          volumeSliderThumb = volumeSliderBlock.querySelector('.volume_slider_thumb')

    volumeParentBlock.style.width = '160px'
    volumeSliderBlock.style.width = '80px'
    volumeSliderThumb.style.transform = 'scale(2)'
})

volumeParentBlock.addEventListener('mouseout', () => {
    const volumeParentBlock = document.querySelector('.volume_parent_block'),
          volumeSliderBlock = volumeParentBlock.querySelector('.volume_slider_block'),
          volumeSliderThumb = volumeSliderBlock.querySelector('.volume_slider_thumb')

    volumeParentBlock.style.width = '80px'
    volumeSliderBlock.style.width = '0px'
    volumeSliderThumb.style.transform = 'scale(0)'
})

document.addEventListener('click', e => {
    const parentEl = document.querySelector('.settings_button'),
          el = e.target
    var settingsClicked = false

    if (el.tagName == 'svg') {
        if (el.parentNode.className == 'settings_button')
            settingsClicked = true
    }

    else if (el.tagName == 'path') {
        if (el.parentNode.parentNode.className == 'settings_button')
            settingsClicked = true
    }

    settingsClicked ? parentEl.style.transform = 'rotate(30deg)' : parentEl.style.removeProperty('transform')
})

document.addEventListener('keydown', e => {
    const preview = document.querySelectorAll('section')[1]

    if (preview.classList.contains('hid')) {
        const video = document.querySelector('video')

        if (e.code == 'KeyK' || e.code == 'Space') {
            playButtonClick()
            if (e.code == 'KeyK')
                showCenterAlert('k')
        }

        if (e.code == 'KeyM') {
            preVolumeButtonClick()
            showCenterAlert('m')
        }
        
        if (e.code == 'KeyJ')
            video.currentTime -= 10
        
        if (e.code == 'KeyL') {
            if (video.duration - video.currentTime <= 10) {
                video.currentTime = video.duration - 0.5
                playButtonClick()
            }
            
            else
                video.currentTime += 10
        }
        
        if (e.code == 'KeyA' || e.code == 'ArrowLeft')
            video.currentTime -= 5
        
        if (e.code == 'KeyD' || e.code == 'ArrowRight') {
            if (video.duration - video.currentTime <= 5) {
                video.currentTime = video.duration - 0.5
                playButtonClick()
            }
            
            else
                video.currentTime += 5
        }

        if (e.code == 'ArrowUp') {
            if (currentVolume <= 0.95) {
                currentVolume += 0.05
                currentVolume = Math.round(currentVolume * 100) / 100
            }

            else {currentVolume = 1}
            volumeButtonClick()
        }

        if (e.code == 'ArrowDown') {
            if (currentVolume >= 0.05) {
                currentVolume -= 0.05
                currentVolume = Math.round(currentVolume * 100) / 100
            }

            else {currentVolume = 0}
            volumeButtonClick()
        }
    }

    if (e.code == 'KeyF' || e.code == 'MediaTrackNext') {
        resizeButtonClick()
    }
})

window.addEventListener('resize', () => {
    checkSize()

    header_text = document.querySelector('.header_text')
    headerSpan = document.querySelector('header > span')
    isOverflowed = checkOverflow(header_text)

    if (isOverflowed) {headerSpan.style.display = 'block'}
    else {headerSpan.style.display = 'none'}
})