export const validationPatterns = {
    number: '^[0-9]+$',
    decimal: '[+-]?([0-9]*[.])?[0-9]+',
    email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/,
    name: '[a-zA-Z ,.]*',
    nameValidation: '[a-zA-Z .]*',
    extractNumber: /[-]{0,1}[\d]*[\.]{0,1}[\d]+/g,
    specialName: '[a-zA-Z ,.-]*',
    restrictSpecialChar: '^[a-zA-Z0-9]*$',
    maxPercentage: '^(100(\.00?)?|[1-9]?\d(\.\d\d?)?)$'
};

export const HTTP_ERRORS = [401, 500, 403];

export const notFound = 404;

export const customMessages = {
    errorMessage404: '404 error!!!'
}

export const API = {
    getConfiguration: 'assets/json/allData.json',
};

export const dateConfiguration: any = {
    placeholder: 'DD-MM-YYYY',
    dateFormat: 'dd-mm-yy',
    showIcon: 'true',
    dataType: 'date',
    monthNavigator: 'true',
    yearNavigator: 'true',
    yearRange: '1950:2050'
};

