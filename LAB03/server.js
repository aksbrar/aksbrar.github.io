const connect = require('connect');
const url = require('url');

const app = connect();

// Create calculate function
function calculate(req, res) {
    const queryObject = url.parse(req.url, true).query;

    const method = queryObject.method;
    const x = parseFloat(queryObject.x);
    const y = parseFloat(queryObject.y);

    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Validate parameters
    if (isNaN(x) || isNaN(y) || !method) {
        res.end("Error: Please provide valid parameters. Example: ?method=add&x=10&y=5");
        return;
    }

    let result;
    let symbol;

    switch (method) {
        case 'add':
            result = x + y;
            symbol = '+';
            break;
        case 'subtract':
            result = x - y;
            symbol = '-';
            break;
        case 'multiply':
            result = x * y;
            symbol = '*';
            break;
        case 'divide':
            if (y === 0) {
                res.end("Error: Division by zero is not allowed.");
                return;
            }
            result = x / y;
            symbol = '/';
            break;
        default:
            res.end("Error: Invalid method. Use add, subtract, multiply, or divide.");
            return;
    }

    res.end(`${x} ${symbol} ${y} = ${result}`);
}

// Route handler
app.use('/lab2', calculate);

// Listen on port 3000
app.listen(3000);

console.log("Server running at http://localhost:3000/lab2?method=add&x=16&y=4");
