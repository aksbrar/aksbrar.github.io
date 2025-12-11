document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const styleSelector = document.getElementById('style-selector');
    const modal = document.getElementById('modal-overlay');
    const colorPicker = document.getElementById('color-picker');
    const modalVisual = document.getElementById('modal-visual-container');

    let currentModalShape = '';

    // --- 1. Mode & Style Logic ---
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    styleSelector.addEventListener('change', (e) => {
        body.classList.remove('style-elegant', 'style-nature');
        if(e.target.value !== 'soft') {
            body.classList.add(`style-${e.target.value}`);
        }
    });

    // --- 2. Modal Logic ---
    window.openModal = function(shape) {
        currentModalShape = shape;
        const card = document.querySelector(`.card[data-shape="${shape}"]`);
        const color = card.getAttribute('data-color');
        
        document.getElementById('modal-title').textContent = `${shape} Analysis`;
        colorPicker.value = color;

        // Set Formula Text
        let formulas = "";
        if(shape === 'Circle') formulas = "A = πr² | C = 2πr";
        if(shape === 'Triangle') formulas = "A = 0.5bh | P = a+b+c";
        if(shape === 'Square') formulas = "A = s² | P = 4s";
        if(shape === 'Rectangle') formulas = "A = wh | P = 2(w+h)";
        
        if(shape === 'Pentagon') formulas = "A ≈ 1.72s² | P = 5s";
        
        if(shape === 'Hexagon') formulas = "A ≈ 2.598s² | P = 6s";
        
        document.getElementById('modal-formula').textContent = formulas;

        // Create Enlarged Visual
        modalVisual.innerHTML = '';
        const div = document.createElement('div');
        div.className = `shape ${shape.toLowerCase()}-shape enlarged-shape`;
        
        applyShapeColor(div, shape, color);
        modalVisual.appendChild(div);
        modal.classList.add('active');
    };

    window.closeModal = function() {
        modal.classList.remove('active');
    };
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    // --- 3. Live Color ---
    colorPicker.addEventListener('input', (e) => {
        const shapeDiv = modalVisual.querySelector('.shape');
        if(shapeDiv) {
            applyShapeColor(shapeDiv, currentModalShape, e.target.value);
        }
    });

    function applyShapeColor(element, shape, color) {
        if(shape === 'Triangle') {
            element.style.borderBottomColor = color;
            element.style.filter = `drop-shadow(0 10px 10px ${color}66)`; 
        } else {
            element.style.backgroundColor = color;
            // Pentagons and Hexagons use clip-path so standard box-shadow behaves oddly
            if (shape === 'Pentagon' || shape === 'Hexagon') {
                element.style.filter = `drop-shadow(0 10px 10px ${color}66)`;
            } else {
                element.style.boxShadow = `0 10px 20px -5px ${color}`;
            }
        }
    }

    // --- 4. Math Logic ---
    function getValue(id) {
        const val = parseFloat(document.getElementById(id).value);
        return isNaN(val) ? 0 : Math.abs(val);
    }

    function output(id, val, unit, power=1) {
        const suffix = power === 2 ? '²' : '';
        document.getElementById(id).value = val === 0 ? '-' : `${val.toFixed(2)} ${unit}${suffix}`;
    }

    window.calculateCircle = function() {
        const r = getValue('radius');
        const unit = document.getElementById('circle-unit').value;
        if(r > 0) {
            output('circle-area', Math.PI * r * r, unit, 2);
            output('circle-circumference', 2 * Math.PI * r, unit);
        }
    };

    window.calculateTriangle = function() {
        const b = getValue('triangle-base');
        const h = getValue('triangle-height');
        const unit = document.getElementById('triangle-unit').value;
        if(b > 0 && h > 0) {
            output('triangle-area', 0.5 * b * h, unit, 2);
            output('triangle-perimeter', b + h + Math.sqrt(b*b + h*h), unit);
        }
    };

    window.calculateSquare = function() {
        const s = getValue('square-side');
        const unit = document.getElementById('square-unit').value;
        if(s > 0) {
            output('square-area', s * s, unit, 2);
            output('square-perimeter', 4 * s, unit);
        }
    };

    window.calculateRectangle = function() {
        const w = getValue('rectangle-width');
        const h = getValue('rectangle-height');
        const unit = document.getElementById('rectangle-unit').value;
        if(w > 0 && h > 0) {
            output('rectangle-area', w * h, unit, 2);
            output('rectangle-perimeter', 2 * (w + h), unit);
        }
    };

    window.calculatePentagon = function() {
        const s = getValue('pentagon-side');
        const unit = document.getElementById('pentagon-unit').value;
        if(s > 0) {
            output('pentagon-area', 1.72048 * s * s, unit, 2);
            output('pentagon-perimeter', 5 * s, unit);
        }
    };

    window.calculateHexagon = function() {
        const s = getValue('hexagon-side');
        const unit = document.getElementById('hexagon-unit').value;
        if(s > 0) {
            output('hexagon-area', 2.598076 * s * s, unit, 2);
            output('hexagon-perimeter', 6 * s, unit);
        }
    };
});