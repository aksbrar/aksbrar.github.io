document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const styleSelector = document.getElementById('style-selector');
    const modal = document.getElementById('enlargement-modal');
    const colorPicker = document.getElementById('color-picker');
    const modalVisualPlaceholder = document.getElementById('modal-visual-placeholder');

    let currentModalShapeClass = '';

    // --- A. Dark/Day Mode Toggle ---
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Optional: Save preference to localStorage
        // localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- B. Style Selector ---
    styleSelector.addEventListener('change', (e) => {
        // Remove all style classes
        body.classList.remove('style-minimal', 'style-retro', 'style-neon');
        // Add the selected style class
        body.classList.add(`style-${e.target.value}`);
    });

    // --- C. Shape Click and Modal Logic ---
    window.openModal = function(shapeName) {
        const card = document.querySelector(`.shape-card[data-shape="${shapeName}"]`);
        
        if (!card) return; // Safety check

        const formula = card.getAttribute('data-formula');
        const defaultColor = card.getAttribute('data-color');
        
        // 1. Update Modal Content
        document.getElementById('modal-title').textContent = shapeName + " Exploration";
        document.getElementById('modal-formula').textContent = formula;
        document.getElementById('modal-description').textContent = `The ${shapeName} is a fundamental 2D figure. Its area formula is:`;
        colorPicker.value = defaultColor;

        // 2. Insert Animated Shape (The key feature for visual enlargement)
        modalVisualPlaceholder.innerHTML = ''; // Clear previous shape
        
        // Dynamically create the shape element
        const visualElement = document.createElement('div');
        visualElement.className = `animated-${shapeName.toLowerCase()} enlarged-shape`;
        
        // Remove old class and set new class for dynamic coloring
        if (currentModalShapeClass) {
            modalVisualPlaceholder.classList.remove(currentModalShapeClass);
        }
        currentModalShapeClass = `modal-${shapeName.toLowerCase()}`;
        modalVisualPlaceholder.classList.add(currentModalShapeClass);
        
        // Apply initial color to the new shape
        visualElement.style.backgroundColor = defaultColor;
        visualElement.style.borderColor = defaultColor;
        visualElement.style.boxShadow = `0 0 30px ${defaultColor}80`;

        modalVisualPlaceholder.appendChild(visualElement);
        
        // 3. Show Modal
        modal.style.display = 'flex';
        // Add active class for CSS transition/animation
        setTimeout(() => modal.classList.add('active'), 10); 
    }

    window.closeModal = function() {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300); // Wait for transition
    }
    
    // Close modal when clicking outside (on the overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- D. Live Customization (Color Picker) ---
    colorPicker.addEventListener('input', (e) => {
        const newColor = e.target.value;
        const enlargedShape = modalVisualPlaceholder.querySelector('.enlarged-shape');
        
        if (enlargedShape) {
            // Apply new color to the visual element
            enlargedShape.style.backgroundColor = newColor;
            enlargedShape.style.borderColor = newColor; 
            enlargedShape.style.boxShadow = `0 0 30px ${newColor}80`;
            
            // Special handling for the triangle border property
            if (enlargedShape.classList.contains('animated-triangle')) {
                enlargedShape.style.borderBottomColor = newColor;
            }
        }
    });


    // --- E. Calculation Functions (Your Original Logic) ---
    function parseValue(id) {
        const value = document.getElementById(id).value.trim();
        return parseFloat(value);
    }

    function setResult(id, result) {
        document.getElementById(id).value = isNaN(result) ? "Invalid Input" : result.toFixed(2);
    }
    
    window.getCircleArea = function() {
        const radius = parseValue("radius");
        const area = Math.PI * radius * radius;
        setResult("circle-area", area);
    }

    window.getTriangleArea = function() {
        const base = parseValue("triangle-base");
        const height = parseValue("triangle-height");
        const area = 0.5 * base * height;
        setResult("triangle-area", area);
    }

    window.getSquareArea = function() {
        const side = parseValue("square-side");
        const area = side * side;
        setResult("square-area", area);
    }

    window.getRectangleArea = function() {
        const width = parseValue("rectangle-width");
        const height = parseValue("rectangle-height");
        const area = width * height;
        setResult("rectangle-area", area);
    }

});