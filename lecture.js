var UIController = (function() {
  var DOMString = {
    inputlecturer: ".lecturer",
    inputyear: ".year",
    inputtitle: ".title",
    inputmodule: ".module",
    inputinstitution: ".institution",
    inputdate: ".date",
    inputBtn: ".get",
    inputCopy: ".copy",
    inputNew: ".new",
    inputReference: ".reference"
  };

  return {
    getInput: function() {
      return {
        lecturer: document.querySelector(DOMString.inputlecturer).value,
        year: document.querySelector(DOMString.inputyear).value,
        title: document.querySelector(DOMString.inputtitle).value,
        module: document.querySelector(DOMString.inputmodule).value,
        institution: document.querySelector(DOMString.inputinstitution).value,
        date: document.querySelector(DOMString.inputdate).value
      };
    },
    getDOMstring: function() {
      return DOMString;
    }
  };
})();

var controller = (function() {
  // store input stirng
  var DOM = UIController.getDOMstring();
  var setupEventListners = function() {
    // check pressed key is enter or not
    document.querySelector(DOM.inputBtn).addEventListener("click", function() {
      if (isValid()) {
        getReference();
      }
    });

    document.querySelector(DOM.inputNew).addEventListener("click", clearFields);
    var click = 0;
    document.querySelector(".btn").addEventListener("click", function() {
      document.querySelector(".example").classList.toggle("vis");
      if (click === 0) {
        document.querySelector(".btn").classList.add("required");
        document.querySelector(".btn").classList.remove("sample");
        click += 1;
      } else if (click === 1) {
        document.querySelector(".btn").classList.remove("required");
        document.querySelector(".btn").classList.add("sample");
        click = 0;
      }
    });
  };

  // generate the reference
  var getReference = function() {
    // get input data
    var input = UIController.getInput();
    var txtReference;
    if (input.year === "") {
      txtReference =
        input.lecturer +
        ". (n.d) " +
        input.title +
        ". [Lecture] " +
        input.module +
        ". " +
        input.institution +
        ", " +
        input.date +
        ".";
    } else if (input.year != "") {
      txtReference =
        input.lecturer +
        ". (" +
        input.year +
        ") " +
        input.title +
        ". [Lecture] " +
        input.module +
        ". " +
        input.institution +
        ", " +
        input.date +
        ".";
    }

    document.querySelector(DOM.inputReference).textContent = txtReference;
  };
  // end generate the reference

  // check reference is valid
  var isValid = function() {
    var info = UIController.getInput();
    var valid = true;
    if (info.lecturer === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Lecture name",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.title === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Title",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.module === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Module or Course Name",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.institution === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Institution Name",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    }

    return valid;
  };

  // end is valid function

  // clear
  var clearFields = function() {
    document.querySelector(DOM.inputlecturer).value = "";
    document.querySelector(DOM.inputyear).value = "";
    document.querySelector(DOM.inputtitle).value = "";
    document.querySelector(DOM.inputmodule).value = "";
    document.querySelector(DOM.inputinstitution).value = "";
    document.querySelector(DOM.inputReference).value = "";
  };

  // today date

  function today() {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let date = new Date();
    var day = date.getDate();
    var supDay;
    var lastDigit = day.toString().slice(-1);
    if (lastDigit == 1) {
      supDay = day + "st";
    } else if (lastDigit == 2) {
      supDay = day + "nd";
    } else if (lastDigit == 3) {
      supDay = day + "rd";
    } else {
      supDay = day + "th";
    }

    var d = supDay + " " + months[date.getMonth()];
    document.querySelector(".date").value = d;
  }
  return {
    init: function() {
      console.log("apllication has started");
      today();
      setupEventListners();
    }
  };
})();

controller.init();
