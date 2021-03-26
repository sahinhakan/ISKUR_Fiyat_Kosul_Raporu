sap.ui.define([
	"./BaseController",
	"sap/ui/model/Filter",
	"sap/ui/core/Fragment"
], function (BaseController, Filter, Fragment) {
	"use strict";

	return BaseController.extend("com.iskur.sd.ZSDFiyatKosulRaporu.controller.S1", {
		onInit: function () {
			this.oSmartTable = this.byId("smartTable_ResponsiveTable");
			this.oSmartTable.attachBeforeRebindTable(this._beforeRebindTable);
			//this.oSmartTable.getTable().setSticky(["ColumnHeaders", "InfoToolbar", "HeaderToolbar"]);
			this.oCustomDatabDatePicker = this.byId("idCustomDatabDatePicker");
			this.oCustomDatabDatePicker.setDateValue(new Date(new Date().getTime() - new Date().getTimezoneOffset()));
		},

		_beforeRebindTable: function (oEvent) {
			var oBindingParams = oEvent.getParameter("bindingParams");
			oBindingParams.parameters = oBindingParams.parameters || {};
			var kschl, vkorg, aWaerkKeys, datab, matnr;

			var oKschlCustomControl = this._oSmartFilter.getControlByKey("Kschl");
			if (oKschlCustomControl instanceof sap.m.ComboBox) {
				kschl = oKschlCustomControl.getSelectedKey();
				oBindingParams.filters.push(new sap.ui.model.Filter("Kschl", "EQ", kschl));

			}
			var oVkorgCustomControl = this._oSmartFilter.getControlByKey("Vkorg");
			if (oVkorgCustomControl instanceof sap.m.ComboBox) {
				vkorg = oVkorgCustomControl.getSelectedKey();
				oBindingParams.filters.push(new sap.ui.model.Filter("Vkorg", "EQ", vkorg));
			}
			var oWaerkCustomControl = this._oSmartFilter.getControlByKey("Waerk");
			if (oWaerkCustomControl instanceof sap.m.MultiComboBox) {
				aWaerkKeys = oWaerkCustomControl.getSelectedKeys();
				aWaerkKeys.forEach(key => {
					oBindingParams.filters.push(new sap.ui.model.Filter("Waerk", "EQ", key));
				})
			}
			var oDatabCustomDatePicker = this._oSmartFilter.getControlByKey("Datab");
			if (oDatabCustomDatePicker instanceof sap.m.DatePicker) {
				datab = new Date(oDatabCustomDatePicker.getDateValue().setHours(3));
				oBindingParams.filters.push(new sap.ui.model.Filter("Datab", "EQ", datab));
			}
			var oCustomMatnrInput = this._oSmartFilter.getControlByKey("Matnr");
			if (oCustomMatnrInput instanceof sap.m.Input) {
				matnr = oCustomMatnrInput.getValue();
				if (matnr)
					oBindingParams.filters.push(new sap.ui.model.Filter("Matnr", "EQ", matnr));
			}
		},

		onSearch: function (oEvent) {
			this.oSmartTable.rebindTable();
		},

		onMatnrVH: function () {
			if (!this._matnrDialog) {
				this._matnrDialog = sap.ui.xmlfragment(this.getView().getId() + "MatnrFragment",
					"com.iskur.sd.ZSDFiyatKosulRaporu.view.MatnrVH", this);
				this.getView().addDependent(this._matnrDialog);
				this.onSearchMatnr();
			}
			this._matnrDialog.open();
		},

		onSearchMatnr: function (oEvent) {
			var sSelectedVkorg = this.byId("idCustomVkorgComboBox").getSelectedKey();
			var sValue, oDialog;
			var aFilter = [new Filter("Vkorg", "EQ", sSelectedVkorg)];
			if (oEvent) {
				sValue = oEvent.getParameter("value");
				aFilter.push(new Filter("Matnr", "EQ", sValue));
				oDialog = oEvent.getSource();
			} else {
				oDialog = Fragment.byId(this.getView().getId() + "MatnrFragment", "idMatnrDialog");
			}

			oDialog.bindAggregation("items", {
				path: "/materialSet",
				filters: aFilter,
				factory: this.fnFactory4MatnrVH.bind(this)
			});

			/*sap.ui.core.BusyIndicator.show(500);
			this.getModel().read("/materialSet", {
				filters: aFilter,
				urlParameters: {
					"$skip": 0,
					"$top": 20
				},
				success: $.proxy(function (data, response) {
					sap.ui.core.BusyIndicator.hide();
					this.getModel("GM").setProperty("/Materials", data.results);
				}, this),
				error: $.proxy(function (oErr) {
					sap.ui.core.BusyIndicator.hide();
				}, this)
			});*/
		},

		fnFactory4MatnrVH: function () {
			var oStandartListItem = new sap.m.StandardListItem({
				title: "{Maktx}",
				description: "{Matnr}"
			});

			return oStandartListItem;
		},

		onConfirmMatnr: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var sValue = oSelectedItem.getBindingContext().getProperty("Matnr");
			var oInput = this.byId("idCustomMatnrInput");
			oInput.setValue(sValue);
		},

		onVkorgSelectionChange: function (oEvent) {
			//this.byId("idCustomVkorgComboBox").clearSelection();
			var oCustomKschlComboBox = this.byId("idCustomKschlComboBox");
			var sVkorg = oEvent.getParameter("selectedItem").getText();
			if (sVkorg === "P100" || sVkorg === "P101") {
				oCustomKschlComboBox.setSelectedKey("ZB01");
			} else {
				oCustomKschlComboBox.setSelectedKey("ZHAM");
			}
		}
	});
});