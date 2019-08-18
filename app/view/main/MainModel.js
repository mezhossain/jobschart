Ext.define('Chart.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Chart',
        selectedJob: null,
    },
    stores: {
        Jobs: {
            model: 'Chart.model.Job',
            autoLoad: true,
            pageSize: 0,
            remoteSort: false,
            remoteFilter: false,
            autoSync: true,
            proxy : {
                type : 'rest',
                url: '/jobs',
                reader : {
                    type: 'json',
                    rootProperty : 'jobs'
                },
                writer : {
                    writeAllFields : true
                }
            } 
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});
