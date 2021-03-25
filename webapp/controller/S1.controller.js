sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.iskur.sd.ZSDFiyatKosulRaporu.controller.S1", {
		onInit: function () {
			this.oSmartTable = this.byId("smartTable_ResponsiveTable");
			this.oSmartTable.attachBeforeRebindTable(this._beforeRebindTable);
			this.oSmartTable.getTable().setSticky(["ColumnHeaders", "InfoToolbar", "HeaderToolbar"]);
		},

		_beforeRebindTable: function (oEvent) {
			var oBindingParams = oEvent.getParameter("bindingParams");
			oBindingParams.parameters = oBindingParams.parameters || {};
			var kschl, vkorg;

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
		},

		onSearch: function (oEvent) {
			this.oSmartTable.rebindTable();
		},

		onKschlSelectionChange: function (oEvent) {
			//this.byId("idCustomVkorgComboBox").clearSelection();
			var sKschl = oEvent.getParameter("selectedItem").getText();
			if (sKschl === "ZHAM") {
				this.byId("idCustomVkorgComboBox").setEditable(true);
				this.byId("idVkorgItemT100").setEnabled(true);
				this.byId("idVkorgItemP100").setEnabled(false);
				this.byId("idVkorgItemP101").setEnabled(false);
			} else if (sKschl === "ZB01") {
				this.byId("idCustomVkorgComboBox").setEditable(true);
				this.byId("idVkorgItemT100").setEnabled(false);
				this.byId("idVkorgItemP100").setEnabled(true);
				this.byId("idVkorgItemP101").setEnabled(true);
			}
		}
	});
});