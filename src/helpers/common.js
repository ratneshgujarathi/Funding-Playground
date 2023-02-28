const moment = require('moment');

const insertCommonFields = (req) => {
    const commonFields = {
        'created_by': req.user || '',
        'created_at': moment.utc().date(),
        'updated_at': moment.utc().date(),
        'updated_by': req.user || ''
    }
    return commonFields;
}

module.exports = {insertCommonFields}