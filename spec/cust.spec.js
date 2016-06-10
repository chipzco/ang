describe('getFormattedCustomerInfo-async', function(){
	beforeEach(module('customer'));    
	/*
    var customerService;
    var customerFormattingService;
    var $q;
    var $scope;
   
    beforeEach(function(){    	
        inject( function($injector){
            customerService = $injector.get('customer-service');
            customerFormattingService = $injector.get('customer-formatting-service-async');
            $q = $injector.get('$q');
            $scope = $injector.get('$rootScope').$new();
        });
    });
    it('should return formatted customer information based on async call', function(done){
        spyOn(customerService,['getCustomerById']).and.returnValue($q.when({firstName:'Joe',lastName:'Smith',totalSales:50}));
        customerFormattingService.getFormattedCustomerInfo(1).then(function(formatted){
            expect(customerService.getCustomerById).toHaveBeenCalledWith(1);
            expect(formatted).toBe('Joe Smith Total Sales: $50');
            done();
        });
        $scope.$digest();
    });
    */
});
