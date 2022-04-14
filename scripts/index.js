const feedItems = document.querySelector("div.feed")

let tableHeaders = ["Item", "Store", "", "Time Alive [seconds]", "Accuracy [%]"]
const createfeedTable = () => {
    while (feedDiv.firstChild) feedDiv.removeChild(feedDiv.firstChild) // Remove all children from feed div (if any)
    let feedTable = document.createElement('table') // Create the table itself
    feedTable.className = 'feedTable'
    let feedTableHead = document.createElement('thead') // Creates the table header group element
    feedTableHead.className = 'feedTableHead'
    let feedTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
    feedTableHeaderRow.className = 'feedTableHeaderRow'
    // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
    tableHeaders.forEach(header => {
    let feedHeader = document.createElement('th') // Creates the current header cell during a specific iteration
    feedHeader.innerText = header
    feedTableHeaderRow.append(feedHeader) // Appends the current header cell to the header row
    })

    feedTableHead.append(feedTableHeaderRow) // Appends the header row to the table header group element
    feedTable.append(feedTableHead)
    let feedTableBody = document.createElement('tbody') // Creates the table body group element
    feedTableBody.className = "feedTable-Body"
    feedTable.append(feedTableBody) // Appends the table body group element to the table
    feedDiv.append(feedTable) // Appends the table to the feed div
}

const appendScores = (singleItem, singleItemIndex) => {
    const feedTable = document.querySelector('.feedTable') // Find the table we created
    let scoreboardTableBodyRow = document.createElement('tr') // Create the current table row
    scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'
    // Lines 72-85 create the 5 column cells that will be appended to the current table row
    let scoreRanking = document.createElement('td')
    scoreRanking.innerText = singleItemIndex
    let usernameData = document.createElement('td')
    usernameData.innerText = singleItem.user.username
    let scoreData = document.createElement('td')
    scoreData.innerText = singleItem.score
    let timeData = document.createElement('td')
    timeData.innerText = singleItem.time_alive
    let accuracyData = document.createElement('td')
    accuracyData.innerText = singleItem.accuracy
    scoreboardTableBodyRow.append(scoreRanking, usernameData, scoreData, timeData, accuracyData) // Append all 5 cells to the table row
    feedTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
}


const getScores = () => {
    
    var moduleName = 'https';
    require([moduleName], function(fooModule){
      var options = {
        "method": "GET",
        "hostname": "api.browse.ai",
        "port": null,
        "path": "/v1/teams/b4966b9d-3444-49da-89d8-730f14a1bbbb/tasks/",
        "headers": {
          "authorization": "Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7"
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
    })

    // var http = require("https");

    });
    
    // req.end();
    };
    
    // fetch('v1/tasks/b4966b9d-3444-49da-89d8-730f14a1bbbb/', { 
    //     method: 'get', 
    //     headers: {
    //       'Authorization': 'Bearer 98c4412d-5f19-47c6-b559-38bee923e3d7'
    //    },
    //     mode: 'no-cors'
    //     // body: 'A=1&B=2'
    //   });
    
//     console.log("here")
//     fetch('https://api.browse.ai/v1/tasks/b4966b9d-3444-49da-89d8-730f14a1bbbb/', {
//     headers: {Authentication: 'Bearer Token'}
//     })
//     .then(res => res.json())
//     .then(scores => {
//         createScoreboardTable() // Clears scoreboard div if it has any children nodes, creates & appends the table
//         // Iterates through all the objects in the scores array and appends each one to the table body
//         for (const score of scores) {
//             let scoreIndex = scores.indexOf(score) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
//             appendScores(score, scoreIndex) // Creates and appends each row to the table body
//         }
//     })

require(['require'], function (require) {
  getScores()
})

function searchTable(searchType, col) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(searchType);
    filter = input.value.toUpperCase();
    table = document.getElementById("feedTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[col];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("feedTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
}

function sortByPrice(col) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("feedTable");
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[col];
        y = rows[i + 1].getElementsByTagName("TD")[col];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
        }
        }
        if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        }
    }
}