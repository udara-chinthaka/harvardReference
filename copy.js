// copy reference

document.querySelector(".copy").addEventListener("click", function() {
  // var a = document.getElementById("ref").value;
  var copyGfGText = document.getElementById("ref");
  /* Select the text field */
  copyGfGText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  //alert("Copied the text: " + copyGfGText.value);
  swal({
    title: "COPIED..!",
    text: "Reference : " + copyGfGText.value,
    icon: "success",
    button: "Ok"
  });
});
