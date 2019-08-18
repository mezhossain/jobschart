Ext.define('Chart.model.Job', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'jobId',
        type: 'number'
    }, { 
        name: 'title',
        type: 'string' 
    }, {
        name: 'type',
        type: 'string' 
    }, {  
        name: 'category',
        type: 'string' 
    }, {
        name: 'location',
        type: 'string' 
    }, {
        name: 'vacancies',
        type: 'number' 
    }],
    idProperty: 'jobId'
});