(() => {
    'use strict';
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hiện dần khi cuộn (landing + từng thẻ phim)
    const targets = $$('.reveal, .grid-demo > div');
    $$('.grid-demo > div').forEach((el, i) => el.style.transitionDelay = (i % 3) * 90 + 'ms');
    if ('IntersectionObserver' in window && !reduce) {
        const io = new IntersectionObserver(es => es.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
        targets.forEach(t => io.observe(t));
    } else targets.forEach(t => t.classList.add('in'));

    // Đếm số
    $$('[data-count]').forEach(el => {
        const end = +el.dataset.count, suf = el.dataset.suffix || '';
        const run = () => {
            if (reduce) { el.textContent = end + suf; return; }
            const t0 = performance.now(), dur = 1400;
            (function tick(t) {
                const p = clamp((t - t0) / dur, 0, 1);
                el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
                if (p < 1) requestAnimationFrame(tick);
            })(t0);
        };
        new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { run(); o.disconnect(); } }).observe(el);
    });

    // Nghiêng thẻ hồ sơ theo chuột
    const card = $('.tilt');
    if (card && !reduce && matchMedia('(hover:hover)').matches) {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => card.style.transform = '');
    }

    // Cảnh tách lớp: tiến độ cuộn -> dịch/ mờ từng lớp + đổi chữ
    const journey = $('[data-journey]');
    const layers = journey ? $$('.reel .layer', journey) : [];
    const titleEl = journey && $('[data-journey-title]', journey);
    const textEl = journey && $('[data-journey-text]', journey);
    const stepEls = journey ? $$('[data-journey-steps] li', journey) : [];
    const copy = [
        ['Một cuộn phim trông đơn giản.', 'Nhưng bên trong là nhiều lớp chồng lên nhau, mỗi lớp một nhiệm vụ. Cuộn xuống để tách cuộn phim ra từng lớp.'],
        ['Lớp ngoài cùng: màn hình.', 'Phần khán giả nhìn thấy đầu tiên. Poster, tên phim và xếp hạng quyết định có bấm vào xem hay không.'],
        ['Dưới đó là hình ảnh.', 'Từng khung hình ghép lại thành chuyển động. Mỗi phim trong CSDL có một ảnh poster lưu trong thư mục wwwroot/images.'],
        ['Kế tiếp: âm thanh và thể loại.', 'Thể loại giúp bạn lọc đúng gu: hành động, viễn tưởng, tình cảm… tất cả lấy từ bảng Genres.'],
        ['Lõi: khán giả của bạn.', 'Chọn phim, bỏ vào giỏ, thanh toán. Một suất chiếu chỉ thật sự hoàn chỉnh khi có người xem. Kéo xuống chọn phim thôi!']
    ];
    let curStep = -1;
    function setStep(i) {
        if (i === curStep || !titleEl) return;
        curStep = i;
        titleEl.classList.add('swap'); textEl.classList.add('swap');
        setTimeout(() => {
            titleEl.textContent = copy[i][0]; textEl.textContent = copy[i][1];
            titleEl.classList.remove('swap'); textEl.classList.remove('swap');
        }, 180);
        stepEls.forEach((li, k) => li.classList.toggle('on', k === i));
    }

    const header = $('#siteHeader'), bar = $('#scrollProgress'), toTop = $('#toTop');
    const parallax = $$('[data-speed]');
    let ticking = false;
    function frame() {
        ticking = false;
        const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
        if (header) header.classList.toggle('scrolled', y > 30);
        if (toTop) toTop.classList.toggle('show', y > 700);
        if (!reduce) parallax.forEach(el => {
            const base = el.classList.contains('strip-l') ? 'rotate(8deg)' : el.classList.contains('strip-r') ? 'rotate(-8deg)' : '';
            el.style.transform = `translate3d(0, ${y * parseFloat(el.dataset.speed)}px, 0) ${base}`;
        });
        if (journey) {
            const r = journey.getBoundingClientRect();
            const p = clamp(-r.top / (r.height - innerHeight), 0, 1);
            setStep(Math.min(4, Math.floor(p * 5)));
            // Tách lớp (exploded view) rồi lắp lại ở bước cuối
            const ease = t => t * t * (3 - 2 * t);
            const open = p < .8 ? ease(clamp(p / .55, 0, 1)) : 1 - ease(clamp((p - .8) / .2, 0, 1));
            const reel = $('.reel', journey);
            reel.style.transform = `perspective(1100px) rotateX(${open * 56}deg) rotateZ(${open * -8}deg)`;
            layers.forEach((g, idx) => {
                g.style.transform = `translateY(${(idx - 2) * open * 78}px)`;
                const focus = curStep >= 1 && curStep <= 4 && open > .5;
                g.style.opacity = focus && idx !== curStep - 1 ? '.38' : '1';
            });
        }
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    frame();
})();
