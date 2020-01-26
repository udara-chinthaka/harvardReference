var UIController = (function() {
  var DOMString = {
    inputauthor: ".author",
    inputyear: ".year",
    inputtitle: ".title",
    inputorganisation: ".organisation",
    inputreportNumber: ".reportNumber",

    inputBtn: ".get",
    inputCopy: ".copy",
    inputNew: ".new",
    inputReference: ".reference"
  };

  return {
    getInput: function() {
      return {
        author: document.querySelector(DOMString.inputauthor).value,
        year: document.querySelector(DOMString.inputyear).value,
        title: document.querySelector(DOMString.inputtitle).value,
        organization: document.querySelector(DOMString.inputorganisation).value,
        reportNumber: document.querySelector(DOMString.inputreportNumber).value
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
    document.querySelector(DOM.inputBtn).addEventListener("click", function() {
      if (isValid()) {
        getReference();
      }
    });

    document.querySelector(DOM.inputNew).addEventListener("click", clearFields);

    // swaping buttons and display sample reference
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
    if (input.year != "" && input.reportNumber != "") {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.title +
        ". " +
        input.organization +
        ". Report number:" +
        input.reportNumber +
        ".";
    } else if (input.year != "" && input.reportNumber === "") {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.title +
        ". " +
        input.organization +
        ".";
    } else if (input.year === "" && input.reportNumber != "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.title +
        ". " +
        input.organization +
        ". Report number:" +
        input.reportNumber +
        ".";
    } else if (input.year === "" && input.reportNumber === "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.title +
        ". " +
        input.organization +
        ". ";
    }
    document.querySelector(DOM.inputReference).textContent = txtReference;
  };

  // end generate the reference

  // check reference is valid
  var isValid = function() {
    var info = UIController.getInput();
    var valid = true;
    if (info.author === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Author name.",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.title === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Report title.",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.organization === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Organization.",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    }
    return valid;
  };

  // end is valid function

  var clearFields = function() {
    document.querySelector(DOM.inputauthor).value = "";
    document.querySelector(DOM.inputyear).value = "";
    document.querySelector(DOM.inputtitle).value = "";
    document.querySelector(DOM.inputorganisation).value = "";
    document.querySelector(DOM.inputreportNumber).value = "";
    document.querySelector(DOM.inputReference).value = "";
  };

  return {
    init: function() {
      setupEventListners();
    }
  };
})();

controller.init();
