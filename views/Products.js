MyApp.products = function (params) {
    var skip = 0;
    var PAGE_SIZE = 10;
    var viewModel = {
        searchString: ko.observable(''),
        find: function () {
            viewModel.showSearch(!viewModel.showSearch());
            viewModel.searchString('');
        },
        showSearch: ko.observable(false),
        categoryId: params.id,
        dataSource: DevExpress.data.createDataSource({
            load: function (loadOptions) {
                if (loadOptions.refresh) {
                    skip = 0;
                }
                var deferred = new $.Deferred();
                $.get('http://sampleservices.devexpress.com/api/Products',
                    {
                        categoryId: viewModel.categoryId,
                        skip: skip,
                        take: PAGE_SIZE,
                        searchString: viewModel.searchString()
                    })
                .done(function (result) {
                    skip += PAGE_SIZE;
                    var mapped = $.map(result, function (data) {
                        return {
                            name: data.ProductName,
                            id: data.ProductID
                        };
                    });
                    deferred.resolve(mapped);
                });
                return deferred;
            }
        })
    };
    ko.computed(function () {
        return viewModel.searchString();
    }).extend({
        throttle: 500
    }).subscribe(function () {
        viewModel.dataSource.reload();
    });
    return viewModel;
};