(() => {
    const video = document.querySelector('.gameplay-video');
    if (!video) {
        return;
    }

    const source = video.querySelector('source');
    if (!source) {
        console.error('Không tìm thấy nguồn video trong index.html.');
        return;
    }

    const videoUrl = new URL('./vid.mp4', document.baseURI).href;
    if (source.src !== videoUrl) {
        source.src = videoUrl;
        video.load();
    }
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    function playVideo() {
        if (document.hidden || !video.paused) {
            return;
        }

        const playRequest = video.play();
        if (playRequest) {
            playRequest.catch(function (error) {
                if (error.name !== 'AbortError') {
                    console.error('Không thể phát vid.mp4:', error);
                }
            });
        }
    }

    video.addEventListener('loadeddata', playVideo, { once: true });
    video.addEventListener('error', function () {
        console.error('Không thể tải vid.mp4:', video.error);
    });
    document.addEventListener('visibilitychange', playVideo);

    playVideo();
})();
