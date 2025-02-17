class TextScramble {
    constructor() {
      this.chars = '';
      // Generate full ASCII character set (33-126)
      for (let i = 33; i <= 126; i++) {
        this.chars += String.fromCharCode(i);
      }
      this.targetElement = document.querySelector('#type1 h2 a');
      this.originalText = "A Climber's Guide to Chattanooga";
      this.update = this.update.bind(this);
      this.charShifts = new Array(this.originalText.length).fill(0); // Track shifts per character
      this.maxShifts = new Array(this.originalText.length).fill(0); // Target number of shifts
    }
  
    scramble() {
      const length = this.originalText.length;
      this.queue = [];
      this.charShifts = new Array(length).fill(0);
      
      // Set random target shifts between 7-15 for each character
      this.maxShifts = new Array(length).fill(0).map(() => 
        Math.floor(Math.random() * (15 - 7 + 1) + 7)
      );
      
      for (let i = 0; i < length; i++) {
        const to = this.originalText[i] || '';
        this.queue.push({ to });
      }
  
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
    }
  
    update() {
      let output = '';
      let complete = 0;
      
      // Update each character
      for (let i = 0; i < this.queue.length; i++) {
        const { to } = this.queue[i];
        
        if (this.charShifts[i] >= this.maxShifts[i]) {
          output += to;
          complete++;
        } else {
          output += this.chars[Math.floor(Math.random() * this.chars.length)];
          this.charShifts[i]++;
        }
      }
  
      this.targetElement.textContent = output;
  
      if (complete === this.queue.length) {
        return;
      }
  
      // Control animation speed - adjust the setTimeout delay to make shifts faster/slower
      setTimeout(() => {
        this.frameRequest = requestAnimationFrame(this.update);
      }, 60); // 50ms delay between shifts
    }
  }
  
  // Initialize and start the effect when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const scrambler = new TextScramble();
    scrambler.scramble();
    
    // Optional: Add click handler to replay animation
    scrambler.targetElement.addEventListener('click', (e) => {
      e.preventDefault();
      scrambler.scramble();
    });
  });