var UIController = (function() {
  var DOMString = {
    inputauthor: ".author",
    inputyear: ".year",
    inputtitle: ".title",
    inputserise: ".series",
    inputedition: ".edition",
    inputplace: ".placeOfPublication",
    inputpublisher: ".publisher",

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
        series: document.querySelector(DOMString.inputserise).value,
        edition: document.querySelector(DOMString.inputedition).value,
        place: document.querySelector(DOMString.inputplace).value,
        publisher: document.querySelector(DOMString.inputpublisher).value
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
    if (input.year === "" && input.series === "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.title +
        ". " +
        input.edition +
        ". " +
        input.place +
        ", " +
        input.publisher +
        ".";
    } else if (input.year === "" && input.series != "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.title +
        ". " +
        input.series +
        ". " +
        input.edition +
        ". " +
        input.place +
        ", " +
        input.publisher +
        ".";
    } else if (input.year != "" && input.series === "") {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.title +
        ". " +
        input.edition +
        ". " +
        input.place +
        ", " +
        input.publisher +
        ".";
    } else {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.title +
        ". " +
        input.series +
        "." +
        input.edition +
        ". " +
        input.place +
        ", " +
        input.publisher +
        ".";
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
        text: "Please enter Author name",
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
    } else if (info.edition === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Edition",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.place === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Published place",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.publisher === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Publisher",
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
    document.querySelector(DOM.inputedition).value = "";
    document.querySelector(DOM.inputserise).value = "";
    document.querySelector(DOM.inputpublisher).value = "";
    document.querySelector(DOM.inputplace).value = "";
    document.querySelector(DOM.inputReference).value = "";
  };

  return {
    init: function() {
      setupEventListners();
    }
  };
})();

controller.init();
