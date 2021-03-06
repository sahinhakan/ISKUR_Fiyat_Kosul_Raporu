sap.ui.define([
	"./CoreService",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function (CoreService, Sorter, Filter) {
	"use strict";

	var NorthwindService = CoreService.extend("com.iskur.sd.ZSD_Fiyatlandirma.service.NorthwindService", {
		getItemByRefNoWithExpand: function (sRefNo) {
			var mParameters = {
				filters: [new Filter("FytRefNo", "EQ", sRefNo)],
				urlParameters: {
					"$expand": "headertosertifika,headertohammadde,headertoreturn"
				}
			};
			return this.odata("/headerSet").get(mParameters);
		},
		getListWithExpand: function () {
			var mParameters = {
				urlParameters: {
					"$expand": "headertosertifika,headertohammadde,headertoreturn"
				}
			};
			return this.odata("/headerSet").get(mParameters);
		},
		getEntitySet: function (sEntityName) {
			return this.odata(`/${sEntityName}`).get();
		},
		getTorsiyonSet: function () {
			return this.odata("/torsiyonSet").get();
		},
		getSuppliers: function () {
			return this.odata("/Suppliers").get();
		},
		simulate: function (oPostData) {
			return this.odata("/headerSet").post(oPostData);
		},
		save: function (oPostData) {
			return this.odata("/headerSet").post(oPostData);
		},

		//bunlar örnek
		getSuppliersWithFilter: function (aFilters) {
			var mParameters = {
				filters: aFilters
			};
			return this.odata("/Suppliers").get(mParameters);
		},
		getSupplierById: function (id) {
			var sObjectPath = this.model.createKey("Suppliers", {
				ID: id
			});
			return this.odata("/" + sObjectPath).get();
		},
		geSupplierNextID: function () {
			var mParameters = {
				sorters: [new Sorter("ID", true)],
				urlParameters: "$top=1"
			};
			return this.odata("/Suppliers").get(mParameters).then(function (response) {
				return response.data.results && response.data.results.length > 0 ? response.data.results[0].ID + 1 : 0;
			});
		},
		createSupplier: function (oSupplier) {
			return this.odata("/Suppliers").post(oSupplier);
		}
	});
	return new NorthwindService();
});