// 1. ANTI-HANG SPEECH LOGIC (Optimized for sw.js)
// We add a listener to ensure speech clears the browser buffer before a new reply
self.addEventListener('message', (event) => {
    if (event.data.type === 'SPEAK') {
        // Clear any previous speech that might be "hanging" the app
        if ('speechSynthesis' in self) {
            self.speechSynthesis.cancel();
        }
        
        // Mobile browsers often pause audio; this ensures the teacher's voice wakes up
        if (self.speechSynthesis && self.speechSynthesis.paused) {
            self.speechSynthesis.resume();
        }
    }

    // 2. MEMORY & TAB CLEAR LOGIC
    if (event.data.type === 'CLOSE_GAME') {
        // Stop all speech immediately to free up audio hardware
        self.speechSynthesis.cancel();
        
        // Clear cached game data to free up RAM
        caches.delete('game-assets').then(() => {
            console.log('Memory cleared');
        });
    }
});
