function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZSD_PRICE_CALCULATION_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}