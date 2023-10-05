$(document).ready(function() {
   
    function jsongetData() {
        $.get('data.json', function(data) {
            populateTable(data); // ცხრილის შექმნის ფუნქციის გამოძახება
          
            
             $('#searchID').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(0, searchTerm); // Column index : 0
            });

            $('#searchName').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(1, searchTerm); // Column index : 1
            });

            $('#searchAge').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(2, searchTerm); // Column index  2
            });

            $('#searchEmail').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(3, searchTerm); // Column index : 3
            });

            $('#searchCountry').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(4, searchTerm); // Column index : 4
            });

            $('#searchGender').on('keyup', function () {
                var searchTerm = $(this).val().toLowerCase();
                searchTable(5, searchTerm); // Column index : 5
            });
            function searchTable(columnIndex, searchTerm) {
                console.log("shemovida")
                $('#data-table tbody tr').each(function () {
                    console.log("shemovid2a")
                    var row = $(this);
                    var cell = row.find('td').eq(columnIndex);
                    var cellText = cell.text().toLowerCase();
        
                    if (cellText.indexOf(searchTerm) !== -1) {
                        row.show();
                    } else {
                        row.hide();
                    }
                });
            }
       
        });
    }

    // Function to populate the table with data -ცხრილის მონაცემებით შევსების ფუნქცია
    function populateTable(data) {
        var tableBody = $('#data-table tbody');
        tableBody.empty();

        $.each(data.data, function(index, item) {
            var newRow = $('<tr>');
            newRow.append('<td>' + item[0] + '</td>');
            newRow.append('<td>' + item[1] + '</td>');
            newRow.append('<td>' + item[2] + '</td>');
            newRow.append('<td>' + item[3] + '</td>');
            newRow.append('<td>' + item[4] + '</td>');
            newRow.append('<td>' + item[5] + '</td>');
            tableBody.append(newRow);
        });
    }

    // ვიძახებ  ფუნქციას
    jsongetData();

    // Search functionality  --ძებნის ფუნქცია
    $('#searchInput').on('input', function() {
        var searchValue = $(this).val().toLowerCase();
        var rows = $('#data-table tbody tr');

        rows.each(function() {
            var row = $(this);
            var rowData = row.text().toLowerCase();

            if (rowData.indexOf(searchValue) === -1) {
                row.hide();
            } else {
                row.show();
            }
        });
    });

    // Sort functionality -- სორტირების ფუნქცია
    $('#data-table th').on('click', function() {
        
        var table = $('#data-table');
        var rows = table.find('tbody tr').toArray().sort(compareRows($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) {
            rows = rows.reverse();
        }
        for (var i = 0; i < rows.length; i++) {
            table.append(rows[i]);
        }
    });

    function compareRows(index) {
        return function(a, b) {
            var valA = getCellValue(a, index);
            var valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        };
    }

    function getCellValue(row, index) {
        return $(row).children('td').eq(index).text();
    }
});


/// აკარდეონი  + დამატების ფუქცნია-----------------------------------------------------

// $(document).ready(function() {
//     $('#addData').on('click', function() {
//         // Get input values
//         var input1 = $('#input1').val();
//         var input2 = $('#input2').val();
//         var input3 = $('#input3').val();
//         var input4 = $('#input4').val();
//         var input5 = $('#input5').val();
//         var input6 = $('#input6').val();

//         // Create a data object
//         var data = {
//             column1: input1,
//             column2: input2,
//             column3: input3,
//             column4: input4,
//             column5: input5,
//             column6: input6
//         };

//         // სერვერზე ვაგზავნი შეყვნილ მონაცემბს მაგრამ არ შვება
//         $.ajax({
//             url: 'data.json', // Replace with the actual URL of your server-side script
//             type: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(data),
//             success: function(response) {
//                 // Handle the response from the server
//                 console.log(response);
//             },
//             error: function(error) {
//                 // Handle any errors
//                 console.error(error);
//             }
//         });
//     });
// });

// ზედა კოდი სერვრზე გაგზვნა ვერ ავმუშავე და დავკომენტრე  ხელი რო არ შეეშალა

document.addEventListener("DOMContentLoaded", function() {
    var addDataButton = document.getElementById("addData");
    addDataButton.addEventListener("click", function() {
        // Get input values --მიიღეთ შეყვანის მნიშვნელობები
        var input1 = document.getElementById("column1").value;
        var input2 = document.getElementById("column2").value;
        var input3 = document.getElementById("column3").value;
        var input4 = document.getElementById("column4").value;
        var input5 = document.getElementById("column5").value;
        var input6 = document.getElementById("column6").value;

        // Create a new row in the table
        var table = document.getElementById("data-table").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);

        // Insert data into the new row - ჩადეთ მონაცემები ახალ რიგში
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.innerHTML = input1;
        cell2.innerHTML = input2;
        cell3.innerHTML = input3;
        cell4.innerHTML = input4;
        cell5.innerHTML = input5;
        cell6.innerHTML = input6;

        // Clear input fields
        document.getElementById("column1").value = "";
        document.getElementById("column2").value = "";
        document.getElementById("column3").value = "";
        document.getElementById("column4").value = "";
        document.getElementById("column5").value = "";
        document.getElementById("column6").value = "";
    });
});



const achead=document.querySelector('.acardion-header');

  achead.addEventListener('click', () => {
      achead.nextElementSibling.classList.toggle('active');
  });

  function toggleButtonText() {
    const toggleButton = document.getElementById("toggleButton");

    if (toggleButton.textContent === "close") {
      toggleButton.textContent = "Add new data";
  } else {
      toggleButton.textContent = "close";
  }
}