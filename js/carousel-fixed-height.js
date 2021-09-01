document.addEventListener('DOMContentLoaded', () => {
    let throttleTimer = false;
    const throttle = (callback, time) => {
        if(throttleTimer) return;

        throttleTimer = true;
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    }

    let carousels = document.getElementsByClassName("carousel-fixed-height");
    for(carousel of carousels) {
        let items = carousel.getElementsByClassName("carousel-item");
        let resizeItems = () => {
            let maxHeight = 0;
            for(item of items) {
                maxHeight = Math.max(maxHeight, item.clientHeight);
            }
            
            for(item of items) {
                item.style.minHeight = `${maxHeight}px`;
            }
        }

        resizeItems();
        window.addEventListener('resize', () => { throttle(resizeItems, 200) });

        // TODO: Firefox reports a warning "Scroll anchoring was disabled in a scroll container because of too many consecutive adjustments..."
        // which then seems to disable my resize listener. Chrome doesn't do this at all, though!
    }
});