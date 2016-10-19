/*You have to include this js file into Views/Product/Index.cshtml to make the actions on that page works*/

$(document).ready(function () {
    getProducts();
});

// Declare a variable to check when the action is Insert or Update
var isUpdateable = false;

// Get products list, by default, this function will be run first for the page load
function getProducts() {
    $.ajax({
        url: '/Product/GetProducts/',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var rows = '';
            $.each(data, function (i, item) {
                rows += "<tr>"
                rows += "<td>" + item.Id + "</td>"
                rows += "<td>" + item.Name + "</td>"
                rows += "<td>" + item.Price + "</td>"
                rows += "<td><button type='button' id='btnEdit' class='btn btn-default' onclick='return getProductById(" + item.Id + ")'>Edit</button> <button type='button' id='btnDelete' class='btn btn-danger' onclick='return deleteProductById(" + item.Id + ")'>Delete</button></td>"
                rows += "</tr>";
                $("#listProducts tbody").html(rows);
            });
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Get product by id
function getProductById(id) {
    $("#title").text("Product Detail");
    $.ajax({
        url: '/Product/Get/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#Id").val(data.Id);
            $("#Name").val(data.Name);
            $("#Price").val(data.Price);
            isUpdateable = true;
            $("#productModal").modal('show');
        },
        error: function (err) {
            alert("Error: " + err.responseText);
        }
    });
}

// Insert/ Update a product
$("#btnSave").click(function (e) {

    var data = {
        Id: $("#Id").val(),
        Name: $("#Name").val(),
        Price: $("#Price").val()
    }

    if (!isUpdateable) {
        $.ajax({
            url: '/Product/Create/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getProducts();
                $("#productModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
    else {
        $.ajax({
            url: '/Product/Update/',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                getProducts();
                isUpdateable = false;
                $("#productModal").modal('hide');
                clear();
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        })
    }
});

// Delete product by id
function deleteProductById(id) {
    $("#confirmModal #title").text("Delete Product");
    $("#confirmModal").modal('show');
    $("#confirmModal #btnOk").click(function (e) {
        $.ajax({
            url: "/Product/Delete/" + id,
            type: "POST",
            dataType: 'json',
            success: function (data) {
                getProducts();
                $("#confirmModal").modal('hide');
            },
            error: function (err) {
                alert("Error: " + err.responseText);
            }
        });

        e.preventDefault();
    });
}

// Set title for create new
$("#btnCreate").click(function () {
    $("#title").text("Create New");
})

// Close modal
$("#btnClose").click(function () {
    clear();
});

// Clear all items
function clear() {
    $("#Id").val("");
    $("#Name").val("");
    $("#Price").val("");
}
