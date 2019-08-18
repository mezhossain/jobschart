Ext.define('Chart.view.chart.Chart',{
    extend: 'Ext.chart.PolarChart',
    requires: ['Ext.chart.series.Pie'],
    xtype: 'jobchart',
    width: 600,
    height: 600,
    title: 'Chart',
    viewModel: 'main',
    bind: {
        store: '{Jobs}'
    },

    legend: {
        docked: 'right'
    },

    series: [{
        type: 'pie',
        xField: 'vacancies',
        label: {
            field: 'title'
        },
        donut: 30
    }]
});