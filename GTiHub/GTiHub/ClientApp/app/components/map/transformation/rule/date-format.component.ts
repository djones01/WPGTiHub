import { Component, OnInit, OnChanges, Input, Output } from "@angular/core";

@Component({
    selector: "date-format",
    template: require("./date-format.component.html")
})
export class DateFormatComponent implements OnInit {
    //Fields for date
    dateParts: DatePart[] = [];
    datePattern = "";
    dateExamplePattern = "";
    hasValidFormat = false;

    presetOpts = [
        { value: "dd/MM/yyyy", display: "dd/MM/yyyy" },
        { value: "MM/dd/yyyy", display: "MM/dd/yyyy" },
        { value: "yyyy/MM/dd", display: "yyyy/MM/dd" },
        { value: "yyyy/dd/MM", display: "yyyy/dd/MM" },
    ];

    dateOptions = [
        {
            label: "Day",
            options: [
                { value: "d", display: "Day: 1 - 31" },
                { value: "dd", display: "Day: 01 - 31" },
                { value: "ddd", display: "Day: Mon" },
                { value: "dddd", display: "Day: Monday" }
            ]
        },
        {
            label: "Month",
            options: [
                { value: "M", display: "Month: 1 - 12" },
                { value: "MM", display: "Month: 01 - 12" },
                { value: "MMM", display: "Month: Jun" },
                { value: "MMMM", display: "Month: June" }
            ]
        },
        {
            label: "Year",
            options: [
                { value: "yy", display: "Year: 00 - 99" },
                { value: "yyyy", display: "Year: 1900" }
            ]
        }
    ];

    deleteDatePart(i: number) {
        this.dateParts.splice(i, 1);
        this.modifyDatePattern();
    }

    addDatePart() {
        this.dateParts.push(new DatePart("", ""));
    }

    modifyDatePattern() {
        this.datePattern = "";
        //Create the date pattern from the date parts
        for (let i = 0; i < this.dateParts.length; i++) {
            this.datePattern += this.dateParts[i].value;
        }
        const dateFormat = require("dateformat");
        this.dateExamplePattern = dateFormat(new Date(), this.datePattern);
        const timestamp = Date.parse(this.dateExamplePattern);
        if (isNaN(timestamp) == false) {
            this.hasValidFormat = true;
        } else {
            this.dateExamplePattern = "Invalid Format";
            this.hasValidFormat = false;
        }
    }

    ngOnInit() {}
}

class DatePart {
    constructor(
        public type: string,
        public value: string
    ) {
    }
}