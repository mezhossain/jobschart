
Ext.define('Chart.view.main.List', {
    extend: 'Ext.ux.LiveSearchGridPanel',
    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.ux.statusbar.StatusBar',
        'Ext.toolbar.Paging',
    ],
    xtype: 'mainlist',

    title: 'Jobs',
    controller: 'main',
    viewModel: { type: 'main' },
    bind: { store: '{Jobs}', selection: '{selectedJob}' },
    scrollable: true,

    columns: [
        { text: 'ID', dataIndex: 'jobId' },
        { text: 'Title', dataIndex: 'title', flex: 1, editor: { allowBlank: false }, sortable: true },
        { text: 'Type', dataIndex: 'type', flex: 1, editor: { allowBlank: false }, sortable: true },
        { text: 'Category', dataIndex: 'category', flex: 1, editor: { allowBlank: false }, sortable: true },
        { text: 'Location', dataIndex: 'location', flex: 1, editor: { allowBlank: false }, sortable: true },
        { text: 'Vacancies', dataIndex: 'vacancies', flex: 1, editor: { allowBlank: false }, sortable: true }
    ],

    listeners: {
        itemdblclick: 'onDoubleClick'
    }
});
