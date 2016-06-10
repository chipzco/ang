angular.module('customer',[]);
angular.module('customer').factory('customer-formatting-service-async',['customer-service',
   function(customerService){
		function getFormattedCustomerInfo(customerId){
			return customerService.getCustomerById(customerId)
				.then(function(customer){
						return customer.firstName + ' ' + customer.lastName + ' Total Sales: $' + customer.totalSales;
				})
            .catch(function(e){
                return {error:e};
            });
        }
        return {getFormattedCustomerInfo:getFormattedCustomerInfo};
    }
]);



angular.module('customer').factory('customer-service',['$timeout',
    function($timeout){
 		function getCustDummy(){
 			return {
 				firstName: "Hello",
 				lastName: "TherePerson",
 				totalSales:34.232
 			};
 		}
       
 		function getCustomerById(customerId)  {
 			return $timeout(getCustDummy,5);
 		} 		
 		
 		return {getCustomerById:getCustomerById}; 		
	}
 ]);