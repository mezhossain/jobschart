
Ext.define('Chart.view.main.MainController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.main',

	deleteJob() {
		Ext.Msg.confirm('Delete Confirm', 'Are you sure you want to delete this job?', this.onDeleteJobConfirm, this);
	},

	onDeleteJobConfirm(choice) {
		var me = this;
		if (choice === 'yes') {
			const selectedJob = this.getViewModel().get('selectedJob');
			selectedJob.erase({
				callback: e => {
					var deleteJob = {
						jobId: selectedJob.data.jobId,
						title: selectedJob.data.title,
						type: selectedJob.data.type,
						category: selectedJob.data.category,
						location: selectedJob.data.location,
						vacancies: selectedJob.data.vacancies
					};
					console.log(deleteJob);
					me.getStore('Jobs').load();
					Ext.Ajax.request({
						url: '/jobs/delete',
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json' },
						jsonData: Ext.util.JSON.encode(deleteJob),
						success: function (response) {
							var json = Ext.decode(response.responseText);
						},
						failure: function () {
							Ext.Msg.alert('Error', "Job was not deleted");
						},
					});
				}
			});
		}
	},
	onDoubleClick: function (dataview, record, item, index, e) {
		var thisInstance = this;
		var checkedData = record.data['location'];
		var Dhaka = checkedData.includes('Dhaka');
		var Chittagong = checkedData.includes('Chittagong');
		var Khulna = checkedData.includes('Khulna');
		var checkDhaka = true;
		var checkChittagong = true;
		var checkKhulna = true;
		console.log(Dhaka);
		Dhaka == true ? checkDhaka = true : checkDhaka = false;
		Chittagong == true? checkChittagong = true : checkChittagong = false;
		Khulna == true ? checkKhulna = true : checkKhulna = false;
		var updateForm = Ext.create('Ext.Window', {
			extend: 'Ext.window.Window',
			title: 'Update Job',
			iconCls: 'x-fa fa-plus',
			layout: 'form',
			xtype: 'form',
			width: 400,
			plain: true,
			jsonSubmit: true,
			url: '/jobs/update',

			items: [{
				xtype: 'textfield',
				fieldLabel: 'Job ID',
				name: 'jobId',
				value: record.data['jobId'],
				disabled: true
			},	{
				xtype: 'textfield',
				fieldLabel: 'Job Title',
				name: 'title',
				value: record.data['title']
			},	{
				xtype: 'combo',
				fieldLabel: 'Type',
				name: 'type',
				queryMode: 'local',
				valueField: 'typeAbbr',
				displayField: 'typeName',
				store: {
					fields: ['typeAbbr', 'typeName'],
					data: [{
						typeAbbr: 'P',
						typeName: 'Permanent'
					},	{
						typeAbbr: 'T',
						typeName: 'Temporary'
					},	{
						typeAbbr: 'I',
						typeName: 'Internship'
					}]
				},
				value: record.data['type']
			},	{
				xtype: 'textfield',
				fieldLabel: 'Category',
				name: 'category',
				value: record.data['category']
			},	{
				xtype: 'checkboxgroup',
				fieldLabel: 'Location',
				layout: 'vbox',
				items: [{
					boxLabel  : 'Dhaka',
					name      : 'location',
					inputValue: 'Dhaka ',
					id        : 'checkbox1',
					checked   : checkDhaka
				}, {
					boxLabel  : 'Chittagong',
					name      : 'location',
					inputValue: 'Chittagong ',
					id        : 'checkbox2',
					checked   : checkChittagong
				}, {
					boxLabel  : 'Khulna',
					name      : 'location',
					inputValue: 'Khulna ',
					id        : 'checkbox3',
					checked   : checkKhulna
				}],
			},	{
				xtype: 'textfield',
				fieldLabel: 'Vacancies',
				name: 'vacancies',
				value: record.data['vacancies']
			}],

			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				items: [{
					xtype: 'button',
					text: 'Cancel',
					handler: function () {
						updateForm.close();
					}
				}, '->', {
					xtype: 'button',
					text: 'Update',
					listeners: {
						click: function () {
							var newJobID = this.up('window').down('textfield[name=jobId]').getValue();
							var newJob = this.up('window').down('textfield[name=title]').getValue();
							var type = this.up('window').down('textfield[name=type]').getDisplayValue();
							var category = this.up('window').down('textfield[name=category]').getValue();
							var location = this.up('window').down('checkboxgroup').getValue();
							var vacancies = this.up('window').down('textfield[name=vacancies]').getValue();
							var locationArray = [];
							locationArray = location.location;
							var updatedRecord = thisInstance.getStore('Jobs').findRecord('jobId',newJobID);
							if (locationArray.length == 2 ||  locationArray.length == 3) {
								var joinedArray = locationArray.join(', ');
								var updatedJob = {
									jobId: newJobID,
									title: newJob,
									type: type,
									category: category,
									location: joinedArray,
									vacancies: vacancies
								};
								updatedRecord.set(updatedJob);
							} else {
								var updatedJob = {
									jobId: newJobID,
									title: newJob,
									type: type,
									category: category,
									location: locationArray,
									vacancies: vacancies
								};
								updatedRecord.set(updatedJob);
							};
							thisInstance.getStore('Jobs').load();
							Ext.Ajax.request({
								url: '/jobs/update',
								method: 'PUT',
								jsonData: Ext.util.JSON.encode(updatedJob),
								headers:
								{
									'Content-Type': 'application/json'
								},
								success: function (response) {
									var obj = Ext.decode(response.responseText);
									console.log(obj);
								},
								failure: function () {
									console.log("Failed");
								}
							});
							updateForm.close();
						}
					}
				}]
			}]
		}).show();
	},

	newJob() {
		var thisInstance = this;
		win = Ext.create('Ext.Window', {
			extend: 'Ext.window.Window',
			title: 'New Job',
			iconCls: 'x-fa fa-plus',
			layout: 'form',
			xtype: 'form',
			width: 400,
			plain: true,
			jsonSubmit: true,
			url: '/jobs/add',
			items: [
			{
					xtype: 'textfield',
					fieldLabel: 'Job Title',
					name: 'title'
			},	{
					xtype: 'combo',
					fieldLabel: 'Type',
					name: 'type',
					queryMode: 'local',
					valueField: 'typeAbbr',
					displayField: 'typeName',
					store: {
						fields: ['typeAbbr', 'typeName'],
						data: [{
							typeAbbr: 'P',
							typeName: 'Permanent'
						}, {
							typeAbbr: 'T',
							typeName: 'Temporary'
						}, {
							typeAbbr: 'I',
							typeName: 'Internship'
						}]
					},
			},	{
					xtype: 'textfield',
					fieldLabel: 'Category',
					name: 'category'
			},	{
					xtype: 'checkboxgroup',
					fieldLabel: 'Location',
					// defaultType: 'checkboxfield',
					layout: 'vbox',
					items: [{
						boxLabel  : 'Dhaka',
						name      : 'location',
						inputValue     : 'Dhaka',
						id        : 'checkbox1',
						checked   : true
					},	{
						boxLabel  : 'Chittagong',
						name      : 'location',
						inputValue     : 'Chittagong',
						id        : 'checkbox2'
					},	{
						boxLabel  : 'Khulna',
						name      : 'location',
						inputValue     : 'Khulna',
						id        : 'checkbox3'
					}],
			},	{
					xtype : 'textfield',
					fieldLabel: 'Vacancies',
					name: 'vacancies'
			}],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				items: [{
					xtype: 'button',
					text: 'Cancel',
					handler: function () {
						win.close();
					}
				}, '->', {
					xtype: 'button',
					text: 'Save',
					listeners: {
						click: function () {
							var newJobID = Math.floor(Math.random() * 100);
							var newJob = this.up('window').down('textfield[name=title]').getValue();
							var type = this.up('window').down('combo[name=type]').getDisplayValue();
							var category = this.up('window').down('textfield[name=category]').getValue();
							var location = this.up('window').down('checkboxgroup').getValue();
							var vacancies = this.up('window').down('textfield[name=vacancies]').getValue();
							var locationArray = [];
							locationArray = location.location;
							if (locationArray.length == 2 ||  locationArray.length == 3) {
								var joinedArray = locationArray.join(', ');
								var tempJob = {
									jobId: newJobID,
									title: newJob,
									type: type,
									category: category,
									location: joinedArray,
									vacancies: vacancies
								};
							} else {
								var tempJob = {
									jobId: newJobID,
									title: newJob,
									type: type,
									category: category,
									location: locationArray,
									vacancies: vacancies
								};
							}
							console.log(tempJob);
							thisInstance.getStore('Jobs').insert(newJobID, tempJob);
							thisInstance.getStore('Jobs').load();
							thisInstance.getView().refresh;
							Ext.Ajax.request({
								url: '/jobs/add',
								method: 'POST',
								jsonData: Ext.util.JSON.encode(tempJob),
								headers:
								{
									'Content-Type': 'application/json'
								},
								success: function (response) {
									var obj = Ext.decode(response.responseText);
								},
								failure: function () {
									Ext.Msg.alert('Error', "Job was not added");
								}
							});
							win.close();
						}
					}
				}]
			}]
		}).show();
	}
});
