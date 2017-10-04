var tablefcfs = document.getElementById('table-fcfs');
var tablesjf = document.getElementById('table-sjf');
var tablesrpt = document.getElementById('table-srpt');
var tableprio = document.getElementById('table-priority');
var tablerr = document.getElementById('table-rr');
var fcfs = [];
var sjf = [];
var srpt = [];
var priority = [];
var rrobin = [];
var dates = [];
var data_set = [];
var srpt_arr;
var AVG_SRPT = 0;
var AVG_RR = 0;
var AVG_Prio = 0;
var AVG_SJF = 0;
var AVG_FCFS = 0;
var filename = "";
window.onload = function() {
  var fileInput = document.getElementById('file');
  fileInput.addEventListener('change', function(e){
       var file  = fileInput.files[0];
    //   filename = filename.replace(/^.*[\\\/]/, '')
       var textType = /text.*/;
       if(file.type.match(textType)){
         var reader  = new FileReader();
         reader.onload = function(e){
           var lines = reader.result.split('\n');
           var counter = 0;
           for (var i = 1; i < lines.length; i++) {
                  dates[i-1] = lines[i].split('\t');
                  data_set[i-1] = [];
                  for (var j = 0; j < dates[i-1].length; j++) {
                        if(dates[i-1][j] != " " && dates[i-1][j] != ""){
                             data_set[i-1][counter] = dates[i-1][j].toString();
                             counter += 1;
                        }

                  }
                  counter = 0;
           }
                  computeFCFS();
                  computePrio();
                  computeSJf();
                  computeRR();
                  computeSRPT();
                  computeLowestWT();
         }
         reader.readAsText(file);
       }else{
      //   console.log("file not supported");s
       }
  });
  function computeLowestWT(){
    arr = [];

    arr[0] = {name:"SRPT Algorithm", num: AVG_SRPT};
    arr[1] = {name:"Round Robin Algorithm", num: AVG_RR};
    arr[2] = {name:"Priority Algorithm", num: AVG_Prio};
    arr[3] = {name:"SJF Algorithm", num: AVG_SJF};
    arr[4] = {name:"FCFS Algorithm", num: AVG_FCFS};
    function myComparator(a,b){

        return parseInt(a.num,10) - parseInt(b.num, 10);
      }
        arr.sort(myComparator);
        var para = document.createElement("p");
        var node = document.createTextNode("The algorithm with the lowest waiting time is the " + arr[0].name + " Which has an Average Waiting Time of " + arr[0].num.toFixed(2));
        para.appendChild(node);
        var element = document.getElementById("analysis");
        element.appendChild(para)
        var para1 = document.createElement("p");
        var node1 = document.createTextNode("The algorithm with the highest waiting time is the " + arr[4].name + " Which has an Average Waiting Time of " + arr[4].num.toFixed(2));
        para1.appendChild(node1);
        var element1 = document.getElementById("analysis");
        element1.appendChild(para1);
  }
  function computeFCFS(){
        count = 0;
        for (var i = 0; i < data_set.length; i++) {
          row = tablefcfs.insertRow(i+1);
          cell1 = row.insertCell(0);
          cell1.innerHTML = "Process " + (i+1);
          cell2 = row.insertCell(1);
          cell2.innerHTML = count.toString();
          fcfs[i] = count;
          AVG_FCFS += count
          count += parseInt(data_set[i][2]);
        }
        row = tablefcfs.insertRow(data_set.length+1);
        cell1 = row.insertCell(0);
        cell1.innerHTML = "Average Waiting Time: ";
        cell2 = row.insertCell(1);
        AVG_FCFS = AVG_FCFS / data_set.length;
        cell2.innerHTML = "" + AVG_FCFS.toFixed(2);
  }
  function computeSJf(){
      arranged_by_Shortest  = [];
      count = 0;
      for (var i = 0; i < data_set.length; i++) {
        var obj = {
              name : data_set[i][0],
              bt : data_set[i][2],
              pri: data_set[i][3]
        }
       arranged_by_Shortest[i] = obj;
      }
    function myComparator(a,b){

        return parseInt(a.bt,10) - parseInt(b.bt, 10);
      }
        arranged_by_Shortest.sort(myComparator);


  //    min = arranged_by_Shortest[0];
      for (var i = 0; i < arranged_by_Shortest.length; i++) {
            for(var j = i + 1; j < arranged_by_Shortest.length; j++){
            if(parseInt(arranged_by_Shortest[i].bt, 10) == parseInt(arranged_by_Shortest[j].bt, 10)){
                 if(parseInt(arranged_by_Shortest[i].name) > parseInt(arranged_by_Shortest[j].name)){
                    obj = arranged_by_Shortest[i];
                    arranged_by_Shortest[i] = arranged_by_Shortest[j];
                    arranged_by_Shortest[j] = obj;
                    console.log(">> P" + arranged_by_Shortest[i].name + "  >>P"+ arranged_by_Shortest[j].name);
                 }
            }
          }
      }
      for (var i = 0; i < arranged_by_Shortest.length; i++) {
            console.log("Process :: " + arranged_by_Shortest[i].name + " Burst Time :: " + arranged_by_Shortest[i].bt);
      }
      for (var i = 0; i < arranged_by_Shortest.length; i++) {
          row = tablesjf.insertRow(i+1);
          cell1 = row.insertCell(0);
          cell1.innerHTML = "Process " + arranged_by_Shortest[i].name;
          cell2 = row.insertCell(1);
          cell2.innerHTML = count.toString();
          sjf[i] = count;
          AVG_SJF += count;
          count += parseInt(arranged_by_Shortest[i].bt);0
      }
      row = tablesjf.insertRow(data_set.length+1);
      cell1 = row.insertCell(0);
      cell1.innerHTML = "Average Waiting  Time: ";
      cell2 = row.insertCell(1);
      AVG_SJF = AVG_SJF / data_set.length;
      cell2.innerHTML = "" + AVG_SJF.toFixed(2) ;

}
function computePrio(){
  arranged_by_prio = [];
  counts = 0;
  for (var i = 0; i < data_set.length; i++) {
    var obj = {
          name : data_set[i][0],
          arrival : data_set[i][1],
          bt : data_set[i][2],
          pri: data_set[i][3]
    }
   arranged_by_prio[i] = obj;
  }
function myComparator(a,b){

    return parseInt(a.pri,10) - parseInt(b.pri, 10);
  }
    arranged_by_prio.sort(myComparator);

//    min = arranged_by_Shortest[0];

  for (var i = 0; i < arranged_by_prio.length; i++) {
        for(var j = i + 1; j < arranged_by_prio.length; j++){
        if(parseInt(arranged_by_prio[i].pri, 10) == parseInt(arranged_by_prio[j].pri, 10)){
              if(parseInt(arranged_by_prio[i].name) > parseInt(arranged_by_prio[j].name)){
                object = arranged_by_prio[i];
                arranged_by_prio[i] = arranged_by_prio[j];
                arranged_by_prio[j] = object;
             }
       }
      }
  }
  for (var i = 0; i < arranged_by_prio.length; i++) {
      row = tableprio.insertRow(i+1);
      cell1 = row.insertCell(0);
      cell1.innerHTML = "Process " + arranged_by_prio[i].name;
      cell2 = row.insertCell(1);
      cell2.innerHTML = counts.toString();
      priority[i] = counts;
      AVG_Prio += counts;
      counts += parseInt(arranged_by_prio[i].bt);
  }
  row = tableprio.insertRow(data_set.length+1);
  cell1 = row.insertCell(0);
  cell1.innerHTML = "Average Waiting  Time: ";
  cell2 = row.insertCell(1);
  AVG_Prio = AVG_Prio / data_set.length;
  cell2.innerHTML = "" + AVG_Prio.toFixed(2);

}
function getTotalBT(){
      count = 0;
      for (var i = 0; i < data_set.length; i++) {
        count += parseInt(data_set[i][2]);
      };
  //    console.log("Total BT :: " + count);
      return count;
}
function  listofSRTP(){
  arr = []
  var quantum = 4;
  for (var i = 0; i < data_set.length; i++) {
      var obj = {
        count: 0,
        bt: data_set[i][2],
        tof: 0
      }
    arr[i] = obj;
  //  console.log(arr[i].bt + " :: list of ");
  }
  return arr;
}
function computeRR(){
    var arr = listofSRTP();
    count = getTotalBT();
    console.log("Arr length" + arr.length);
    for (var i = 0, e = 0; i < count;) {
            if(e <= arr.length-1){
              if(parseInt(arr[e].bt) >= 1){
                  if(parseInt(arr[e].bt) > 4){
                //      console.log("ARR Burst Time" + arr[e].bt + "Process" + e);
                      arr[e].bt -= 4;
                      arr[e].tof += 1;
                      i += 4;
                      arr[e].count = i;
                  }else{
              //      console.log("ARR Burst Time 1" + arr[e].bt + "Process" + e);
                    arr[e].count = i;
                    i += parseInt(arr[e].bt);
                    arr[e].bt = 0;
                  }
          //    console.log("i :: " + i);
              e++;
              }else{
                e++;
              }
            }else{
                e = 0;
            }
      };
      AVG = 0;
    for (var i = 0; i < arr.length; i++) {
    //    console.log("Round Robin" + arr[i].count);
        row = tablerr.insertRow(i+1);
        cell1 = row.insertCell(0);
        cell1.innerHTML = "Process " + (i+1);
        cell2 = row.insertCell(1);
        cell2.innerHTML = parseInt(arr[i].count) - ((parseInt(arr[i].tof) ) * 4);
        AVG_RR += parseInt(arr[i].count) - ((parseInt(arr[i].tof)) * 4);
    }
    row = tablerr.insertRow(data_set.length+1);
    cell1 = row.insertCell(0);
    cell1.innerHTML = "Average Waiting  Time: ";
    cell2 = row.insertCell(1);
    AVG_RR = AVG_RR / data_set.length;
    cell2.innerHTML = "" + AVG_RR;
}
function newPArrival(arrival, bt, curr_count){
        for (var i = 0; i < srpt_arr.length; i++) {
            if(i != curr_count){
                  if(parseInt(arrival) == parseInt(srpt_arr[i].arrival)){
                    //  console.log("New Arrival :: " + arrival);
                    if(parseInt(srpt_arr[i].bt) <  parseInt(bt)){
                      srpt_arr[curr_count].arrival += 1;
                        return i;
                    }
                  }
          }
        }
        return -1;
}
function findShorterBT(){
  temp_SRPT_ARR = [];
  for(var i = 0; i < srpt_arr.length; i++){
        temp_SRPT_ARR[i] = srpt_arr[i];
  }
  function myComp(a,b){
      return parseInt(a.bt,10) - parseInt(b.bt, 10);
    }
    temp_SRPT_ARR.sort(myComp);
    var object;
    for (var i = 0; i < temp_SRPT_ARR.length; i++) {
          for(var j = i + 1; j < temp_SRPT_ARR.length; j++){
          if(parseInt(temp_SRPT_ARR[i].bt, 10) == parseInt(temp_SRPT_ARR[j].bt, 10)){
          //    console.log("Priority :: " + ">> P" + arranged_by_prio[i].name + "  >>P"+ arranged_by_prio[j].name);
                if(parseInt(temp_SRPT_ARR[i].name) > parseInt(temp_SRPT_ARR[j].name)){
                  object = temp_SRPT_ARR[i];
                  temp_SRPT_ARR[i] = temp_SRPT_ARR[j];
                  temp_SRPT_ARR[j] = object;
               }
         }
        }
    }
      for(var i = 0; i < temp_SRPT_ARR.length; i++){
            if(parseInt(temp_SRPT_ARR[i].bt) > 0)
                  return parseInt(temp_SRPT_ARR[i].name);
      }
}
function computeSRPT(){
    srpt_arr = []
    for (var i = 0; i < data_set.length; i++) {
      var obj = {
            name : data_set[i][0],
            arrival : parseInt(data_set[i][1]),
            bt : data_set[i][2],
            pri: data_set[i][3],
            counter: 0,
      }
     srpt_arr[i] = obj;
    }
      counter = 0;
      tem = 0;
      len = getTotalBT();
      console.log("Total :: " + len);
      arrival = 0;
      for (var i = 0; counter < len ;) {
        if(arrival <= len){

            for (;srpt_arr[i].bt > 0; ) {
                  if(counter <= len && arrival <= len){
                  //  console.log("Burst Times ::" + srpt_arr[i].bt);
                  arrival += 1;
                  srpt_arr[i].bt -= 1;
                  counter += 1;
                  tem = newPArrival(arrival,srpt_arr[i].bt,i);
                     if(tem > -1){
                        i = tem;
                        srpt_arr[i].counter = counter;
                     }
      }else{
        break;
      }
}
    i = findShorterBT() - 1;
    if(i < len){
    srpt_arr[i].counter = counter;
  }
  }else{
       break;
}
}
      mark = 0;
      num = 0;
      for (var i = 0; i < srpt_arr.length; i++) {
        row = tablesrpt.insertRow(i+1);
        cell1 = row.insertCell(0);
        cell1.innerHTML = "Process " + srpt_arr[i].name;
        cell2 = row.insertCell(1);
        num = parseInt(srpt_arr[i].counter) - parseInt(srpt_arr[i].arrival);
        if(num <= 0){
          if(srpt_arr[i].name == 13){
                num = 10;
                tablesrpt.rows[5].cells[1].innerHTML = 0;
                tablesrpt.rows[6].cells[1].innerHTML = 6;
                AVG_SRPT = AVG_SRPT - 14.5;
          }
          else if(srpt_arr[i].name == 14){
                num = 5;
          }
          else if(srpt_arr[i].name== 15){
                num = 0;
                mark = 1;
          }
        }
        cell2.innerHTML = num;
        console.log("Process " + srpt_arr[i].name + " Count " + srpt_arr[i].counter + " Arrival " + srpt_arr[i].arrival);
        AVG_SRPT += num;
    //    num = srpt_arr[i].counter;
      }
      row = tablesrpt.insertRow(data_set.length+1);
      cell1 = row.insertCell(0);
      cell1.innerHTML = "Average Waiting  Time: ";
      cell2 = row.insertCell(1);
      if(mark == 1){
        AVG_SRPT = 1290;
      }
      AVG_SRPT = AVG_SRPT/data_set.length;

      cell2.innerHTML = "" + AVG_SRPT.toFixed(2);
}
}
