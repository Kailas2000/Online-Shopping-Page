$(document).ready(function () {
  var storedCart = JSON.parse(localStorage.getItem('cart'));
  var storedCart1 = localStorage.getItem('total');
    console.log(storedCart)
    console.log(storedCart1)

storedCart.map((item,index)=>{
  $("#data").append(
      `<tr>
      <td>${index+1}</td>
      <td>${item.title}</td>
      <td>$ ${item.price}</td>
      <td>${item.quantity}</td>
      <td>$ ${item.quantity * item.price}</td>
      </tr>
      `)
});
$("#dd").text(storedCart1)

$("#btn").click(function (e) {
  e.preventDefault();
  if ($('input[name="customRadio"]:checked').length == 0){
    swal({
			title: "Failed!!!",
			text: "Please select any payment option",
			icon: "warning"
		});
  }
  else{
    swal("Payment Successful", "Thank you for your order", "success");
  }
});
});