var UIController = (function() {
  var DOMString = {
    inputauthor: ".author",
    inputyear: ".year",
    inputtitleJournalArticle: ".titleJournalArticle",
    inputtitle: ".title",
    inputvolumNumber: ".volumNumber",
    inputissueNumber: ".issueNumber",
    inputpageNumbers: ".pageNumbers",
    inputurl: ".url",
    inputdate: ".accessDate",
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
        titleJournalArticle: document.querySelector(
          DOMString.inputtitleJournalArticle
        ).value,
        title: document.querySelector(DOMString.inputtitle).value,
        volume: document.querySelector(DOMString.inputvolumNumber).value,
        issueNumber: document.querySelector(DOMString.inputissueNumber).value,
        pageNumbers: document.querySelector(DOMString.inputpageNumbers).value,
        url: document.querySelector(DOMString.inputurl).value,
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
    if (input.year === "" && input.volume === "" && input.issueNumber === "") {
      txtReference =
        input.author +
        ". (n.d) " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year != "" &&
      input.volume != "" &&
      input.issueNumber != ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] " +
        input.volume +
        " (" +
        input.issueNumber +
        "), " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year != "" &&
      input.volume != "" &&
      input.issueNumber === ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] " +
        input.volume +
        " " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year != "" &&
      input.volume === "" &&
      input.issueNumber === ""
    ) {
      txtReference =
        input.author +
        ". (" +
        input.year +
        ") " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year === "" &&
      input.volume != "" &&
      input.issueNumber != ""
    ) {
      txtReference =
        input.author +
        ". (n.d) " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] " +
        input.volume +
        " (" +
        input.issueNumber +
        "), " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year === "" &&
      input.volume === "" &&
      input.issueNumber != ""
    ) {
      txtReference =
        input.author +
        ". (n.d) " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] (" +
        input.issueNumber +
        "). ";
      input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
    } else if (
      input.year === "" &&
      input.volume != "" &&
      input.issueNumber === ""
    ) {
      txtReference =
        input.author +
        ". (n.d) " +
        input.titleJournalArticle +
        ". " +
        input.title +
        ". [Online] (" +
        input.volume +
        "). " +
        input.pageNumbers +
        ". Available from: " +
        input.url +
        " [Accessed " +
        input.date +
        "].";
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
    } else if (info.titleJournalArticle === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Title of article",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.title === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Title of journal",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.pageNumbers === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter Page number (Ex: 10-12 )",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    } else if (info.url === "") {
      swal({
        title: "Empty field found..!!",
        text: "Please enter URL",
        icon: "warning",
        button: "Ok"
      });
      valid = false;
    }

    return valid;
  };

  // end is valid function

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

    var accesseddate =
      supDay + " " + months[date.getMonth()] + " " + date.getFullYear();
    document.querySelector(DOM.inputdate).value = accesseddate;
  }

  var clearFields = function() {
    document.querySelector(DOM.inputauthor).value = "";
    document.querySelector(DOM.inputyear).value = "";
    document.querySelector(DOM.inputtitleJournalArticle).value = "";
    document.querySelector(DOM.inputtitle).value = "";
    document.querySelector(DOM.inputvolumNumber).value = "";
    document.querySelector(DOM.inputissueNumber).value = "";
    document.querySelector(DOM.inputpageNumbers).value = "";
    document.querySelector(DOM.inputurl).value = "";
    document.querySelector(DOM.inputReference).value = "";
  };

  return {
    init: function() {
      console.log("apllication has started");
      today();
      setupEventListners();
    }
  };
})();

controller.init();
