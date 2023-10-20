const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT || 3333, () => console.log('Server running on port ' + process.env.PORT || 3333))