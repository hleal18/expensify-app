//Para acceder a la función original, sin usar import (da error, porque usaria el mock y no el de node_module)
const moment = require.requireActual('moment');
//Version mock de la función moment.
export default (timestamp = 0) => {
    return moment(timestamp);
};