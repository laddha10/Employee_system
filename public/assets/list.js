
$(document).ready(function(){
  $('#bt1').on('click',function(){
//alert("inside");
  window.location.href="/details";
  });

  $('#add').click(function(){
    window.location.href="/Add";
  });

  $('#show').click(function(){
    window.location.href="/show";
  });

  $('#tree').click(function(){
    window.location.href="/Emp-Tree";
  });

  $('#export').click(function(){
    $("table").tableExport({
      bootstrap: true,
      formats: ["xls", "csv"],
      ignoreCols: 4,
  });
});

  $('#add-emp').click(function(){
    var name=$('#EmpName').val();
    var id=$('#id').val();
    var designation =$('#Empdesg').val();
    var manager =$('#EmpMan').val();
var data ={
           empid : id,
            name : name,
     designation : designation,
         manager : manager
            };
    $.ajax({
        type: 'post',
        url: '/add-emp',
        data: data,
        success: function(data){
        console.log(data);
          window.location.href="/details";
        }
      });
  })

  $(".view").click(function(e){
    //e.stopPropagation();
    var empid =($(this).parent().prev().prev().prev().prev()).html().trim();
    console.log(empid);
 window.location.href="/info/" + empid;
  });
  $(".h").click(function(){
    //e.stopPropagation();
    var empid =this.id;
    console.log(empid);
 window.location.href="/info/" + empid;
  });


  $('#edit').on('click', function(){
    var name=$('#EmpName').val();
    var id=$('#id').val();
    var designation =$('#Empdesg').val();
    var manager =$('#EmpMan').val();
var data ={
            name : name,
              id : id,
     designation : designation,
         manager : manager
            };
    $.ajax({
        type: 'PUT',
        url: '/edit',
        data: data,
        success: function(data){
        console.log(data);
          window.location.href="/details";
        }
      });
  });

});
