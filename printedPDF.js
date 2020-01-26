var UIController = (function() {
  var DOMString = {
    inputauthor: ".author",
    inputyear: ".year",
    inputtitleJournalArticle: ".titleJournalArticle",
    inputtitle: ".title",
    inputvolumNumber: ".volumNumber",
    inputissueNumber: ".issueNumber",
    inputpageNumbers: ".pageNumbers",

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
        journaltitle: document.querySelector(DOMString.inputtitleJournalArticle)
          .value,
        title: document.querySelector(DOMString.inputtitle).value,
        volume: document.querySelector(DOMString.inputvolumNumber).value,
        issuedNumber: document.querySelector(DOMString.inputissueNumber).value,
        pageNumber: document.querySelector(DOMString.inputpageNumbers).value
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
    if (input.year != "" && input.volume != "" && input.issuedNumber != "") {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.volume +
        ", (" +
        input.issuedNumber +
        ")," +
        input.pageNumber +
        ".";
    } else if (
      input.year === "" &&
      input.volume === "" &&
      input.issuedNumber === ""
    ) {
      txtReference =
        input.author +
        ". (n.d) " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.pageNumber +
        ".";
    } else if (input.year === "" && input.volume === "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.journaltitle +
        ". " +
        input.title +
        ", (" +
        input.issuedNumber +
        ")," +
        input.pageNumber +
        ".";
    } else if (input.year === "" && input.issuedNumber === "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.volume +
        "." +
        input.pageNumber +
        ".";
    } else if (
      input.year != "" &&
      input.volume != "" &&
      input.issuedNumber === ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.volume +
        ", " +
        input.pageNumber +
        ".";
    } else if (
      input.year != "" &&
      input.volume === "" &&
      input.issuedNumber != ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.journaltitle +
        ". " +
        input.title +
        ", (" +
        input.issuedNumber +
        ")," +
        input.pageNumber +
        ".";
    } else if (
      input.year != "" &&
      input.volume === "" &&
      input.issuedNumber === ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.pageNumber +
        ".";
    } else if (
      input.year === "" &&
      input.volume != "" &&
      input.issuedNumber != ""
    ) {
      txtReference =
        input.author +
        ". (n.d) " +
        input.journaltitle +
        ". " +
        input.title +
        ", " +
        input.volume +
        ", (" +
        input.issuedNumber +
        ")," +
        +input.pageNumber +
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
    } else if (info.journaltitle === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter journal Article Title / PDF",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.title === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Chapter Title",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.pageNumber === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Page numbers",
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
    document.querySelector(DOM.inputtitleJournalArticle).value = "";
    document.querySelector(DOM.inputtitle).value = "";
    document.querySelector(DOM.inputvolumNumber).value = "";
    document.querySelector(DOM.inputissueNumber).value = "";
    document.querySelector(DOM.inputpageNumbers).value = "";
    document.querySelector(DOM.inputReference).value = "";
  };

  return {
    init: function() {
      setupEventListners();
    }
  };
})();

controller.init();
