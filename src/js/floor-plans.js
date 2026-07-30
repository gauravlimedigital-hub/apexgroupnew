const fpModal = document.getElementById('floor-plan-modal');
const fpModalImg = document.getElementById('fp-modal-img');
const fpModalTitle = document.getElementById('fp-modal-title');
const fpDownloadBtn = document.getElementById('fp-download-btn');

let currentZoom = 1;
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;

window.pendingFloorPlanImg = null;
window.pendingFloorPlanTitle = null;

function openFloorPlanAccessModal() {
    const commonModal = document.getElementById('private-viewing-modal');
    if (commonModal) {
        const subMsg = document.getElementById('common-modal-success-sub');
        if (subMsg) subMsg.textContent = "Unlocking floor plan and downloading brochure...";
        commonModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const firstInput = commonModal.querySelector('input[name="name"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
}

function closeFloorPlanAccessModal() {
    const commonModal = document.getElementById('private-viewing-modal');
    if (commonModal) {
        commonModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openFloorPlanModal(imageSrc, title) {
    if (!fpModal) return;
    
    // Check if user has unlocked floor plans or brochures
    const isUnlocked = sessionStorage.getItem('elyriaFloorPlanUnlocked') === 'true' || 
                       sessionStorage.getItem('elyriaBrochureUnlocked') === 'true';
                       
    if (!isUnlocked) {
        window.pendingFloorPlanImg = imageSrc;
        window.pendingFloorPlanTitle = title;
        openFloorPlanAccessModal();
        return;
    }

    fpModalImg.src = imageSrc;
    fpModalTitle.textContent = title;
    fpDownloadBtn.href = imageSrc;
    fpModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset transforms
    currentZoom = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

function closeFloorPlanModal() {
    if (!fpModal) return;
    fpModal.classList.remove('active');
    document.body.style.overflow = '';
}

function zoomInFloorPlan() {
    currentZoom = Math.min(currentZoom + 0.5, 4);
    updateTransform();
}

function zoomOutFloorPlan() {
    currentZoom = Math.max(currentZoom - 0.5, 0.5);
    updateTransform();
}

function fullscreenFloorPlan() {
    if (!document.fullscreenElement) {
        if (fpModal.requestFullscreen) {
            fpModal.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function updateTransform() {
    if (fpModalImg) {
        fpModalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    }
}

if (fpModalImg) {
    fpModalImg.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        fpModalImg.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        fpModalImg.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    // Touch support for dragging
    fpModalImg.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        }
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches.length === 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateTransform();
        }
    }, { passive: false });

    // Mouse wheel zoom
    fpModalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomStep = 0.15;
        if (e.deltaY < 0) {
            currentZoom = Math.min(currentZoom + zoomStep, 4);
        } else {
            currentZoom = Math.max(currentZoom - zoomStep, 0.5);
        }
        updateTransform();
    }, { passive: false });
}

// Close modal when clicking outside image
if (fpModal) {
    fpModal.addEventListener('click', (e) => {
        if (e.target === fpModal || e.target.classList.contains('fp-modal-body')) {
            closeFloorPlanModal();
        }
    });
}
